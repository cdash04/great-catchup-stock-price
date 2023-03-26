import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { DynamoDbStack } from './dynamo-db/dynamo-db-stack';
import { CronEventStack } from './lambda-events/cron-event-stack';
import { ApiGatewayStack } from './lambda-events/api-gateway-stack';

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const dynamoDbStack = new DynamoDbStack(this, 'dynamo-db-stack');
    const cronEventStack = new CronEventStack(this, 'cron-event-stack', dynamoDbStack.table.tableName);
    const apiGatewayStack = new ApiGatewayStack(this, 'api-gateway-stack', dynamoDbStack.table.tableName);

    dynamoDbStack.grantReadWriteAccess(apiGatewayStack.handlerList);
    dynamoDbStack.grantReadWriteAccess(cronEventStack.handlerList);
  }
}
