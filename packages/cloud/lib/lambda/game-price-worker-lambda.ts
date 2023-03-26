import { Construct } from 'constructs';
import { BaseLambda } from './base-lambda';
import { Duration } from 'aws-cdk-lib';

export class GamePriceWorkerLambda extends BaseLambda {
  constructor(scope: Construct, id: string, dynamoDbTableName: string = '') {
    super('GamePriceWorker', 'game-price-worker', scope, id, {
      bundling: { minify: true },
      environment: {
        TABLE_NAME: dynamoDbTableName,
      },
      timeout: Duration.seconds(30),
    });
  }
}
