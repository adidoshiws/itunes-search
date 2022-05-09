import {
  selectTrackDetailsContainerDomain,
  selectTrackId,
  selectTrackDetailsData,
  selectTrackDetailsError
} from '../selectors';
import { initialState } from '../reducer';
describe('TrackDetailsContainer selector tests', () => {
  let mockedState;
  let trackId;
  let trackDetailsData;
  let trackDetailsError;

  beforeEach(() => {
    trackId = 1504553008;
    trackDetailsData = { resultCount: 1, results: [{ trackId }] };
    trackDetailsError = 'There was some error while fetching the track details';

    mockedState = {
      trackDetailsContainer: {
        trackId,
        trackDetailsData,
        trackDetailsError
      }
    };
  });
  it('should select the trackId', () => {
    const trackIdSelector = selectTrackId();
    expect(trackIdSelector(mockedState)).toEqual(trackId);
  });

  it('should select trackDetailsData', () => {
    const trackDetailsDataSelector = selectTrackDetailsData();
    expect(trackDetailsDataSelector(mockedState)).toEqual(trackDetailsData);
  });

  it('should select the trackDetailsError', () => {
    const trackDetailsErrorSelector = selectTrackDetailsError();
    expect(trackDetailsErrorSelector(mockedState)).toEqual(trackDetailsError);
  });

  it('should select the global state', () => {
    const selector = selectTrackDetailsContainerDomain(initialState);
    expect(selector).toEqual(initialState);
  });
});
