import { IFlightsData } from './flights-data.interface';
import { FormDataModel, PointModel } from './form-data.model';

export type TripDataType = {
  id: number;
  completed: boolean;
  mainData: FormDataModel<PointModel>;
  ticketsData: IFlightsData;
  passengersData: object;
};
