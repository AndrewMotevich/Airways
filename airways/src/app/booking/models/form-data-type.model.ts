export interface FormDataModel<T> {
  roundedTrip: string | null;
  from: T | null;
  destination: T | null;
  dateStart: Date | null;
  dateEnd: Date | null;
  passengers: number | null;
  adult: number | null;
  child: number | null;
  infant: number | null;
}

export interface PointModel {
  title: string | null;
  code: string | null;
}
