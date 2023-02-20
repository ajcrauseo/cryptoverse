import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const options = {
  method: 'GET',
  url: 'https://crypto-news16.p.rapidapi.com/news/top/5',
  // headers:
};

const cryptoNewsHeaders = {
  'X-RapidAPI-Key': '74213fbfacmsh6e998b1fed79a3cp17d996jsn2b2c05c644c5',
  'X-RapidAPI-Host': 'crypto-news16.p.rapidapi.com',
};

const baseUrl = 'https://crypto-news16.p.rapidapi.com/news';

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: () => createRequest(`/coindesk`),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
