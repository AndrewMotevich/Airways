import { ECurrency } from '../../core/models/currency.interface';
import { IFlightDetails } from './flight-details.interface';

export interface IFlightsData {
  success: boolean;
  data: IFlightDetails[];
  currency: ECurrency;
}
