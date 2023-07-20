import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import authReducer from "./state/authSlice"
import { authApi } from "./api/authApi"
import { cfdApi } from "./api/cfdApi"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [cfdApi.reducerPath]: cfdApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authApi.middleware, cfdApi.middleware)
})

setupListeners(store.dispatch)
