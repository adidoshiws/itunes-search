import { createSelector } from 'reselect';
import { initialState } from './reducer';
import get from 'lodash/get';

export const selectItunesContainerDomain = (state) => state.itunesContainer || initialState;

export const selectTracksData = () =>
  createSelector(selectItunesContainerDomain, (substate) => get(substate, 'tracksData'));

export const selectTracksError = () =>
  createSelector(selectItunesContainerDomain, (substate) => get(substate, 'tracksError'));

export const selectTrackName = () =>
  createSelector(selectItunesContainerDomain, (substate) => get(substate, 'trackName'));
