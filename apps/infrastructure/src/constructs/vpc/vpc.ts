import { ISecurityGroup, Peer, Port, SecurityGroup, Vpc } from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";

interface KnittingVPCPRops {
  stage: string;
  myIpAddress: string;
}

export class KnittingVPC extends Construct {
  static readonly VPC_NAME: string = '';
  public vpc: Vpc;
  public readonly defaultSecurityGroup: ISecurityGroup;

  constructor(scope: Construct, id: string, props?: KnittingVPCPRops) {
  super(scope, id);
  this.vpc = new Vpc(this, `VPC-${props?.stage}`, {
    natGateways:0,
    maxAzs: 2,
    vpcName: KnittingVPC.VPC_NAME
  });

    this.defaultSecurityGroup = SecurityGroup.fromSecurityGroupId(this, "SG", this.vpc.vpcDefaultSecurityGroup);

    if(props?.myIpAddress){
      // your to access your RDS instance!
      this.defaultSecurityGroup.addIngressRule(Peer.ipv4(props.myIpAddress), Port.tcp(5432), 'allow 5432 access from my IP');
    }
}
}
