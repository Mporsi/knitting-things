
import { KnittingVPC } from "../vpc/vpc";
import { Construct } from "constructs";
import { Cluster, ICluster } from "aws-cdk-lib/aws-ecs";

export class ContainerCluster extends Construct {
  static readonly CLUSTER_NAME = 'knitting-cluster';

  constructor(scope: Construct, id: string) {
    super(scope, id);
  }

  static getCluster(scope: Construct): ICluster {
    return Cluster.fromClusterAttributes(scope, 'knitting-cluster', {
      clusterName: ContainerCluster.CLUSTER_NAME,
      securityGroups: [],
      vpc: KnittingVPC.getVpc(scope)
    })
  }
}
