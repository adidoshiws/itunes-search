import { itunesContainerReducer, initialState, itunesContainerTypes } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('ItunesContainer reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(itunesContainerReducer(undefined, {})).toEqual(state);
  });

  it('should return the initial state when an action of type FETCH_TRACK is dispatched', () => {
    const trackName = 'West Ham Way';
    const expectedResult = { ...state, trackName, loading: true };
    expect(
      itunesContainerReducer(state, {
        type: itunesContainerTypes.REQUEST_GET_ITUNE_TRACKS,
        trackName
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the track data is present and trackLoading = false when FETCH_TRACK_SUCCESS is dispatched', () => {
    const data = { name: 'West Ham Way' };
    const expectedResult = { ...state, tracksData: data, loading: false };
    expect(
      itunesContainerReducer(state, {
        type: itunesContainerTypes.SUCCESS_GET_ITUNE_TRACKS,
        data
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the trackErrorMessage has some data and trackLoading = false when FETCH_TRACK_FAILURE is dispatched', () => {
    const error = 'something_went_wrong';
    const expectedResult = { ...state, tracksError: error, loading: false };
    expect(
      itunesContainerReducer(state, {
        type: itunesContainerTypes.FAILURE_GET_ITUNE_TRACKS,
        error
      })
    ).toEqual(expectedResult);
  });

  it('should return the initial state when CLEAR_ITUNE_TRACKS is dispatched', () => {
    expect(
      itunesContainerReducer(state, {
        type: itunesContainerTypes.CLEAR_ITUNE_TRACKS
      })
    ).toEqual(initialState);
  });
});
