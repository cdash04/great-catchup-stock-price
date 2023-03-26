/* eslint-disable no-template-curly-in-string */
import { Entity } from 'dynamodb-onetable';

const GamePriceSchema = {
  pk: { type: String, value: 'game:${user}' },
  sk: { type: String, value: 'game:${console}-${game}' },
  user: { type: String, required: true },
  console: { type: String, required: true },
  game: { type: String, required: true },
  condition: { type: String, required: true },
  prices: { type: Array, required: true },
};

export const Schema = {
  format: 'onetable:1.1.0',
  version: '0.0.1',
  indexes: {
    primary: { hash: 'pk', sort: 'sk' },
    ls1: { sort: 'name', type: 'local' },
  },
  models: {
    GamePriceSchema,
  },
  params: {
    isoDates: true,
    timestamps: true,
  },
};

export type GamePriceEntity = Entity<typeof Schema.models.GamePriceSchema>;
