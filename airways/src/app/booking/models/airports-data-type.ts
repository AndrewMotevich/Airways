export type AirportsDataType = {
  'city_code': string;
  'code': string;
  'coordinates': {
    'lat': number;
    'lon': null;
  };
  'flightable': boolean;
  'country_code': string;
  'name': string;
  'time_zone': string;
  'iata_type': 'airport' | 'railway';
  'city_name': string;
};
