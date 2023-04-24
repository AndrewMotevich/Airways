import { IFlightDetails } from "./flight-details.interface";

export interface IFlightsData {
  succsess: boolean;
  data: IFlightDetails[];
  currency: "eur" | "rub";
}