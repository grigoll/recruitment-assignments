import { mockNames } from './names';

/**
 * If it's a costly API and frequently addressed
 * we could do de-duplication and abort prior requests
 * to reduce load on the API
 */
export const httpClient = {
  search: async (url: string) => {
    const { searchParams } = new URL(url);

    const search = searchParams.get('search') ?? '';
    const limit = Number(searchParams.get('limit'));

    // imitate delay
    await new Promise((res) => setTimeout(res, 200));

    return query(search, limit);
  },
};

export const query = async (str: string, limit: number) =>
  mockNames
    .filter(({ label }) => label.toLowerCase().startsWith(str.toLowerCase()))
    .slice(0, limit);
