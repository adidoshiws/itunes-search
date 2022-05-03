import { getTracks } from '@services/itunesApi';
import { put, call, takeLatest } from 'redux-saga/effects';
import itunesContainerTypes, { itunesContainerCreators } from './reducer';

const { REQUEST_GET_ITUNE_TRACKS } = itunesContainerTypes;

const { successGetItuneTracks, failureGetItuneTracks } = itunesContainerCreators;

export function* getItuneTracks(action) {
  try {
    const response = yield call(getTracks, action.trackName);
    const { data, ok } = response;
    if (ok) {
      yield put(successGetItuneTracks(data));
    }
  } catch (error) {
    yield put(failureGetItuneTracks(error));
  }
}

// Individual exports for testing
export default function* itunesContainerSaga() {
  yield takeLatest(REQUEST_GET_ITUNE_TRACKS, getItuneTracks);
}
