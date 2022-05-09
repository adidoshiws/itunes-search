import { getTrackDetails } from '@services/itunesApi';
import { put, call, takeLatest } from 'redux-saga/effects';
import { trackDetailsCreators, trackDetailsTypes } from './reducer';

const { REQUEST_GET_TRACK_DETAILS } = trackDetailsTypes;

const { successGetTrackDetails, failureGetTrackDetails } = trackDetailsCreators;

export function* getItuneTrackDetails(action) {
  const response = yield call(getTrackDetails, action.trackId);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetTrackDetails(data));
  } else {
    yield put(failureGetTrackDetails(data));
  }
}

// Individual exports for testing
export default function* trackDetailsSaga() {
  yield takeLatest(REQUEST_GET_TRACK_DETAILS, getItuneTrackDetails);
}
