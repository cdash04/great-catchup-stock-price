import { DynamoDBClient, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
import Dynamo from 'dynamodb-onetable/Dynamo';
import { Table } from 'dynamodb-onetable';

import { GamePriceEntity, Schema } from './schema';

const params: DynamoDBClientConfig = {};
const client = new Dynamo({ client: new DynamoDBClient(params) });

const table = new Table({
  client,
  name: process.env.TABLE_NAME,
  schema: Schema,
  logger: console.log,
  partial: false,
});

export const gamePriceRepository =
  table.getModel<GamePriceEntity>('GamePriceSchema');
