import { trackDetailsReducer, initialState, trackDetailsTypes } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('TrackDetails reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(trackDetailsReducer(undefined, {})).toEqual(state);
  });

  it('should return the initial state when an action of type TRACK_ID is dispatched', () => {
    const trackId = 1504553008;
    const expectedResult = { ...state, trackId };
    expect(
      trackDetailsReducer(state, {
        type: trackDetailsTypes.REQUEST_GET_TRACK_DETAILS,
        trackId
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the track details data is present and details = false when FETCH_DETAILS_SUCCESS is dispatched', () => {
    const data = { trackName: 'Uphill' };
    const expectedResult = { ...state, trackDetailsData: data };
    expect(
      trackDetailsReducer(state, {
        type: trackDetailsTypes.SUCCESS_GET_TRACK_DETAILS,
        data
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the detailsErrorMessage has some data and detailsLoading = false when FETCH_DETAILS_FAILURE is dispatched', () => {
    const error = 'something_went_wrong';
    const expectedResult = { ...state, trackDetailsError: error };
    expect(
      trackDetailsReducer(state, {
        type: trackDetailsTypes.FAILURE_GET_TRACK_DETAILS,
        error
      })
    ).toEqual(expectedResult);
  });
});
