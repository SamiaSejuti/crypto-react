import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
  'X-RapidAPI-Key': '6c949496cemsh1190dd707341cc3p1c07f1jsn6942ee14b5eb',
  'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
  };

const baseUrl = 'https://coinranking1.p.rapidapi.com'
const createRequest = (url) => ({ url, headers: cryptoApiHeaders });


  export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
      getCryptos: builder.query({
        query: (count) => createRequest(`/coins?limit=${count}`),
      }),
      getCryptoDetails: builder.query({
        query: (coinId) => createRequest(`/coin/${coinId}`),
      }),
  
     
      getCryptoHistory: builder.query({
        query: ({ coinId, timeperiod }) => createRequest(`coin/${coinId}/history?timeperiod=${timeperiod}`),
      }),
  
      
    }),
  });
  
  export const {
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetExchangesQuery,
    useGetCryptoHistoryQuery,
  } = cryptoApi;