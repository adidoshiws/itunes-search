import produce from 'immer';
import { createActions } from 'reduxsauce';
import get from 'lodash/get';

export const { Types: trackDetailsTypes, Creators: trackDetailsCreators } = createActions({
  requestGetTrackDetails: ['trackId'],
  successGetTrackDetails: ['data'],
  failureGetTrackDetails: ['error']
});
export const initialState = {
  trackId: null,
  trackDetailsData: {},
  trackDetailsError: null
};

export const trackDetailsReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case trackDetailsTypes.REQUEST_GET_TRACK_DETAILS:
        draft.trackId = action.trackId;
        break;
      case trackDetailsTypes.SUCCESS_GET_TRACK_DETAILS:
        draft.trackDetailsData = action.data;
        break;
      case trackDetailsTypes.FAILURE_GET_TRACK_DETAILS:
        draft.trackDetailsError = get(action.error, 'message', 'something_went_wrong');
        break;
    }
  });

export default trackDetailsTypes;
