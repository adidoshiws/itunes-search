import React, { useEffect, useState, useRef, memo } from 'react';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import T from '@components/T';
import If from '@components/If';
import styled from 'styled-components';
import { Card, Button, Image } from 'antd';
import { selectLoading, selectTrackDetailsData, selectTrackDetailsError, selectTrackId } from './selectors';
import { trackDetailsCreators } from './reducer';
import { connect } from 'react-redux';
import trackDetailsSaga from './saga';
import { injectIntl, FormattedMessage } from 'react-intl';
import { injectSaga } from 'redux-injectors';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useParams } from 'react-router-dom';

const CustomCard = styled(Card)`
  && {
    margin: 20px 0;
    max-width: ${(props) => props.maxwidth};
    color: ${(props) => props.color};
    ${(props) => props.color && `color: ${props.color}`};
  }
`;

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

export function TrackDetailsContainer({ dispatchTrackDetails, trackDetailsData, loading }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const params = useParams();
  const audioRef = useRef(null);

  const { resultCount, results } = trackDetailsData;

  useEffect(() => {
    if (params.trackId) {
      dispatchTrackDetails(params.trackId);
    }
  }, [params]);

  function playHandler(event) {
    event.preventDefault();
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }

  if (loading) {
    return (
      <Container data-testid="track-details" maxwidth={600} padding={20}>
        <CustomCard data-testid="loading-card">
          <T id="loading" />
        </CustomCard>
      </Container>
    );
  }

  if (!resultCount) {
    return (
      <Container data-testid="track-details" maxwidth={600} padding={20}>
        <CustomCard data-testid="loading-card">
          <T id="track_not_found" />
        </CustomCard>
      </Container>
    );
  }

  const info = results[0];

  return (
    <Container data-testid="track-details">
      <ImageWrapper>
        <TrackImage width={200} src={info.artworkUrl100} />
        <TrackDetailsSection>
          <If
            condition={!isEmpty(info.trackName)}
            otherwise={<T data-testid="name-unavailable" id="track_name_unavailable" />}
          >
            <T data-testid="trackName" id="track_name" values={{ trackName: info.trackName }} />
          </If>

          <If
            condition={!isEmpty(info.collectionName)}
            otherwise={<T data-testid="collectionName-unavailable" id="track_collection_name_unavailable" />}
          >
            <T
              data-testid="collectionName"
              id="track_collection_name"
              values={{ collectionName: info.collectionName }}
            />
          </If>

          <If
            condition={!isEmpty(info.country)}
            otherwise={<T data-testid="country-unavailable" id="track_country_unavailable" />}
          >
            <T data-testid="trackCountry" id="track_country" values={{ country: info.country }} />
          </If>

          <If
            condition={!isEmpty(info.kind)}
            otherwise={<T data-testid="kind-unavailable" id="track_kind_unavailable" />}
          >
            <T data-testid="trackKind" id="track_kind" values={{ kind: info.kind }} />
          </If>
          <audio ref={audioRef} data-testid="preview" id="track_preview" src={info.previewUrl}></audio>
          <PlayBtn type="primary" onClick={playHandler}>
            {isPlaying ? <FormattedMessage id="details_pause_btn" /> : <FormattedMessage id="details_play_btn" />}
          </PlayBtn>
        </TrackDetailsSection>
      </ImageWrapper>
    </Container>
  );
}

TrackDetailsContainer.propTypes = {
  dispatchTrackDetails: PropTypes.func,
  intl: PropTypes.object,
  trackDetailsData: PropTypes.object,
  trackId: PropTypes.string,
  trackDetailsError: PropTypes.string,
  loading: PropTypes.bool
};

const mapStateToProps = createStructuredSelector({
  trackDetailsData: selectTrackDetailsData(),
  trackDetailsError: selectTrackDetailsError(),
  trackId: selectTrackId(),
  loading: selectLoading()
});
export function mapDispatchToProps(dispatch) {
  const { requestGetTrackDetails } = trackDetailsCreators;

  return {
    dispatchTrackDetails: (trackId) => dispatch(requestGetTrackDetails(trackId))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  injectIntl,
  withConnect,
  memo,
  injectSaga({ key: 'trackDetailsContainer', saga: trackDetailsSaga })
)(TrackDetailsContainer);

export const TrackDetailsContainerTest = compose(injectIntl)(TrackDetailsContainer);
