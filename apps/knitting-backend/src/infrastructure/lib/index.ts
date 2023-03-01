// import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export interface BackendProps {
  // Define construct properties here
}

export class Backend extends Construct {

  constructor(scope: Construct, id: string, props: BackendProps = {}) {
    super(scope, id);


    // Define construct contents here

    // example resource
    // const queue = new sqs.Queue(this, 'InfrastructureQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
