/**
 *
 * Tests for TrackDetails
 *
 */

import React from 'react';
import { Provider } from 'react-redux';
import { renderWithIntl } from '@utils/testUtils';
import TrackDetails from '../index';
import { translate } from '@app/components/IntlGlobalProvider/index';
import configureStore from '@app/configureStore';
import history from '@app/utils/history';

const initialState = {};

const { store } = configureStore(initialState, history);

describe('<TrackDetails />', () => {
  const MockTrackDetails = (props) => {
    return (
      <Provider store={store}>
        <TrackDetails {...props} />
      </Provider>
    );
  };

  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<MockTrackDetails />);
    expect(baseElement).toMatchSnapshot();
  });

  // it('should contain 1 TrackDetails component', () => {
  //   const { getAllByTestId } = renderWithIntl(<MockTrackDetails />);
  //   expect(getAllByTestId('track-details').length).toBe(1);
  // });

  it('should render the track details inside the component', () => {
    const trackName = 'Upside Down';
    const collectionName = 'Jack Johnson and Friends';
    const country = 'USA';
    const previewUrl = 'https://example.m4a';
    const kind = 'song';
    const { getByTestId } = renderWithIntl(
      <MockTrackDetails
        trackName={trackName}
        collectionName={collectionName}
        previewUrl={previewUrl}
        country={country}
        kind={kind}
      />
    );
    expect(getByTestId('trackName')).toHaveTextContent(trackName);
    expect(getByTestId('collectionName')).toHaveTextContent(collectionName);
    expect(getByTestId('country')).toHaveTextContent(country);
    expect(getByTestId('kind')).toHaveTextContent(kind);
  });

  it('should render the track unavailable messages in case any props are unavailable or have falsy values', () => {
    const trackUnavailable = translate('track_name_unavailable');
    const collectionNameUnavailable = translate('track_collection_name_unavailable');
    const previewUnavailable = translate('track_preview_unavailable');
    const countryUnavailable = translate('track_country_unavailable');
    const kindUnavailable = translate('track_kind_unavailable');
    const { getByTestId } = renderWithIntl(<MockTrackDetails />);
    expect(getByTestId('name-unavailable')).toHaveTextContent(trackUnavailable);
    expect(getByTestId('collectionName-unavailable')).toHaveTextContent(collectionNameUnavailable);
    expect(getByTestId('preview-unavailable')).toHaveTextContent(previewUnavailable);
    expect(getByTestId('country-unavailable')).toHaveTextContent(countryUnavailable);
    expect(getByTestId('kind-unavailable')).toHaveTextContent(kindUnavailable);
  });
});
