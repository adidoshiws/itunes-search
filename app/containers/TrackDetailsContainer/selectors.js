import { createSelector } from 'reselect';
import get from 'lodash/get';
import { initialState } from './reducer';

/**
 * Direct selector to the trackDetailsContainer state domain
 */

export const selectTrackDetailsContainerDomain = (state) => state.trackDetailsContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TrackDetailsContainer
 */

export const selectTrackDetailsData = () =>
  createSelector(selectTrackDetailsContainerDomain, (substate) => get(substate, 'trackDetailsData'));

export const selectTrackDetailsError = () =>
  createSelector(selectTrackDetailsContainerDomain, (substate) => get(substate, 'trackDetailsError'));

export const selectTrackId = () =>
  createSelector(selectTrackDetailsContainerDomain, (substate) => get(substate, 'trackId'));

export const selectLoading = () =>
  createSelector(selectTrackDetailsContainerDomain, (substate) => get(substate, 'loading'));
