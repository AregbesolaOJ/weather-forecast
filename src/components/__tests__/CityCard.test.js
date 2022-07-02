/* eslint-disable testing-library/prefer-screen-queries */
/**

@jest-environment jsdom
*/

import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { TestNavigator } from '../../App.test';
import { sampleWeatherData } from '../../utilities';
import { CityCard } from '../CityCard';

// One way to Mock `fetch`
// const fetchMock = jest
//   .spyOn(global, 'fetch')
//   .mockImplementation(() =>
//     Promise.resolve({ json: () => Promise.resolve([]) })
//   );

// Another way to Mock `fetch`
const unmockedFetch = global.fetch;
beforeAll(() => {
  global.fetch = () =>
    Promise.resolve({
      json: () => Promise.resolve([])
    });
});
afterAll(() => {
  global.fetch = unmockedFetch;
});

describe('<CityCard />', () => {
  test('Should render correctly', () => {
    const utils = render(
      <TestNavigator>
        <CityCard />
      </TestNavigator>
    );

    const card = utils.getByTestId('card');

    expect(card).toBeInTheDocument();
  });

  test('fetch weather data', async () => {
    // fetchMock.mockResolvedValue(sampleWeatherData);
    render(
      <TestNavigator>
        <CityCard />
      </TestNavigator>
    );

    act(() => {
      jest.useFakeTimers();
      unmockedFetch(sampleWeatherData);
    });

    await act(async () => {
      const allCards = await waitFor(() => screen.findAllByTestId('card'));
      expect(allCards).toHaveLength(1);
    });
  });
});
