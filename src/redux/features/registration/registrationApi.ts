import { api } from "../../api/apiSlice";

const registrationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMyRegistrations: builder.query({
      query: () => `/registrations/my-registrations`,
      providesTags: ["registrations"],
    }),
    getShowToAllRegistrations: builder.query({
      query: () => `/registrations/show-to-all`,
      providesTags: ["registrations"],
    }),
    getSingleRegistration: builder.query({
      query: (id) => `/registrations/${id}`,
      providesTags: ["registrations"],
    }),
    createRegistration: builder.mutation({
      query: (data) => ({
        url: "/registrations/create-registration",
        method: "POST",
        body: data,
      }),
    }),
    updateRegistration: builder.mutation({
      query: ({ id, data }) => ({
        url: `/registrations/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["registrations"],
    }),
  }),
});

export const {
  useGetMyRegistrationsQuery,
  useGetSingleRegistrationQuery,
  useCreateRegistrationMutation,
  useGetShowToAllRegistrationsQuery,
  useUpdateRegistrationMutation,
} = registrationApi;
