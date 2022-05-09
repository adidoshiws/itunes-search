import MockAdapter from 'axios-mock-adapter';
import { getApiClient } from '@utils/apiUtils';
import { getTracks, getTrackDetails } from '../itunesApi';

describe('ItuneApi tests', () => {
  const songName = 'rockstar';
  it('should make the api call to "/search?term="', async () => {
    const mock = new MockAdapter(getApiClient('itunes').axiosInstance);
    const data = [
      {
        resultCount: 1,
        results: [{ songName }]
      }
    ];
    mock.onGet(`/search?term=${songName}`).reply(200, data);
    const res = await getTracks(songName);
    expect(res.data).toEqual(data);
  });
});

describe('TrackDetailsApi tests', () => {
  const trackId = 1504553008;
  it('should make the api call to "/lookup?id=', async () => {
    const mock = new MockAdapter(getApiClient('itunes').axiosInstance);
    const data = [
      {
        resultCount: 1,
        results: [{ trackId }]
      }
    ];
    mock.onGet(`/lookup?id=${trackId}`).reply(200, data);
    const res = await getTrackDetails(trackId);
    expect(res.data).toEqual(data);
  });
});
