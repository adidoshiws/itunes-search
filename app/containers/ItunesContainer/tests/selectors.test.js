import { selectItunesContainerDomain, selectTrackName, selectTracksData, selectTracksError } from '../selectors';
import { initialState } from '../reducer';
describe('ItunesContainer selector tests', () => {
  let mockedState;
  let trackName;
  let tracksData;
  let tracksError;

  beforeEach(() => {
    trackName = 'west';
    tracksData = { resultCount: 1, results: [{ trackName }] };
    tracksError = 'There was some error while fetching the tracks data';

    mockedState = {
      itunesContainer: {
        trackName,
        tracksData,
        tracksError
      }
    };
  });
  it('should select the trackName', () => {
    const trackSelector = selectTrackName();
    expect(trackSelector(mockedState)).toEqual(trackName);
  });

  it('should select tracksData', () => {
    const tracksDataSelector = selectTracksData();
    expect(tracksDataSelector(mockedState)).toEqual(tracksData);
  });

  it('should select the tracksError', () => {
    const tracksErrorSelector = selectTracksError();
    expect(tracksErrorSelector(mockedState)).toEqual(tracksError);
  });

  it('should select the global state', () => {
    const selector = selectItunesContainerDomain(initialState);
    expect(selector).toEqual(initialState);
  });
});
