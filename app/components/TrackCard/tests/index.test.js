/**
 *
 * Tests for TrackCard
 *
 */

import React from 'react';
import { renderWithIntl } from '@utils/testUtils';
import TrackCard from '../index';
import { translate } from '@app/components/IntlGlobalProvider/index';

describe('<TrackCard />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<TrackCard />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 TrackCard component', () => {
    const { getAllByTestId } = renderWithIntl(<TrackCard />);
    expect(getAllByTestId('track-card').length).toBe(1);
  });

  it('should render the track details inside the card', () => {
    const trackName = 'Upside Down';
    const collectionName = 'Jack Johnson and Friends';
    const previewUrl =
      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/5e/5b/3d/5e5b3df4-deb5-da78-5d64-fe51d8404d5c/mzaf_13341178261601361485.plus.aac.p.m4a';
    const { getByTestId } = renderWithIntl(
      <TrackCard trackName={trackName} collectionName={collectionName} preview={previewUrl} />
    );
    expect(getByTestId('trackName')).toHaveTextContent(trackName);
    expect(getByTestId('collectionName')).toHaveTextContent(collectionName);
    expect(getByTestId('preview')).toHaveTextContent(previewUrl);
  });

  it('should render the track unavailable messages in case any props are unavailable or have falsy values', () => {
    const trackUnavailable = translate('track_name_unavailable');
    const collectionNameUnavailable = translate('track_collection_name_unavailable');
    const previewUnavailable = translate('track_preview_unavailable');
    const { getByTestId } = renderWithIntl(<TrackCard />);
    expect(getByTestId('name-unavailable')).toHaveTextContent(trackUnavailable);
    expect(getByTestId('collectionName-unavailable')).toHaveTextContent(collectionNameUnavailable);
    expect(getByTestId('preview-unavailable')).toHaveTextContent(previewUnavailable);
  });
});
