
export interface IFlightDetails {
  id: string;
  flightNumber: string;
  seats?: number;
  price?: number;
  duration: number;
  departureStation: string;
  departureDateTime: string;
  departureTimeUtcOffset: string;
  arrivalStation: string;
  arrivalDateTime: string;
  arrivalTimeUtcOffset: string;
};
