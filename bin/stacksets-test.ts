#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { StacksetsTestStack } from '../lib/stacksets-test-stack';

const app = new cdk.App();
new StacksetsTestStack(app, 'StacksetsTestStack', {

});