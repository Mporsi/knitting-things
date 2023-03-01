import { Construct } from "constructs";
import { Secret } from "aws-cdk-lib/aws-secretsmanager";
import { CfnOutput, StackProps } from "aws-cdk-lib";
import { StringParameter } from "aws-cdk-lib/aws-ssm";
import {
  InstanceClass,
  InstanceSize,
  InstanceType,
  ISecurityGroup, IVpc,
  Peer,
  Port,
  SecurityGroup, SubnetType,
  Vpc
} from "aws-cdk-lib/aws-ec2";
import {
  Credentials,
  DatabaseInstance,
  DatabaseInstanceEngine,
  DatabaseInstanceProps,
  PostgresEngineVersion
} from "aws-cdk-lib/aws-rds";
import { KnittingVPC } from "../vpc/vpc";

export interface DatabaseBaseStackProps extends StackProps {
  stage: string;
  defaultSecurityGroup: ISecurityGroup;
}

export class Database extends Construct{
  public readonly vpc: IVpc;
  public readonly rdsInstance: DatabaseInstance;
  public readonly databaseCredentialsSecret: Secret;

  constructor(scope: Construct, id: string, props: DatabaseBaseStackProps) {
    super(scope, id);
    this.vpc = KnittingVPC.getVpc(scope);
    // first, lets generate a secret to be used as credentials for our database
    this.databaseCredentialsSecret = new Secret(this, `${props?.stage}-DBCredentialsSecret`, {
      secretName: `${props?.stage}-credentials`,
      generateSecretString: {
        secretStringTemplate: JSON.stringify({
          username: 'postgres',
        }),
        excludePunctuation: true,
        includeSpace: false,
        generateStringKey: 'password'
      }
    });

    // lets output a few properties to help use find the credentials
    new CfnOutput(this, 'Secret Name', { value: this.databaseCredentialsSecret.secretName });
    new CfnOutput(this, 'Secret ARN', { value: this.databaseCredentialsSecret.secretArn });
    new CfnOutput(this, 'Secret Full ARN', { value: this.databaseCredentialsSecret.secretFullArn || '' });

    // next, create a new string parameter to be use
    new StringParameter(this, 'DBCredentialsArn', {
      parameterName: `${props?.stage}-credentials-arn`,
      stringValue: this.databaseCredentialsSecret.secretArn,
    });



    // finally, lets configure and create our database!
    const rdsConfig: DatabaseInstanceProps = {
      engine: DatabaseInstanceEngine.postgres({ version: PostgresEngineVersion.VER_12_3 }),
      // optional, defaults to m5.large
      instanceType: InstanceType.of(InstanceClass.BURSTABLE2, InstanceSize.SMALL),
      vpc: this.vpc,
      // make the db publically accessible
      vpcSubnets: {
        subnetType: SubnetType.PUBLIC,
      },
      instanceIdentifier: `${props?.stage}`,
      maxAllocatedStorage: 200,
      securityGroups: [props?.defaultSecurityGroup],
      credentials: Credentials.fromSecret(this.databaseCredentialsSecret), // Get both username and password from existing secret
    }

    // create the instance
    this.rdsInstance = new DatabaseInstance(this, `${props?.stage}-instance`, rdsConfig);

    // output the endpoint so we can connect!
    new CfnOutput(this, 'RDS Endpoint', { value: this.rdsInstance.dbInstanceEndpointAddress });
  }
}

