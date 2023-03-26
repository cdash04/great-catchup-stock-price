import { Construct } from 'constructs';
import { BaseLambda } from './base-lambda';

export class GamePriceLambda extends BaseLambda {
  constructor(scope: Construct, id: string, dynamoDbTableName: string = '') {
    super('PriceGame', 'game-price', scope, id, {
      bundling: { minify: true },
      environment: {
        TABLE_NAME: dynamoDbTableName,
      }
    });
  }
}
