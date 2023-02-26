import {Stack} from 'aws-cdk-lib';
import { Backend } from "./lib";

export class Infrastructure extends Stack {
  constructor() {
    super();

    const backend = new Backend(this, 'Backend');

  }
}
