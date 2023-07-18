import { api } from '@/redux/api/apiSlice';

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    monsaiseProducts: builder.query({
      query: () => `/products`,
    }),
    singleProduct: builder.query({
      query: (id) => `product/${id}`,
    }),
    postComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/comment/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['comment'],
    }),
    comments: builder.query({
      query: (id) => `/comment/${id}`,
      providesTags: ['comment'],
    }),
  }),
});

export const {
  useMonsaiseProductsQuery,
  useSingleProductQuery,
  usePostCommentMutation,
  useCommentsQuery,
} = productApi;
