/**
 *
 * Track Details
 *
 */
import { getTrackDetails } from '@app/services/itunesApi';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  && {
    margin: 30px auto;
    padding: 20px;
    height: max-content;
    border: 2px solid black;
  }
`;

export function TrackDetails() {
  const [details, setDetails] = useState([]);
  const params = useParams();

  useEffect(() => {
    const fetch = async () => {
      const response = await getTrackDetails(params.trackId);
      setDetails(response.data.results[0]);
    };

    fetch();
  }, []);
  return (
    <>
      <Container>
        <div>Artist Name: {details.artistName}</div>
        <audio src={details.previewUrl} controls></audio>
        <div>Country: {details.country}</div>
        <div>Price: {details.collectionPrice}</div>
      </Container>
    </>
  );
}

export default TrackDetails;
