import React, { useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import debounce from 'lodash/debounce';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { itunesContainerCreators } from './reducer';
import { injectIntl } from 'react-intl';
import { selectTrackName, selectTracksData, selectTracksError } from './selectors';
import { injectSaga } from 'redux-injectors';
import { compose } from 'redux';
import isEmpty from 'lodash/isEmpty';
import itunesContainerSaga from './saga';

export function ItunesContainer({ dispatchItuneTracks, dispatchClearItuneTracks, tracksData, trackName }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loaded = get(tracksData, 'results', null);
    if (loaded) {
      setLoading(false);
    }
  }, [tracksData]);

  useEffect(() => {
    if (trackName && !tracksData?.results?.length) {
      dispatchItuneTracks(trackName);
      setLoading(true);
    }
  }, []);

  const handleOnChange = (tName) => {
    if (!isEmpty(tName)) {
      dispatchItuneTracks(tName);
      setLoading(true);
    } else {
      dispatchClearItuneTracks();
    }
  };

  const debouncedHandleOnChange = debounce(handleOnChange, 200);

  const renderErrorState = () => {
    let trackError;
    if (isEmpty(trackName)) {
      trackError = 'track_search_default';
    }
    return !loading && trackError && <></>;
  };

  return (
    <>
      <input
        type="text"
        data-testid="search-bar"
        placeholder="search tracks"
        defaultValue={trackName}
        onChange={(evt) => debouncedHandleOnChange(evt.target.value)}
      />
      {renderErrorState()}
    </>
  );
}

ItunesContainer.propTypes = {
  dispatchItuneTracks: PropTypes.func,
  dispatchClearItuneTracks: PropTypes.func,
  intl: PropTypes.object,
  tracksData: PropTypes.shape({
    resultCount: PropTypes.number,
    results: PropTypes.array
  }),
  // tracksError: PropTypes.string,
  trackName: PropTypes.string
};

ItunesContainer.defaultProps = {
  tracksData: {},
  tracksError: null
};

const mapStateToProps = createStructuredSelector({
  tracksData: selectTracksData(),
  tracksError: selectTracksError(),
  trackName: selectTrackName()
});

export function mapDispatchToProps(dispatch) {
  const { requestGetItuneTracks, clearItuneTracks } = itunesContainerCreators;
  return {
    dispatchItuneTracks: (trackName) => dispatch(requestGetItuneTracks(trackName)),
    dispatchClearItuneTracks: () => dispatch(clearItuneTracks())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  injectIntl,
  withConnect,
  memo,
  injectSaga({ key: 'itunesContainer', saga: itunesContainerSaga })
)(ItunesContainer);

export const ItunesContainerTest = compose(injectIntl)(ItunesContainer);
