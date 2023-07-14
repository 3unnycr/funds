import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BACKEND_URL }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body: {email: string; password: string}) => {
        return {
          url: "/api/auth/login",
          method: "post",
          body,
        }
      }
    }),
    registerUser: builder.mutation({
      query: (body: {firstname: string; lastname: string; email: string; password: string}) => {
        return {
          url: "/api/auth/register",
          method: "post",
          body,
        }
      },
    }),
    forgotPassword: builder.mutation({
      query: (body: {email: string}) => {
        return {
          url: "/api/auth/forgotpassword",
          method: "post",
          body,
        }
      },
    }),
    passwordReset: builder.mutation({
      query: (body: { password: string; confirm: string; resetToken: string}) => {
        return {
          url: `/api/auth/resetpassword/${body.resetToken}`,
          method: "put",
          body,
        }
      },
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginUserMutation, useRegisterUserMutation, useForgotPasswordMutation, usePasswordResetMutation } = authApi;
