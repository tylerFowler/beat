export type WeatherConditionType =
  | 'clearDay'
  | 'clearNight'
  | 'cloudy'
  | 'partlyCloudyDay'
  | 'partlyCloudyNight'
  | 'partialMoon'
  | 'cloudyPartialMoon'
  | 'rain'
  | 'partlySunnyRain'
  | 'partlyMoonyRain'
  | 'heavyRain'
  | 'thunderstorm'
  | 'snow'
  | 'heavySnow'
  | 'wind'
  | 'unknown'
;

export interface Forecast {
  readonly temperature: number;
  readonly condition: WeatherConditionType;
}

export enum WeatherLocationType {
  CityName = 'city_name',
  ZIPCode = 'zip',
  Coords = 'coords',
  Current = 'current',
}

export namespace WeatherLocation {
  export interface City {
    type: WeatherLocationType.CityName;
    value: string;
    countryCode?: string;
    displayName?: string;
  }

  export const isCity = (loc: WeatherLocation): loc is City =>
    loc.type === WeatherLocationType.CityName
    && !!loc.value
  ;

  export interface ZIPCode {
    type: WeatherLocationType.ZIPCode;
    value: string;
    countryCode: string;
    displayName?: string;
  }

  export const isZIPCode = (loc: WeatherLocation): loc is ZIPCode =>
    loc.type === WeatherLocationType.ZIPCode
    && !!loc.value
    && !!loc.countryCode
  ;

  export interface Coords {
    type: WeatherLocationType.Coords|WeatherLocationType.Current;
    value: { lat: string, lon: string };
    displayName?: string;
    countryCode?: string; // must keep this to maintain prop parity with other types
  }

  export const isCoords = (loc: WeatherLocation): loc is Coords =>
    (loc.type === WeatherLocationType.Coords || loc.type === WeatherLocationType.Current)
    && (loc.value && loc.value.hasOwnProperty('lat') && loc.value.hasOwnProperty('lon'))
  ;

  export const isValid = (loc: WeatherLocation): boolean => {
    if (isCoords(loc)) {
      return loc.value.lat !== '' && loc.value.lon !== '';
    } else {
      return loc.value !== '';
    }
  };
}

export type WeatherLocation =
  | WeatherLocation.City
  | WeatherLocation.ZIPCode
  | WeatherLocation.Coords
;
