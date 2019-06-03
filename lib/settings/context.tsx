import React from 'react';
import { connect } from 'react-redux';
import { GlobalState } from '../store';
import { FeedSettings, WeatherSettings } from './reducer';
import { getPanelFeedSettings, getFeedSettings, getWeatherAPIKey, getWeatherLocationConfig } from './selectors';
import { HNFeedSettings, PanelOrientation } from './interface';
import { FeedType } from '../hn/interface';

// SettingsProviderProps is the set of properties given to each Settings Provider
// component, which supplies arbitrary settings over a context provider, optionally,
// where applicable, the orientation of the parent panel.
export interface SettingsProviderProps<T> {
  readonly settings: T;
  readonly orientation?: PanelOrientation;
}

// SettingsSelector is a Redux selector function that should be used to retrieve
// the settings state that a settings provider gives through it's source context.
type SettingsSelector<T> = (state: GlobalState, orientation: PanelOrientation) => T;

// createSettingsProvider creates a connected Context provider that provides it's
// particular settings to the React tree, using a settingsSelector and optionally
// an orientation. Note that the second value of the generic is only present to satisfy
// the TSX parser, if given only one generic it will think that it's a ReactElement.
//
// Note: the final props object needs to be cast to 'any' otherwise TypeScript
// will attempt to type both 'settings' and 'children' keys as 'never'.
const createSettingsProvider = <T, _ = any>(settingsSelector: SettingsSelector<T>, context: React.Context<T>) =>
  connect(
    (state: GlobalState, ownProps: Partial<Pick<SettingsProviderProps<T>, 'orientation'>>): SettingsProviderProps<T> =>
      ({ ...ownProps,
        settings: settingsSelector(state, ownProps.orientation),
      }),
  )(({ settings, children }: any) => <context.Provider value={settings}>{children}</context.Provider>)
;

export const HNSettingsContext = React.createContext<HNFeedSettings>({
  defaultFeedType: FeedType.NewStories,
});

export const HNFeedSettingsProvider = createSettingsProvider(
  (state, orientation) => getPanelFeedSettings(orientation, state),
  HNSettingsContext,
);

export const FeedSettingsContext = React.createContext<FeedSettings>({
  refreshInterval: 15,
  pullSize: 15,
});

export const FeedSettingsProvider =
  createSettingsProvider(getFeedSettings, FeedSettingsContext);

export const WeatherSettingsContext = React.createContext<WeatherSettings>({
  openWeatherAPIKey: '',
  location: null,
});

export const WeatherSettingsProvider = createSettingsProvider(state => ({
  openWeatherAPIKey: getWeatherAPIKey(state),
  location: getWeatherLocationConfig(state),
}), WeatherSettingsContext);
