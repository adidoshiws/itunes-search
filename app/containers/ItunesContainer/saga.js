import { getTracks, getTrackDetails } from '@services/itunesApi';
import { put, call, takeLatest } from 'redux-saga/effects';
import itunesContainerTypes, { itunesContainerCreators } from './reducer';

const { REQUEST_GET_ITUNE_TRACKS, GET_TRACK_DETAILS } = itunesContainerTypes;

const { successGetItuneTracks, failureGetItuneTracks, successGetItuneTrackDetails, failureGetItuneTrackDetails } =
  itunesContainerCreators;

export function* getItuneTracks(action) {
  const response = yield call(getTracks, action.trackName);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetItuneTracks(data));
  } else {
    yield put(failureGetItuneTracks(data));
  }
}

export function* getItuneTrackDetails(action) {
  const response = yield call(getTrackDetails, action.trackId);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetItuneTrackDetails(data));
  } else {
    yield put(failureGetItuneTrackDetails(data));
  }
}

// Individual exports for testing
export default function* itunesContainerSaga() {
  yield takeLatest(REQUEST_GET_ITUNE_TRACKS, getItuneTracks);
  yield takeLatest(GET_TRACK_DETAILS, getItuneTrackDetails);
}
