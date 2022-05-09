/**
 *
 * Tests for TrackDetailsContainer
 *
 */
import configureStore from '@app/configureStore';
import history from '@app/utils/history';
import { renderWithIntl } from '@app/utils/testUtils';
import React from 'react';
import { Provider } from 'react-redux';
import TrackDetails from '../index';
const initialState = {};
const { store } = configureStore(initialState, history);

describe('<TrackDetailsContainer />', () => {
  jest.spyOn(window.HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
  jest.spyOn(window.HTMLMediaElement.prototype, 'play').mockImplementation(() => {});

  const MockTrackDetails = (props) => {
    return (
      <Provider store={store}>
        <TrackDetails {...props} />
      </Provider>
    );
  };
  it('should render and match snapshot', () => {
    const baseComponent = renderWithIntl(<MockTrackDetails />);
    expect(baseComponent).toMatchSnapshot();
  });
  it('should contain only one TrackDetials Component', () => {
    const { getAllByTestId } = renderWithIntl(<MockTrackDetails />);
    expect(getAllByTestId('track-details').length).toBe(1);
  });
  it('should render loading when the page is initally loaded', () => {
    const { getByTestId } = renderWithIntl(<MockTrackDetails />);
    expect(getByTestId('loading-card')).toBeInTheDocument();
  });
});
