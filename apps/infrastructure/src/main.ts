import { AppStack } from './stacks/app-stack';
import { App } from "aws-cdk-lib";

const app = new App();
new AppStack(app, 'infrastructure',{env: { account: '774741736765', region: 'eu-north-1' }});
