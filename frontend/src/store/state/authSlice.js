import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  firstname: null,
  lastname: null,
  email: null,
  token: null
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.firstname = action.payload.firstname
      state.lastname = action.payload.lastname
      state.email = action.payload.email
      state.token = action.payload.token
    },
    defaultState: state => {
      state = initialState;
    }
  }
})

// Action creators are generated for each case reducer function
export const { setUser, defaultState } = authSlice.actions

export default authSlice.reducer
