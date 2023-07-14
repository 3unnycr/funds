import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  firstname: string | null;
  lastname: string | null;
  email: string | null;
  token: string | null;
}

const initialState: AuthState = {
  firstname: null,
  lastname: null,
  email: null,
  token: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState>) => {
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    defaultState:(state) => {
      state = initialState;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser, defaultState } = authSlice.actions

export default authSlice.reducer
