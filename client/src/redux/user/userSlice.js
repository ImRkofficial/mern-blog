import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
      state.loading = false;
    },
    signInFail: (state, action) => {
      state.currentUser = null;
      state.error = action.payload;
      state.loading = false;
    },
    updateStart: (state) => {
      (state.loading = true), (state.error = null);
    },
    updateSuccess: (state, action) => {
      (state.loading = false),
        (state.currentUser = action.payload),
        (state.error = null);
    },
    updateFail: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
  },
});

// User actions
export const {
  signInFail,
  signInStart,
  signInSuccess,
  updateFail,
  updateStart,
  updateSuccess,
} = userSlice.actions;

// User reducer "We are gonna import it as userReducer"
export default userSlice.reducer;