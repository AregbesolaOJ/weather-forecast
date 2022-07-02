import { renderHook } from '@testing-library/react';
import { act } from '@testing-library/react-hooks';

import { useLocalStorage } from '../../hooks/useLocalStorage';

const makeSut = (key, value) => {
  return renderHook(() => useLocalStorage(key, value));
};

describe('useLocalStorage Hook', () => {
  test('Should return undefined when initialized with nothing', () => {
    const { result } = makeSut();

    const [value] = result.current;
    expect(value).toBeUndefined();
  });

  test('Should return empty object on initial state', () => {
    const { result } = makeSut('sample1', {});

    act(() => {
      const [, setValue] = result.current;
      setValue({});
    });

    const [value] = result.current;
    expect(value).toStrictEqual({});
  });

  test('Should return a string when same is kept in storage', () => {
    const { result } = makeSut('sample2', 'Studio 14');

    act(() => {
      const [, setValue] = result.current;
      setValue('Careers @ Studio 14');
    });

    const [value] = result.current;
    expect(value).toBe('Careers @ Studio 14');
  });
});
