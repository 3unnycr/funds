import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// Define a service using a base URL and expected endpoints

export const cfdApi = createApi({
  reducerPath: "cfdApi",

  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BACKEND_URL }),

  endpoints: builder => ({
    addCfd: builder.mutation({
      query: body => {
        return {
          url: "/api/user/cfd/create",
          method: "post",
          headers: { Authorization: `Bearer ${body.token}` },
          body
        }
      }
    })
  })
})

// Export hooks for usage in functional components, which are

// auto-generated based on the defined endpoints

export const { useAddCfdMutation } = cfdApi
