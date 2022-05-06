import { generateApiClient } from '@utils/apiUtils';
const itunesApi = generateApiClient('itunes');
// const trackDetailsApi = generateApiClient('itunes');

export const getTracks = (trackName, num) => itunesApi.get(`/search?term=${trackName}`);

export const getTrackDetails = (trackId) => itunesApi.get(`/lookup?id=${trackId}`);
