/**
 *
 * Tests for ItunesContainer
 *
 */

import React from 'react';
import { fireEvent } from '@testing-library/dom';
import { timeout, renderProvider } from '@utils/testUtils';
// import { translate } from '@app/components/IntlGlobalProvider';
import { ItunesContainerTest as ItunesContainer, mapDispatchToProps } from '../index';
import { homeContainerTypes } from '../reducer';

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

  it('should call dispatchItuneTracks on submit', async () => {
    const trackName = 'rockstar';
    const { getByTestId } = renderProvider(<ItunesContainer dispatchItuneTracks={submitSpy} />);
    fireEvent.keyDown(getByTestId('search-bar'), { keyCode: 13, target: { value: trackName } });

    await timeout(500);
    expect(submitSpy).toBeCalledWith(trackName);
  });

  it('should  dispatchItuneTracks on update on mount if trackName is already persisted', async () => {
    const trackName = 'rockstar';
    renderProvider(<ItunesContainer trackName={trackName} tracksData={null} dispatchItuneTracks={submitSpy} />);

    await timeout(500);
    expect(submitSpy).toBeCalledWith(trackName);
  });

  it('should validate mapDispatchToProps actions', async () => {
    const dispatchTracksSearchSpy = jest.fn();
    const trackName = 'rockstar';
    const actions = {
      dispatchItuneTracks: { trackName, type: homeContainerTypes.REQUEST_GET_ITUNE_TRACKS },
      dispatchClearGithubRepos: { type: homeContainerTypes.CLEAR_ITUNE_TRACKS }
    };

    const props = mapDispatchToProps(dispatchTracksSearchSpy);
    props.dispatchItuneTracks(trackName);
    expect(dispatchTracksSearchSpy).toHaveBeenCalledWith(actions.dispatchItuneTracks);

    await timeout(500);
    props.dispatchClearGithubRepos();
    expect(dispatchTracksSearchSpy).toHaveBeenCalledWith(actions.dispatchClearGithubRepos);
  });
});
