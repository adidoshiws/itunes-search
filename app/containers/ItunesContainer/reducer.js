import produce from 'immer';
import { createActions } from 'reduxsauce';
import get from 'lodash/get';

export const { Types: itunesContainerTypes, Creators: itunesContainerCreators } = createActions({
  requestGetItuneTracks: ['trackName'],
  successGetItuneTracks: ['data'],
  failureGetItuneTracks: ['error'],
  clearItuneTracks: {},
  getTrackDetails: ['trackId'],
  successGetItuneTrackDetails: ['data'],
  failureGetItuneTrackDetails: ['error']
});
export const initialState = {
  trackName: null,
  tracksData: {},
  tracksError: null,
  getTrackDetails: {},
  trackDetailsError: null
};
  currentTrack: ['trackId']
});
export const initialState = { trackName: null, tracksData: {}, tracksError: null, currentTrack: null };

export const itunesContainerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case itunesContainerTypes.REQUEST_GET_ITUNE_TRACKS:
        draft.trackName = action.trackName;
        break;
      case itunesContainerTypes.CLEAR_ITUNE_TRACKS:
        draft.trackName = null;
        draft.tracksError = null;
        draft.tracksData = {};
        break;
      case itunesContainerTypes.SUCCESS_GET_ITUNE_TRACKS:
        draft.tracksData = action.data;
        break;
      case itunesContainerTypes.FAILURE_GET_ITUNE_TRACKS:
        draft.tracksError = get(action.error, 'message', 'something_went_wrong');
        break;
      case itunesContainerTypes.SUCCESS_GET_ITUNE_TRACK_DETAILS:
        draft.getTrackDetails = action.data;
        break;
      case itunesContainerTypes.FAILURE_GET_ITUNE_TRACK_DETAILS:
        draft.trackDetailsError = action.error;
      case itunesContainerTypes.CURRENT_TRACK:
        draft.currentTrack = action.trackId;
        break;
    }
  });

export default itunesContainerTypes;
