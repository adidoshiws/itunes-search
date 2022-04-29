/**
 *
 * TrackCard
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

export function TrackCard({ primaryGenreName, trackName, trackCount }) {
  return (
    <CustomCard data-testid="repo-card">
      <If
        condition={!isEmpty(primaryGenreName)}
        otherwise={<T data-testid="name-unavailable" id="primary_name_unavailable" />}
      >
        <T data-testid="name" id="primary_name" values={{ name: primaryGenreName }} />
      </If>
      <If
        condition={!isEmpty(trackName)}
        otherwise={<T data-testid="fullName-unavailable" id="track_full_name_unavailable" />}
      >
        <T data-testid="fullName" id="track_full_name" values={{ fullName: trackName }} />
      </If>
      <If condition={trackCount} otherwise={<T data-testid="count-unavaiable" id="track_count_unavailable" />}>
        <T data-testid="count" id="track_count" values={{ count: trackCount }} />
      </If>
    </CustomCard>
  );
}

TrackCard.propTypes = {
  primaryGenreName: PropTypes.string,
  trackName: PropTypes.string,
  trackCount: PropTypes.number
};

export default TrackCard;
