import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { KnittingVPC } from "../constructs/vpc/vpc";
import { Database } from "../constructs/database/database";

export class AppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const vpc = new KnittingVPC(this, 'VPC', {
      stage: 'dev',
      myIpAddress: '89.150.136.170/32'
    });
    const database = new Database(this, 'Database', {
      stage: 'dev',
      vpc: vpc.vpc,
      defaultSecurityGroup: vpc.defaultSecurityGroup
    });
    // defines your stack here
  }
}
