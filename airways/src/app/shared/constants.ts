export const PASSENGERS_FORM_ARRAY_NAME = 'passengers';

export const NAME_TOOLTIP = `Add the passenger's name as it is written on their documents (passport or ID). Do not use any accents or special characters. Do not use a nickname. `;

export const MAX_INFANT_AGE = 2;
export const MAX_CHILD_AGE = 18;

export const MAX_PHONE_LENGTH = 15;

export const DATE_FORMATS = ["MM/DD/YYYY", "DD/MM/YYYY", "YYYY/DD/MM", "YYYY/MM/DD"];

export const FLIGHT_DATE_FORMATS = {
  parse: {
    dateInput: DATE_FORMATS[0],
  },
  display: {
    dateInput: DATE_FORMATS[0],
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'L',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export const CURRENCY = ["EUR", "USA", "RUB", "PLN"];