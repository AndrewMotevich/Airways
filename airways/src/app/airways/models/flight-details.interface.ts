
export interface IFlightDetails {
  origin: string;
  destination: string;
  origin_airport: string;
  destination_airport: string;
  price: number;
  airline: string;
  flight_number: string;
  departure_at: string;
  return_at: string;
  duration: number;
  transfers: number;
  return_transfers: number;
  duration_to: number;
  duration_back: number;
  link: string;
  seats?: number;
};
