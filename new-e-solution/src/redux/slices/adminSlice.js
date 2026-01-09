import { createSlice } from "@reduxjs/toolkit";
import { adminApi } from "../apis/adminApi.js";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admin: JSON.parse(localStorage.getItem("admin")) || null,
  },

  reducers: {
    logoutAdmin: (state) => {
      state.admin = null;
      localStorage.removeItem("admin");
    },
  },

  extraReducers: (builder) => {
    builder
      /* LOGIN */
.addMatcher(
  adminApi.endpoints.adminLogin.matchFulfilled,
  (state, { payload }) => {
    state.admin = payload.admin;

    localStorage.setItem("admin", JSON.stringify(payload.admin));

    // ✅ SAFE GUARD
    if (payload.token) {
      localStorage.setItem("adminToken", payload.token);
    }
  }
)


      /* LOGOUT */
      .addMatcher(adminApi.endpoints.adminLogout.matchFulfilled, (state) => {
        state.admin = null;
        localStorage.removeItem("admin");
      });
  },
});

export const { logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
