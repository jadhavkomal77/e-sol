import { createSlice } from "@reduxjs/toolkit";

const superAdminSlice = createSlice({
  name: "superadmin",
  initialState: {
    token: null,
    profile: null,
  },
  reducers: {
    setSuperAdmin: (state, action) => {
      state.token = action.payload.token;
      state.profile = action.payload.profile;
    },

    clearSuperAdmin: (state) => {
      state.token = null;
      state.profile = null;
    },
  },
});

export const { setSuperAdmin, clearSuperAdmin } = superAdminSlice.actions;
export default superAdminSlice.reducer;
