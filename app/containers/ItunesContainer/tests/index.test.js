/**
 *
 * Tests for ItunesContainer
 *
 */

import React from 'react';
import { fireEvent } from '@testing-library/dom';
import { timeout, renderProvider } from '@utils/testUtils';

describe('<ItunesContainer /> tests', () => {
  let submitSpy;

  beforeEach(() => {
    submitSpy = jest.fn();
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<ItunesContainer dispatchItuneTracks={submitSpy} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should call dispatchClearItuneTracks on empty change', async () => {
    const getItuneTracksSpy = jest.fn();
    const clearItuneTracksSpy = jest.fn();
    const { getByTestId } = renderProvider(
      <ItunesContainer dispatchClearItuneTracks={clearItuneTracksSpy} dispatchItuneTracks={getItuneTracksSpy} />
    );
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'a' }
    });
    await timeout(500);
    expect(getItuneTracksSpy).toBeCalled();
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: '' }
    });
    await timeout(500);
    expect(clearItuneTracksSpy).toBeCalled();
  });

  it('should call dispatchItuneTracks on change and after enter', async () => {
    const trackName = 'rockstar';
    const { getByTestId } = renderProvider(<ItunesContainer dispatchItuneTracks={submitSpy} />);
    const searchBar = getByTestId('search-bar');
    fireEvent.change(searchBar, {
      target: { value: trackName }
    });
    await timeout(500);
    expect(submitSpy).toBeCalledWith(trackName);

    fireEvent.keyDown(searchBar, {
      key: 'Enter',
      code: 13,
      charCode: 13
    });
    expect(submitSpy).toBeCalledWith(trackName);
  });

  it('should  dispatchItuneTracks on update on mount if trackName is already persisted', async () => {
    const trackName = 'rockstar';
    renderProvider(<ItunesContainer trackName={trackName} tracksData={null} dispatchItuneTracks={submitSpy} />);

    await timeout(500);
    expect(submitSpy).toBeCalledWith(trackName);
  });

  // check
  it('should validate mapDispatchToProps actions', async () => {
    const dispatchTracksSearchSpy = jest.fn();
    const trackName = 'rockstar';
    const actions = {
      dispatchItuneTracks: { trackName, type: itunesContainerTypes.REQUEST_GET_ITUNE_TRACKS },
      dispatchClearItuneTracks: { type: itunesContainerTypes.CLEAR_ITUNE_TRACKS }
    };

    const props = mapDispatchToProps(dispatchTracksSearchSpy);
    props.dispatchItuneTracks(trackName);
    expect(dispatchTracksSearchSpy).toHaveBeenCalledWith(actions.dispatchItuneTracks);

    await timeout(500);
    props.dispatchClearItuneTracks();
    expect(dispatchTracksSearchSpy).toHaveBeenCalledWith(actions.dispatchClearItuneTracks);
  });

  it('should render default error message when search goes wrong', () => {
    const defaultError = translate('something_went_wrong');
    const { getByTestId } = renderProvider(<ItunesContainer tracksError={defaultError} />);
    expect(getByTestId('error-message')).toBeInTheDocument();
    expect(getByTestId('error-message').textContent).toBe(defaultError);
  });

  it('should render the default message when searchBox is empty and tracksError is null', () => {
    const defaultMessage = translate('track_search_default');
    const { getByTestId } = renderProvider(<ItunesContainer />);
    expect(getByTestId('default-message')).toBeInTheDocument();
    expect(getByTestId('default-message').textContent).toBe(defaultMessage);
  });

  it('should render the data when loading becomes false', () => {
    const tracksData = { results: [{ trackOne: 'rockstar' }] };
    const { getByTestId } = renderProvider(<ItunesContainer tracksData={tracksData} dispatchItuneTracks={submitSpy} />);
    expect(getByTestId('for')).toBeInTheDocument();
  });

  it('should render exact number of TrackCards as per resultCount in results', () => {
    const resultCount = 3;
    const tracksData = {
      resultCount,
      results: [
        {
          trackName: 'broken',
          collectionName: 'Jack Johnson and Friends',
          preview:
            'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/8b/fd/81/8bfd81a6-0217-b56c-01b0-7249ed910a35/mzaf_16218415284344588014.plus.aac.p.m4a'
        },
        {
          trackName: 'react',
          collectionName: 'Jack Johnson and Friends',
          preview:
            'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/0d/1b/1a/0d1b1a37-2068-0e62-2162-0c9822fbc03c/mzaf_4390099184106020569.plus.aac.p.m4a'
        },
        {
          trackName: 'my own two hands',
          collectionName: 'Three Way Tie',
          preview:
            'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/fd/bb/38/fdbb38d2-073d-4bc7-68c4-348a0be6d560/mzaf_4150435585996894188.plus.aac.p.m4a'
        }
      ]
    };
    const { getAllByTestId } = renderProvider(
      <ItunesContainer tracksData={tracksData} dispatchItuneTracks={submitSpy} />
    );
    expect(getAllByTestId('track-card').length).toBe(resultCount);
  });

  it('should render Skeleton Comp when "loading" is true', async () => {
    const trackName = 'some track';
    const { getByTestId, baseElement } = renderProvider(
      <ItunesContainer dispatchItuneTracks={submitSpy} trackName={trackName} />
    );
    fireEvent.change(getByTestId('search-bar'), { target: { value: trackName } });
    await timeout(500);
    expect(baseElement.getElementsByClassName('ant-skeleton').length).toBe(1);
  });
});
