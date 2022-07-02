/* eslint-disable testing-library/prefer-screen-queries */
/**

@jest-environment jsdom
*/

import { render } from '@testing-library/react';
import { TestNavigator } from '../../App.test';
import { Home } from '../../pages/Home';
import locations from '../../data/items.json';

describe('Home Screen', () => {
  test('Landing screen renders correctly', () => {
    const utils = render(
      <TestNavigator>
        <Home />
      </TestNavigator>
    );

    const pageTitle = utils.getByText('Weather Forecast App');
    const currentLocationWeatherPrompt = utils.getByText(
      'See the weather forecast for your current location?'
    );

    expect(pageTitle).toBeInTheDocument();
    expect(currentLocationWeatherPrompt).toBeInTheDocument();
  });

  test('5 cards should be rendered correctly', () => {
    const makeSut = () => {
      return render(
        <TestNavigator>
          <Home />
        </TestNavigator>
      );
    };
    const { getAllByTestId } = makeSut({});

    const allLocationCards = getAllByTestId('location');

    expect(allLocationCards).toBeDefined();
    expect(allLocationCards.length).toBe(locations.length);
  });
});
