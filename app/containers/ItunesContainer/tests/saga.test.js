/**
 * Test ituneContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put } from 'redux-saga/effects';
import { getTracks } from '@services/itunesApi';
import { apiResponseGenerator } from '@utils/testUtils';
import itunesContainerSaga, { getItuneTracks } from '../saga';
import { itunesContainerTypes } from '../reducer';

describe('ItunesContainer saga tests', () => {
  const generator = itunesContainerSaga();
  const trackName = 'mac';
  let getItuneTracksGenerator = getItuneTracks({ trackName });

  it('should start task to watch for REQUEST_GET_ITUNE_TRACKS action', () => {
    expect(generator.next().value).toEqual(takeLatest(itunesContainerTypes.REQUEST_GET_ITUNE_TRACKS, getItuneTracks));
  });

  it('should ensure that the action FAILURE_GET_ITUNE_TRACKS is dispatched when the api call fails', () => {
    const res = getItuneTracksGenerator.next().value;
    expect(res).toEqual(call(getTracks, trackName));
    const errorResponse = {
      errorMessage: 'There was an error while fetching tracks data.'
    };
    expect(getItuneTracksGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: itunesContainerTypes.FAILURE_GET_ITUNE_TRACKS,
        error: errorResponse
      })
    );
  });

  it('should ensure that the action SUCCESS_GET_ITUNE_TRACKS is dispatched when the api call succeeds', () => {
    getItuneTracksGenerator = getItuneTracks({ trackName });
    const res = getItuneTracksGenerator.next().value;
    expect(res).toEqual(call(getTracks, trackName));
    const tracksResponse = {
      resultCount: 1,
      results: [{ songName: trackName }]
    };
    expect(getItuneTracksGenerator.next(apiResponseGenerator(true, tracksResponse)).value).toEqual(
      put({
        type: itunesContainerTypes.SUCCESS_GET_ITUNE_TRACKS,
        data: tracksResponse
      })
    );
  });
});
