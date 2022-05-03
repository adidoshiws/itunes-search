import React, { useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import debounce from 'lodash/debounce';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { itunesContainerCreators } from './reducer';
import styled from 'styled-components';
import saga from './saga';
import T from '@components/T';
import If from '@components/If';
import For from '@app/components/For';
import { Input, Skeleton, Card } from 'antd';
import { injectIntl } from 'react-intl';
import { selectTrackName, selectTracksData, selectTracksError } from './selectors';
import { injectSaga } from 'redux-injectors';
import { compose } from 'redux';
import isEmpty from 'lodash/isEmpty';
import TrackCard from '@app/components/TrackCard';

const { Search } = Input;

const CustomCard = styled(Card)`
  && {
    margin: 20px 0;
    max-width: ${(props) => props.maxwidth};
  }
`;
const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    max-width: ${(props) => props.maxwidth}px;
    width: 100%;
    margin: 0 auto;
    padding: ${(props) => props.padding}px;
  }
`;

export function ItunesContainer({
  dispatchItuneTracks,
  dispatchClearItuneTracks,
  tracksData,
  tracksError,
  trackName,
  intl,
  maxwidth,
  padding
}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loaded = get(tracksData, 'results', null) || tracksError;
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

  const renderTrackList = () => {
    const results = get(tracksData, 'results', []);
    const resultCount = get(tracksData, 'resultCount', 0);
    return (
      <If condition={!isEmpty(results) || loading}>
        <Skeleton loading={loading} active>
          <If condition={!isEmpty(trackName)}>
            <div>
              <T id="search_query_text" values={{ trackName }} />
            </div>
          </If>
          <If condition={resultCount !== 0}>
            <div>
              <T id="matching_tracks" values={{ resultCount }} />
            </div>
          </If>
          <For
            of={results}
            ParentComponent={Container}
            renderItem={(item) => <TrackCard key={item.trackId} {...item} />}
          />
        </Skeleton>
      </If>
    );
  };

  const renderErrorState = () => {
    let trackError;
    if (tracksError) {
      trackError = tracksError;
    } else if (isEmpty(trackName)) {
      trackError = 'track_search_default';
    }
    return (
      !loading &&
      trackError && (
        <CustomCard color={tracksError ? 'red' : 'grey'} title={intl.formatMessage({ id: 'track_list' })}>
          <If condition={tracksError} otherwise={<T data-testid="default-message" id={trackError} />}>
            <T data-testid="error-message" text={tracksError} />
          </If>
        </CustomCard>
      )
    );
  };

  return (
    <>
      <Container maxwidth={maxwidth} padding={padding}>
        <CustomCard title={intl.formatMessage({ id: 'track_search' })} maxwidth={maxwidth}>
          <T marginBottom={10} id="get_track_details" />
          <Search
            data-testid="search-bar"
            defaultValue={trackName}
            type="text"
            onChange={(evt) => debouncedHandleOnChange(evt.target.value)}
            onSearch={(searchText) => debouncedHandleOnChange(searchText)}
          />
        </CustomCard>
        {renderTrackList()}
        {renderErrorState()}
      </Container>
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
  tracksError: PropTypes.string,
  trackName: PropTypes.string,
  maxwidth: PropTypes.number,
  padding: PropTypes.number
};

ItunesContainer.defaultProps = {
  maxwidth: 500,
  padding: 20,
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

export default compose(injectIntl, withConnect, memo, injectSaga({ key: 'itunesContainer', saga }))(ItunesContainer);

export const ItunesContainerTest = compose(injectIntl)(ItunesContainer);
