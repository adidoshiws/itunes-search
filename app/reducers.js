/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import homeContainerReducer from 'containers/HomeContainer/reducer';
import { itunesContainerReducer } from 'containers/ItunesContainer/reducer';
import { trackDetailsReducer } from 'containers/TrackDetailsContainer/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducer = {}) {
  const rootReducer = combineReducers({
    ...injectedReducer,
    language: languageProviderReducer,
    homeContainer: homeContainerReducer,
    itunesContainer: itunesContainerReducer,
    trackDetailsContainer: trackDetailsReducer
  });

  return rootReducer;
}
