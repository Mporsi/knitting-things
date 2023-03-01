import {Stack} from 'aws-cdk-lib';
import { Backend } from "./lib";
import { Database, KnittingVPC } from "@knitting-things/aws-infrastructure";

export class Infrastructure extends Stack {
  constructor() {
    super();

    const vpc = new KnittingVPC(this, 'VPC', {
      stage: 'dev',
      myIpAddress: '89.150.136.170'
    })
    const database = new Database(this, 'Database', {
      stage: 'dev',
      defaultSecurityGroup: vpc.defaultSecurityGroup
    });
    const backend = new Backend(this, 'Backend');

  }
}
