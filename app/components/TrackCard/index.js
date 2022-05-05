/**
 *
 * Track Card
 *
 */

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Col, Button } from 'antd';
import T from '@components/T';
import If from '@components/If';
import { isEmpty } from 'lodash';
import { Link } from 'react-router-dom';

const CustomCard = styled(Col)`
  && {
    margin: 20px 0;
    ${(props) => props.span};
    cursor: pointer;
    border: 1px solid gray;
    padding: 10px;
  }
`;

const TrackImg = styled.img`
  && {
    text-align: center;
  }
`;

export function TrackCard({
  trackName,
  collectionName,
  previewUrl,
  trackId,
  artworkUrl100,
  dispatchCurrentTrack,
  currentTrack
}) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      if (currentTrack !== trackId) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [currentTrack]);

  const playHandler = () => {
    if (audioRef.current.paused) {
      dispatchCurrentTrack(trackId);
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      dispatchCurrentTrack(null);
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <CustomCard data-testid="track-card" span={6}>
      <Link style={{ color: 'black' }} to={`/tracks/${trackId}`}>
        <If
          condition={!isEmpty(artworkUrl100)}
          otherwise={<T data-testid="img-unavailable" id="track_img_unavailable" />}
        >
          <TrackImg data-testid="trackImage" id="track_img" src={artworkUrl100} />
        </If>
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
      </Link>
      <If
        condition={!isEmpty(previewUrl)}
        otherwise={<T data-testid="preview-unavailable" id="track_preview_unavailable" />}
      >
        <audio ref={audioRef} data-testid="preview" id="track_preview" src={previewUrl}></audio>
        <Button type="primary" onClick={() => playHandler(trackId)}>
          {isPlaying ? 'Pause' : 'Preview'}
        </Button>
      </If>
    </CustomCard>
  );
}

TrackCard.propTypes = {
  trackName: PropTypes.string,
  collectionName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.number,
  artworkUrl100: PropTypes.string,
  dispatchCurrentTrack: PropTypes.func,
  currentTrack: PropTypes.number
};

export default TrackCard;
