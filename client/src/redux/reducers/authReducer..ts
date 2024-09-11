

import { createSlice } from '@reduxjs/toolkit'
import { localDataNames } from '../../constants/appInfos';

const initialState = {
  data: {
    token: '',
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    addAuth: (state, action) => {
      state.data = action.payload;
      syncLocal(action.payload)
    },
    remoAuth: (state) => {
      state.data = initialState.data
      syncLocal({});
    },
    refreshToken: (state, action) => {
      state.data.token = action.payload;
      console.log("state.data.token::", state.data.token);
    }
  },
})


export const authReducer = authSlice.reducer
export const { addAuth, remoAuth, refreshToken } = authSlice.actions

// export const authSelector = (state: any) => state.authReducer.data

export const syncLocal = (data: any) => {
  localStorage.setItem(localDataNames.authData, JSON.stringify(data))
}