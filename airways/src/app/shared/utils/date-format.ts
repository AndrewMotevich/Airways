import { DATE_FORMATS, FLIGHT_DATE_FORMATS } from "src/app/shared/constants";

type TDisplay = {
  dateInput: string;
  monthYearLabel: string;
  dateA11yLabel: string;
  monthYearA11yLabel: string;
}

export class CustomFormat {
  currentDateFormat = DATE_FORMATS[0];

  get display(): TDisplay {
    return {
      ...FLIGHT_DATE_FORMATS.display,
      dateInput: this.currentDateFormat
    }
  }

  get parse(): { dateInput: string } {
    return {
      dateInput: this.currentDateFormat
    };
  }
}