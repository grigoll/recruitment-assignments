import { useEffect, useMemo, useState } from 'react';
import { styled, debounce } from '@mui/material';

import { Typeahead } from './Typeahead';
import { useFetcher } from '../hooks';
import { httpClient } from '../mock';

const Button = styled('button')(({ theme }) => ({
  all: 'unset',
  backgroundColor: theme.palette.primary.light,
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.common.white,
  cursor: 'pointer',
  display: 'inline-block',
  padding: theme.spacing(1, 2),
  transition: 'background-color 100ms linear',
  border: '2px solid transparent',
  marginTop: theme.spacing(2),
  '&:hover': { backgroundColor: theme.palette.primary.main },
  '&:focus': { borderColor: theme.palette.primary.dark },
  '&:disabled': {
    backgroundColor: theme.palette.grey[400],
    cursor: 'not-allowed',
  },
}));

const BookedTrips = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export const TypeaheadContainer = () => {
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const { data: options } = useFetcher(
    `https://example.com/names/?search=${searchValue}&limit=10`,
    httpClient.search
  );

  const onChange = useMemo(() => debounce(setSearchValue, 200), []);

  const inputProps = useMemo(
    () => ({
      placeholder: 'Country',
      autoComplete: 'off',
      onChange,
    }),
    [onChange]
  );

  useEffect(() => {
    setLoading(true);
  }, [searchValue]);

  useEffect(() => {
    setHasSubmitted(false);
  }, [selected]);

  useEffect(() => {
    options && setLoading(false);
  }, [options]);

  return (
    <>
      <Typeahead
        multiple
        loading={loading}
        options={options ?? []}
        onSelect={setSelected}
        inputProps={inputProps}
      />

      <Button
        disabled={selected.length === 0}
        onClick={() => setHasSubmitted(true)}
      >
        Book trip
      </Button>

      {hasSubmitted && selected.length > 0 && (
        <BookedTrips>
          You have booked:&nbsp;
          {selected.join(', ')}
        </BookedTrips>
      )}
    </>
  );
};
