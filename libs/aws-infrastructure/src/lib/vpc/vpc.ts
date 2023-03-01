import { Construct } from '@aws-cdk/core';
import {Vpc} from 'aws-cdk-lib/aws-ec2';

export class KnittingVPC extends Construct {
  static readonly VPC_NAME: string = '';


  static getVpc(scope: Construct){
    const vpcInterface = Vpc.fromLookup(scope, 'knitting-vpc',{
      vpcName: KnittingVPC.VPC_NAME
    })
    return vpcInterface;
  }
}
