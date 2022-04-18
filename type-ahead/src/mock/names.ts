import names from './names.json';

export const mockNames = names
  .filter(
    // filter out duplicates
    ({ name }, idx, self) => self.findIndex((itm) => itm.name === name) === idx
  )
  .map(({ id, name }) => ({ id, label: name }));
