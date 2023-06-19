export interface FormDataModel<T> {
  roundedTrip: string;
  from: T | null;
  destination: T | null;
  dateStart: string | null;
  dateEnd: string | null;
  passengers: number;
  adult: number;
  child: number;
  infant: number;
}

export interface PointModel {
  title: string | null;
  code: string | null;
}

export const enum FlightDirection {
  DEPARTURE = 'departure',
  ARRIVAL = 'arrival',
}
