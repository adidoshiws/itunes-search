/**
 *
 * Tests for ItunesContainer
 *
 */

import React from 'react';
import { fireEvent } from '@testing-library/dom';
import { timeout, renderProvider } from '@utils/testUtils';
import { ItunesContainerTest as ItunesContainer } from '../index';

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
});
