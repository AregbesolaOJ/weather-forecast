/* eslint-disable testing-library/prefer-screen-queries */
import { fireEvent, render } from '@testing-library/react';
import { Button } from '../Button';

const makeSut = (props) => {
  return render(<Button size="sm" onClick={jest.fn()} {...props} />);
};

describe('<Button />', () => {
  test('Should render correctly', () => {
    const utils = render(<Button />);

    const btn = utils.getByTestId('myButton');
    // const { getByTestId } = makeSut({});

    expect(btn).toBeInTheDocument();
  });

  test('Should call onClick successfully', () => {
    const spy = jest.fn();

    const { getByTestId } = makeSut({ onClick: spy });

    fireEvent.click(getByTestId('myButton'));

    expect(spy).toHaveBeenCalled();
  });
});
