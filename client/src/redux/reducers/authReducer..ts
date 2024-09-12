

import { createSlice } from '@reduxjs/toolkit'
import { localDataNames } from '../../constants/appInfos';

const initialState = {
  data: {}
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

  },
})


export const authReducer = authSlice.reducer
export const { addAuth, remoAuth } = authSlice.actions

// export const authSelector = (state: any) => state.authReducer.data

export const syncLocal = (data: any) => {
  localStorage.setItem(localDataNames.authData, JSON.stringify(data))
}