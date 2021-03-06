import React from 'react';
import styled from 'lib/styled-components';
import { typeScale } from 'lib/styles';
import { WeatherLocation } from '../../../weather/interface';
import LocationEditor from './LocationEditor';
import SettingsForm, { SettingField, SettingLabel, SettingInlineLabel, SettingRadio } from '../SettingsForm';

export interface WeatherSettingsProps {
  readonly location: Readonly<WeatherLocation>;
  setLocationConfig(loc: Readonly<WeatherLocation>): void;

  readonly weatherUnit: 'F'|'C';
  setWeatherUnit(unit: 'F'|'C'): void;
}

const WeatherUnitSetting: React.SFC<{ readonly unit: 'F'|'C'; onChange(unit: 'F'|'C'): void }> = ({ unit, onChange }) =>
  <SettingField>
    <SettingLabel>Unit</SettingLabel>

    <SettingRadio id="weather-unit-fahrenheit" name="fahrenheit"
      checked={unit === 'F'}
      value="F" onChange={e => onChange(e.target.checked ? 'F' : unit)}
    />
    <SettingInlineLabel htmlFor="weather-unit-fahreinheit">F˚</SettingInlineLabel>

    <SettingRadio id="weather-unit-celsius" name="celsius"
      checked={unit === 'C'}
      value="C" onChange={e => onChange(e.target.checked ? 'C' : unit)}
    />
    <SettingInlineLabel htmlFor="weather-unit-celsius">C˚</SettingInlineLabel>
  </SettingField>
;

const LocationTypeFieldset = styled.fieldset`
  overflow: hidden;

  > legend {
    font-size: ${typeScale(4)};
    font-weight: bold;
    padding: 0 2em 0 1em;
  }
`;

const WeatherSettings: React.FC<WeatherSettingsProps> = ({
  weatherUnit, setWeatherUnit,
  location, setLocationConfig,
}) =>
  <SettingsForm>
    <legend>Weather</legend>

    <WeatherUnitSetting unit={weatherUnit} onChange={u => setWeatherUnit(u)} />

    <LocationTypeFieldset>
      <legend>Location Setup</legend>

      <SettingField>
        <LocationEditor config={location} updateConfig={setLocationConfig} />
      </SettingField>
    </LocationTypeFieldset>
  </SettingsForm>
;

export default WeatherSettings;
