/**
 * Test homeContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put } from 'redux-saga/effects';
import { getTrackDetails } from '@services/itunesApi';
import { apiResponseGenerator } from '@utils/testUtils';
import trackDetailsSaga, { getItuneTrackDetails } from '../saga';
import { trackDetailsTypes } from '../reducer';

describe('TrackDetailsContainer saga tests', () => {
  const generator = trackDetailsSaga();
  const trackId = 1504553008;
  let getTrackDetailsGenerator = getItuneTrackDetails({ trackId });

  it('should start task to watch for REQUEST_GET_TRACK_DETAILS action', () => {
    expect(generator.next().value).toEqual(
      takeLatest(trackDetailsTypes.REQUEST_GET_TRACK_DETAILS, getItuneTrackDetails)
    );
  });

  it('should ensure that the action FAILURE_GET_TRACK_DETAILS is dispatched when the api call fails', () => {
    const res = getTrackDetailsGenerator.next().value;
    expect(res).toEqual(call(getTrackDetails, trackId));
    const errorResponse = {
      errorMessage: 'There was an error while fetching track details.'
    };
    expect(getTrackDetailsGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: trackDetailsTypes.FAILURE_GET_TRACK_DETAILS,
        error: errorResponse
      })
    );
  });

  it('should ensure that the action SUCCESS_GET_TRACK_DETAILS is dispatched when the api call succeeds', () => {
    getTrackDetailsGenerator = getItuneTrackDetails({ trackId });
    const res = getTrackDetailsGenerator.next().value;
    expect(res).toEqual(call(getTrackDetails, trackId));
    const detailsResponse = {
      resultCount: 1,
      results: [{ trackDetailsId: trackId }]
    };
    expect(getTrackDetailsGenerator.next(apiResponseGenerator(true, detailsResponse)).value).toEqual(
      put({
        type: trackDetailsTypes.SUCCESS_GET_TRACK_DETAILS,
        data: detailsResponse
      })
    );
  });
});
