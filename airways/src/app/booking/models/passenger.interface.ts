import { ValidationErrors } from "@angular/forms";

export interface IPassengerDetails {
  category: string[];
  firstName: Array<string | ValidationErrors | null>;
  lastName: Array<string | ValidationErrors | null>;
  gender: Array<'female' | 'male' | '' | ValidationErrors>;
  dateOfBirth: Array<string | ValidationErrors | null>;
  needHelp: boolean;
  checkedInBag?: any;
}

export type TPassengersInformation = {
  passengers: IPassengerDetails[];
  phoneCode: string;
  phone: string;
  email: string;
}
