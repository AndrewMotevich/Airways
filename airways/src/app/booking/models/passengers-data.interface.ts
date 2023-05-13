export enum EPassenger {
  ADULT = 'adult',
  CHILD = 'child',
  INFANT = 'infant'
}

export type TPassengersData = {
  [key in EPassenger]: number;
};

