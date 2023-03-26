export type GameCondition =
  | 'boxonly'
  | 'cib'
  | 'graded'
  | 'manualonly'
  | 'new'
  | 'used';

export interface GamePrice {
  time: number;
  price: number;
}

export type GamePricesConditionsMap = Record<GameCondition, GamePrice[]>;

export const emptyGamePrices: GamePricesConditionsMap = {
  boxonly: [],
  cib: [],
  graded: [],
  manualonly: [],
  new: [],
  used: [],
};
