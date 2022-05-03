/**
 *
 * Track Card
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card } from 'antd';
import T from '@components/T';
import If from '@components/If';
import { isEmpty } from 'lodash';

const CustomCard = styled(Card)`
  && {
    margin: 20px 0;
  }
`;

export function TrackCard({ trackName, collectionName, previewUrl }) {
  return (
    <CustomCard data-testid="track-card">
      <If condition={!isEmpty(trackName)} otherwise={<T data-testid="name-unavailable" id="track_name_unavailable" />}>
        <T data-testid="trackName" id="track_name" values={{ trackName: trackName }} />
      </If>
      <If
        condition={!isEmpty(collectionName)}
        otherwise={<T data-testid="collectionName-unavailable" id="track_collection_name_unavailable" />}
      >
        <T data-testid="collectionName" id="track_collection_name" values={{ collectionName: collectionName }} />
      </If>
      <If condition={previewUrl} otherwise={<T data-testid="preview-unavailable" id="track_preview_unavailable" />}>
        <audio data-testid="preview" id="track_preview" src={previewUrl} controls></audio>
      </If>
    </CustomCard>
  );
}

TrackCard.propTypes = {
  trackName: PropTypes.string,
  collectionName: PropTypes.string,
  previewUrl: PropTypes.string
};

export default TrackCard;
