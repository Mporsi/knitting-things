import { Cluster, ICluster } from '@aws-cdk/aws-ecs';
import {
  Construct
} from '@aws-cdk/core';
import { KnittingVPC } from "../vpc/vpc";

export class ContainerCluster extends Construct {
  static readonly CLUSTER_NAME = 'knitting-cluster';
  cluster: Cluster;

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
