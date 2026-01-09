import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./slices/adminSlice";

import { adminApi } from "./apis/adminApi";
import { contactApi } from "./apis/contactApi";
import { userApi } from "./apis/userApi";
import { feedbackApi } from "./apis/feedbackApi";
import { enquiryApi } from "./apis/enquiryApi";
import { productApi } from "./apis/productApi";
import { aboutApi } from "./apis/aboutApi";
import { servicesApi } from "./apis/servicesApi";
import { superAdminApi } from "./apis/superAdminApi";
import { activityApi } from "./apis/activityApi";
import { heroApi } from "./apis/heroApi";
import { paymentApi } from "./apis/paymentApi";
import { navbarApi } from "./apis/navbarApi";
import { footerApi } from "./apis/footerApi";

import { superAdminHeroApi } from "./apis/superAdminHeroApi";
import { superAdminAboutApi } from "./apis/superAdminAboutApi";
import { superAdminServicesApi } from "./apis/superAdminServicesApi";
import { superAdminProductApi } from "./apis/superAdminProductApi";
import { superAdminEnquiryApi } from "./apis/superAdminEnquiryApi";
import { superAdminPaymentApi } from "./apis/superAdminPaymentApi";
import { superAdminFeedbackApi } from "./apis/superAdminFeedbackApi";
import { superAdminContactApi } from "./apis/superAdminContactApi";
import { superAdminFooterApi } from "./apis/superAdminFooterApi";
import { superAdminNavbarApi } from "./apis/superAdminNavbarApi";
import { superAdminPaymentSettingsApi } from "./apis/superAdminPaymentSettingsApi";
// import { servicesApi } from "./apis/servicesApi";

const store = configureStore({
  reducer: {
    admin: adminReducer,

    [adminApi.reducerPath]: adminApi.reducer,
      [enquiryApi.reducerPath]: enquiryApi.reducer,
    [feedbackApi.reducerPath]: feedbackApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
      [contactApi.reducerPath]: contactApi.reducer,
      [productApi.reducerPath]: productApi.reducer,
      [servicesApi.reducerPath]: servicesApi.reducer,
      [superAdminApi.reducerPath]: superAdminApi.reducer,
      [activityApi.reducerPath]: activityApi.reducer,
      [aboutApi.reducerPath]: aboutApi.reducer,
        [heroApi.reducerPath]: heroApi.reducer,
        [paymentApi.reducerPath]: paymentApi.reducer,
        [navbarApi.reducerPath]: navbarApi.reducer,
        [footerApi.reducerPath]: footerApi.reducer,

         [superAdminHeroApi.reducerPath]: superAdminHeroApi.reducer,
         [superAdminAboutApi.reducerPath]: superAdminAboutApi.reducer,
         [superAdminServicesApi.reducerPath]: superAdminServicesApi.reducer,
         [superAdminProductApi.reducerPath]: superAdminProductApi.reducer,
         [superAdminEnquiryApi.reducerPath]: superAdminEnquiryApi.reducer,
         [superAdminPaymentApi.reducerPath]: superAdminPaymentApi.reducer,
         [superAdminFeedbackApi.reducerPath]: superAdminFeedbackApi.reducer,
         [superAdminContactApi.reducerPath]: superAdminContactApi.reducer,
         [superAdminFooterApi.reducerPath]: superAdminFooterApi.reducer,
         [superAdminNavbarApi.reducerPath]: superAdminNavbarApi.reducer,
         [superAdminNavbarApi.reducerPath]: superAdminNavbarApi.reducer,
         [superAdminPaymentSettingsApi.reducerPath]: superAdminPaymentSettingsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(adminApi.middleware,contactApi.middleware,
      enquiryApi.middleware,
      productApi.middleware,
      feedbackApi.middleware,
      userApi.middleware,
      servicesApi.middleware,
      superAdminApi.middleware,
      aboutApi.middleware,
      activityApi.middleware,
      heroApi.middleware,
      paymentApi.middleware,
      navbarApi.middleware,
      footerApi.middleware,

      superAdminHeroApi.middleware,
      superAdminAboutApi.middleware,
      superAdminServicesApi.middleware,
      superAdminProductApi.middleware,
      superAdminEnquiryApi.middleware,
      superAdminPaymentApi.middleware,
      superAdminFeedbackApi.middleware,
      superAdminContactApi.middleware,
      superAdminFooterApi.middleware,
      superAdminNavbarApi.middleware,
      superAdminPaymentSettingsApi.middleware,
    
    ),
});

export default store;
