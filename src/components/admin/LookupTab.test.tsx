import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import LookupTab from './LookupTab';
import { vi } from 'vitest';

test('renders lookup and triggers onSearch', () => {
  const setLookupQuery = vi.fn();
  const setLookupSearched = vi.fn();
  const onSearch = vi.fn();

  render(
    <LookupTab
      lookupQuery={''}
      setLookupQuery={setLookupQuery}
      lookupSearched={''}
      setLookupSearched={setLookupSearched}
      onSearch={onSearch}
    />
  );

  const btn = screen.getByText(/Search/i);
  fireEvent.click(btn);
  expect(onSearch).toHaveBeenCalled();
});
