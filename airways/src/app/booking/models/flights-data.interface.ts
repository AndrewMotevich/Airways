import { IFlightDetails } from "./flight-details.interface";

export interface IFlightsData {
  success: boolean;
  data: IFlightDetails[];
  currency: "eur" | "rub";
}
