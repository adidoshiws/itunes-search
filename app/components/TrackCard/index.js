/**
 *
 * Track Card
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Col } from 'antd';
import T from '@components/T';
import If from '@components/If';
import { isEmpty } from 'lodash';
import { Link } from 'react-router-dom';

const CustomCard = styled(Col)`
  && {
    margin: 20px 0;
    ${(props) => props.span};
    cursor: pointer;
  }
`;

export function TrackCard({ trackName, collectionName, previewUrl, trackId }) {
  return (
    <Link style={{ color: 'black' }} to={`/tracks/${trackId}`}>
      <CustomCard data-testid="track-card" span={6}>
        <If
          condition={!isEmpty(trackName)}
          otherwise={<T data-testid="name-unavailable" id="track_name_unavailable" />}
        >
          <T data-testid="trackName" id="track_name" values={{ trackName: trackName }} />
        </If>
        <If
          condition={!isEmpty(collectionName)}
          otherwise={<T data-testid="collectionName-unavailable" id="track_collection_name_unavailable" />}
        >
          <T data-testid="collectionName" id="track_collection_name" values={{ collectionName: collectionName }} />
        </If>
        <If
          condition={!isEmpty(previewUrl)}
          otherwise={<T data-testid="preview-unavailable" id="track_preview_unavailable" />}
        >
          <audio style={{ width: '220px' }} data-testid="preview" id="track_preview" src={previewUrl} controls></audio>
        </If>
      </CustomCard>
    </Link>
  );
}

TrackCard.propTypes = {
  trackName: PropTypes.string,
  collectionName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.number
};

export default TrackCard;
