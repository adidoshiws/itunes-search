/**
 *
 * Track Details
 *
 */
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { selectTrackDetailsData, selectTrackDetailsError } from '@app/containers/ItunesContainer/selectors';
import { itunesContainerCreators } from '@app/containers/ItunesContainer/reducer';
import itunesContainerSaga from '@app/containers/ItunesContainer/saga';
import { injectSaga } from 'redux-injectors';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Image, Button } from 'antd';
import T from '@components/T';
import If from '@components/If';
import isEmpty from 'lodash/isEmpty';
import { injectIntl, FormattedMessage } from 'react-intl';

const Container = styled.div`
  && {
    margin: 1.9rem auto;
    padding: 20px;
    height: max-content;
    width: 40rem;
    box-shadow: 0 5px 20px -5px rgb(191 192 192);
    border-radius: 0.8rem;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  gap: 1.4rem;
`;

const TrackDetailsSection = styled.div``;

const TrackImage = styled(Image)`
  width: ${(props) => props.width}px;
`;

const PlayBtn = styled(Button)`
  type: ${(props) => props.type};
`;

export function TrackDetails({ trackDetailsData, dispatchItuneTrackDetails }) {
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const params = useParams();
  const audioRef = useRef();

  const { results } = trackDetailsData;

  const playHandler = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (trackDetailsData) {
      setLoading(false);
    }
  }, [trackDetailsData]);

  useEffect(() => {
    if (params.trackId) {
      setLoading(true);
      dispatchItuneTrackDetails(params.trackId);
    }
  }, [params.trackId]);

  useEffect(() => {
    if (!trackDetailsData?.results?.length) {
      setLoading(true);
    }
  }, []);

  const details = results[0];

  const renderDetails = () => {
    <If condition={!isEmpty(details) || loading}>Loading...</If>;
  };

  return (
    <>
      <Container>
        <ImageWrapper>
          <TrackImage width={200} src={details.artworkUrl100} />
          <TrackDetailsSection>
            <If
              condition={!isEmpty(details.trackName)}
              otherwise={<T data-testid="name-unavailable" id="track_name_unavailable" />}
            >
              <T data-testid="trackName" id="track_name" values={{ trackName: details.trackName }} />
            </If>

            <If
              condition={!isEmpty(details.collectionName)}
              otherwise={<T data-testid="collectionName-unavailable" id="track_collection_name_unavailable" />}
            >
              <T
                data-testid="collectionName"
                id="track_collection_name"
                values={{ collectionName: details.collectionName }}
              />
            </If>

            <If
              condition={!isEmpty(details.country)}
              otherwise={<T data-testid="country-unavailable" id="track_country_unavailable" />}
            >
              <T data-testid="trackCountry" id="track_country" values={{ country: details.country }} />
            </If>

            <If
              condition={!isEmpty(details.kind)}
              otherwise={<T data-testid="kind-unavailable" id="track_kind_unavailable" />}
            >
              <T data-testid="trackKind" id="track_kind" values={{ kind: details.kind }} />
            </If>
            <audio ref={audioRef} data-testid="preview" id="track_preview" src={details.previewUrl}></audio>
            <PlayBtn type="primary" onClick={playHandler}>
              {isPlaying ? <FormattedMessage id="details_pause_btn" /> : <FormattedMessage id="details_play_btn" />}
            </PlayBtn>
          </TrackDetailsSection>
        </ImageWrapper>
      </Container>
      {renderDetails()}
    </>
  );
}

TrackDetails.propTypes = {
  trackDetailsData: PropTypes.object,
  dispatchItuneTrackDetails: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  trackDetailsData: selectTrackDetailsData(),
  trackDetailsError: selectTrackDetailsError()
});

export function mapDispatchToProps(dispatch) {
  const { getTrackDetails } = itunesContainerCreators;
  return {
    dispatchItuneTrackDetails: (trackId) => dispatch(getTrackDetails(trackId))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  injectIntl,
  withConnect,
  injectSaga({ key: 'itunesContainer', saga: itunesContainerSaga })
)(TrackDetails);

export const TrackDetailsTest = compose(injectIntl)(TrackDetails);
