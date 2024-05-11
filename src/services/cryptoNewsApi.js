import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders = {
    'X-RapidAPI-Key': '6c949496cemsh1190dd707341cc3p1c07f1jsn6942ee14b5eb',
    'X-RapidAPI-Host': 'bing-search-apis.p.rapidapi.com'
};

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://bing-search-apis.p.rapidapi.com' }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ keyword, page, size }) => createRequest(`/api/rapid/web_search?keyword=${encodeURIComponent(keyword)}&page=${page}&size=${size}`),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;