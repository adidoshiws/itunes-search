import { generateApiClient } from '@utils/apiUtils';
const itunesApi = generateApiClient('itunes');

export const getTracks = (trackName) => itunesApi.get(`/search?term=${trackName}`);
