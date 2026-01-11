
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   useLocation,
// } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// /* ===== PUBLIC WEBSITE ===== */
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import Hero from "./components/Hero";
// import About from "./components/About";
// import Services from "./components/Services";
// import Products from "./components/Products";
// import Contact from "./components/Contact";
// import ServiceDetail from "./pages/ServiceDetail";
// import PublicLayout from "./pages/PublicLayout";
// import Feedback from "./components/Feedback";
// import Payment from "./components/Payment";

// /* ===== ADMIN ===== */
// import AdminLogin from "./admin/AdminLogin";
// import AdminDashboard from "./admin/AdminDashboard";
// import AdminProtected from "./shere/AdminProtected";
// import AdminPanelHome from "./admin/AdminPanelHome";
// import AdminProfile from "./admin/AdminProfile";
// import AdminAbout from "./admin/AdminAbout";
// import AdminProducts from "./admin/AdminProducts";
// import AdminAddService from "./admin/AdminAddService";
// import EditProduct from "./admin/EditProduct";
// import AddProduct from "./admin/AddProducts";
// import ContactList from "./admin/ContactList";
// import AllEnquiries from "./admin/AllEnquiries";
// import AdminFeedbacks from "./admin/AllFeedbackList";
// import AdminHero from "./admin/AdminHero";

// /* ===== SUPER ADMIN ===== */
// import SuperAdminLogin from "./superadmin/SuperAdminLogin";
// import SuperAdminRegister from "./superadmin/SuperAdminRegister";
// import SuperAdminDashboard from "./superadmin/SuperAdminDashboard";
// import SuperAdminProtected from "./shere/SuperAdminProtected";
// import SuperAdminHome from "./superadmin/SuperAdminHome";
// import SuperAdminProfile from "./superadmin/SuperAdminProfile";
// import AdminList from "./superadmin/AdminList";
// import CreateAdmin from "./superadmin/CreateAdmin";
// import EditAdmin from "./superadmin/EditAdmin";
// import SuperAdminLogs from "./superadmin/SuperAdminLogs";
// import Enquiry from "./pages/Enquiry";
// import AdminPayment from "./admin/AdminPayment";
// import Home from "./pages/Home";
// import AdminNavbar from "./admin/AdminNavbar";
// import AdminFooter from "./admin/AdminFooter";
// import SuperAdminHeroEditor from "./superadmin/SuperAdminHeroEditor";
// import SuperAdminHero from "./superadmin/SuperAdminHero";
// import SuperAdminAboutEditor from "./superadmin/SuperAdminAboutEditor";
// import SuperAdminAbout from "./superadmin/SuperAdminAbout";
// import SuperAdminServicesEditor from "./superadmin/SuperAdminServicesEditor";
// import SuperAdminServices from "./superadmin/SuperAdminServices";
// import SuperAdminServiceDetail from "./superadmin/SuperAdminServiceDetail";
// import SuperAdminProducts from "./superadmin/SuperAdminProducts";
// import SuperAdminAddProduct from "./superadmin/SuperAdminAddProduct";
// import SuperAdminEditProduct from "./superadmin/SuperAdminEditProduct";
// import SuperAdminProductsPublic from "./superadmin/SuperAdminProductsPublic";
// import SuperAdminEnquiry from "./superadmin/SuperAdminEnquiry";
// import SuperAdminAllEnquiries from "./superadmin/SuperAdminAllEnquiries";


// import SuperAdminFeedbacksEditor from "./superadmin/SuperAdminFeedbacksEditor";
// import SuperAdminPublicFeedback from "./superadmin/SuperAdminPublicFeedback";
// import SuperAdminContact from "./superadmin/SuperAdminContact";
// import SuperAdminContactEditor from "./superadmin/SuperAdminContactEditor";
// import SuperAdminFooterEditor from "./superadmin/SuperAdminFooterEditor";
// import SuperAdminPublicFooter from "./superadmin/SuperAdminPublicFooter";
// import SuperAdminPublicNavbar from "./superadmin/SuperAdminPublicNavbar";
// import SuperAdminNavbarEditor from "./superadmin/SuperAdminNavbarEditor";
// import SuperAdminPublicMainLayout from "./layouts/SuperAdminPublicMainLayout";
// import SuperAdminPaymentEditor from "./superadmin/SuperAdminPaymentEditor";
// import SuperAdminPayment from "./superadmin/superAdminPayment";


// /* ================= APP CONTENT ================= */

// function AppContent() {
//   const location = useLocation();

//   const hideLayout =
//   location.pathname.includes("/adminDash") ||
//   location.pathname.includes("/adminlogin") ||
//   location.pathname.includes("/site/") && location.pathname.includes("/admin") ||
//   location.pathname.includes("/superadminDash") ||
//   location.pathname.includes("/superadminlogin") ||
//   location.pathname.includes("/superadminregister");

//   const isTenantSite = location.pathname.startsWith("/site/");

//   return (
//     <>
//       {/* {!hideLayout && <SuperAdminPublicNavbar />} */}

// {!hideLayout && (
//   isTenantSite ? <Navbar /> : <SuperAdminPublicNavbar />
// )}


//       <ToastContainer position="top-center" theme="dark" />

//      <Routes>
      

// {/* ================= MAIN PUBLIC SITE ================= */}
// <Route element={<SuperAdminPublicMainLayout />}>
//   <Route
//     path="/"
//     element={
//       <>
//         <SuperAdminHero />
//         <SuperAdminAbout />
//         <SuperAdminServices />
//         <SuperAdminProductsPublic />
//         <SuperAdminPublicFeedback />
//         <SuperAdminPayment />
//         <SuperAdminContact />
//       </>
//     }
//   />

//   <Route
//     path="/superadminservices/:id"
//     element={<SuperAdminServiceDetail />}
//   />

//   <Route
//     path="/superproducts/enquiry/:id"
//     element={<SuperAdminEnquiry />}
//   />
// </Route>


//         {/* ================= SUPER ADMIN ================= */}
//         <Route path="/superadminlogin" element={<SuperAdminLogin />} />
//         <Route path="/superadminregister" element={<SuperAdminRegister />} />

//         <Route
//           path="/superadminDash"
//           element={
//             <SuperAdminProtected>
//               <SuperAdminDashboard />
//             </SuperAdminProtected>
//           }
//         >
  
//    <Route index element={<SuperAdminHome />} />
//    {/* 🔐 Core Management */}
//   <Route path="profile" element={<SuperAdminProfile />} />
//   <Route path="alladmins" element={<AdminList />} />
//   <Route path="createadmin" element={<CreateAdmin />} />
//   <Route path="edit-admin/:id" element={<EditAdmin />} />
//   <Route path="logs" element={<SuperAdminLogs />} />

//   {/* 🎨 SuperAdmin Website Management */}
//   <Route path="superadminhero/edit" element={<SuperAdminHeroEditor />} />
//   <Route path="superadminabout" element={<SuperAdminAboutEditor />} />
//   <Route path="superadminservices" element={<SuperAdminServicesEditor />} />

//   {/* Product Routes */}
//   <Route path="superadminproducts" element={<SuperAdminProducts />} />
//   <Route path="superadminproducts/add" element={<SuperAdminAddProduct />} />
//   <Route path="superadminproducts/edit/:id" element={<SuperAdminEditProduct />} />
//   <Route path="enquiries" element={<SuperAdminAllEnquiries />} />
// <Route path="superadminfeedback" element={<SuperAdminFeedbacksEditor />} />
//  <Route path="superadmincontacts" element={<SuperAdminContactEditor />} />
// <Route path="superadminfooter" element={<SuperAdminFooterEditor />} />
// <Route path="superadminnavbar" element={<SuperAdminNavbarEditor />} />
// <Route path="superadminpayment" element={<SuperAdminPaymentEditor />} />


//         </Route>

        
//  {/* ================= ADMIN ================= */}

// {/* Main Admin */}
// <Route path="/adminlogin" element={<AdminLogin />} />
// <Route
//   path="/adminDash"
//   element={
//     <AdminProtected>
//       <AdminDashboard />
//     </AdminProtected>
//   }
// >
//   <Route index element={<AdminPanelHome />} />
//   <Route path="profile" element={<AdminProfile />} />
//   <Route path="addabout" element={<AdminAbout />} />
//   <Route path="navbar" element={<AdminNavbar />} />
//   <Route path="adminproducts" element={<AdminProducts />} />
//   <Route path="add-product" element={<AddProduct />} />
//   <Route path="edit-product/:id" element={<EditProduct />} />
//   <Route path="contactList" element={<ContactList />} />
//   <Route path="allenquiries" element={<AllEnquiries />} />
//   <Route path="allfeedback" element={<AdminFeedbacks />} />
//   <Route path="adminpayment" element={<AdminPayment />} />
//   <Route path="addservices" element={<AdminAddService />} />
//   <Route path="hero" element={<AdminHero />} />
//   <Route path="footer" element={<AdminFooter />} />
// </Route>

// {/* Tenant Admin */}
// <Route path="/site/:slug/adminlogin" element={<AdminLogin />} />
// <Route
//   path="/site/:slug/adminDash"
//   element={
//     <AdminProtected>
//       <AdminDashboard />
//     </AdminProtected>
//   }
// >
//   <Route index element={<AdminPanelHome />} />
//   <Route path="profile" element={<AdminProfile />} />
//   <Route path="addabout" element={<AdminAbout />} />
//   <Route path="navbar" element={<AdminNavbar />} />
//   <Route path="adminproducts" element={<AdminProducts />} />
//   <Route path="add-product" element={<AddProduct />} />
//   <Route path="edit-product/:id" element={<EditProduct />} />
//   <Route path="contactList" element={<ContactList />} />
//   <Route path="allenquiries" element={<AllEnquiries />} />
//   <Route path="allfeedback" element={<AdminFeedbacks />} />
//   <Route path="adminpayment" element={<AdminPayment />} />
//   <Route path="addservices" element={<AdminAddService />} />
//   <Route path="hero" element={<AdminHero />} />
//   <Route path="footer" element={<AdminFooter />} />
// </Route>



//         {/* ================= 🌍 ADMIN PUBLIC WEBSITES ================= */}
//         {/* ⚠️ MUST BE LAST */}
       
// <Route path="/site/:slug" element={<PublicLayout />}>
//   <Route index element={<Home />} />
// <Route path="enquiry/:productId" element={<Enquiry />} />
//   <Route path="services" element={<Services />} />
//   <Route path="services/:id" element={<ServiceDetail />} />
//   <Route path="contact" element={<Contact />} />
//   <Route path="contact" element={<Contact />} />
// </Route>



//            </Routes>

//       {/* {!hideLayout && <Footer />} */}
//       {!hideLayout && !isTenantSite && <Footer />}
//     </>
//   );
// }

// /* ================= ROOT ================= */

// export default function App() {
//   return (
//     <Router>
//       <AppContent />
//     </Router>
//   );
// }







import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ErrorBoundary } from "react-error-boundary";
import SuperAdminNavbarEditor from "./superadmin/SuperAdminNavbarEditor";
import SuperAdminHeroEditor from "./superadmin/SuperAdminHeroEditor";
import SuperAdminAboutEditor from "./superadmin/SuperAdminAboutEditor";
import SuperAdminServicesEditor from "./superadmin/SuperAdminServicesEditor";
import SuperAdminEditProduct from "./superadmin/SuperAdminEditProduct";
import SuperAdminAddProduct from "./superadmin/SuperAdminAddProduct";
import SuperAdminProducts from "./superadmin/SuperAdminProducts";
import SuperAdminAllEnquiries from "./superadmin/SuperAdminAllEnquiries";
import SuperAdminFeedbacksEditor from "./superadmin/SuperAdminFeedbacksEditor";
import SuperAdminContactEditor from "./superadmin/SuperAdminContactEditor";
import SuperAdminFooterEditor from "./superadmin/SuperAdminFooterEditor";
// import SuperAdminPaymentEditor from "./superadmin/SuperAdminPaymentEditor";
// import SuperAdminPayment from "./superadmin/SuperAdminPayment";


function RouteWrapper({ children }) {
  return (
    <ErrorBoundary
      fallback={
        <div className="p-10 text-center text-red-600">
          Something went wrong
        </div>
      }
    >
      <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}

/* ================= PUBLIC ================= */
const Navbar = lazy(() => import("./components/Navbar"));
const Footer = lazy(() => import("./components/Footer"));
const Home = lazy(() => import("./pages/Home"));
const Services = lazy(() => import("./components/Services"));
const Contact = lazy(() => import("./components/Contact"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const PublicLayout = lazy(() => import("./pages/PublicLayout"));
const Enquiry = lazy(() => import("./pages/Enquiry"));

/* ================= ADMIN ================= */
const AdminLogin = lazy(() => import("./admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./admin/AdminDashboard"));
const AdminProtected = lazy(() => import("./shere/AdminProtected"));
const AdminPanelHome = lazy(() => import("./admin/AdminPanelHome"));
const AdminProfile = lazy(() => import("./admin/AdminProfile"));
const AdminAbout = lazy(() => import("./admin/AdminAbout"));
const AdminProducts = lazy(() => import("./admin/AdminProducts"));
const AddProduct = lazy(() => import("./admin/AddProducts"));
const EditProduct = lazy(() => import("./admin/EditProduct"));
const ContactList = lazy(() => import("./admin/ContactList"));
const AllEnquiries = lazy(() => import("./admin/AllEnquiries"));
const AdminFeedbacks = lazy(() => import("./admin/AllFeedbackList"));
const AdminHero = lazy(() => import("./admin/AdminHero"));
const AdminNavbar = lazy(() => import("./admin/AdminNavbar"));
const AdminFooter = lazy(() => import("./admin/AdminFooter"));
const AdminPayment = lazy(() => import("./admin/AdminPayment"));
const AdminAddService = lazy(() => import("./admin/AdminAddService"));

/* ================= SUPER ADMIN ================= */
const SuperAdminLogin = lazy(() => import("./superadmin/SuperAdminLogin"));
const SuperAdminRegister = lazy(() => import("./superadmin/SuperAdminRegister"));
const SuperAdminDashboard = lazy(() => import("./superadmin/SuperAdminDashboard"));
const SuperAdminProtected = lazy(() => import("./shere/SuperAdminProtected"));
const SuperAdminHome = lazy(() => import("./superadmin/SuperAdminHome"));
const SuperAdminProfile = lazy(() => import("./superadmin/SuperAdminProfile"));
const AdminList = lazy(() => import("./superadmin/AdminList"));
const CreateAdmin = lazy(() => import("./superadmin/CreateAdmin"));
const EditAdmin = lazy(() => import("./superadmin/EditAdmin"));
const SuperAdminLogs = lazy(() => import("./superadmin/SuperAdminLogs"));

/* 🌍 SUPER ADMIN PUBLIC SITE */
const SuperAdminHero = lazy(() => import("./superadmin/SuperAdminHero"));
const SuperAdminAbout = lazy(() => import("./superadmin/SuperAdminAbout"));
const SuperAdminServices = lazy(() => import("./superadmin/SuperAdminServices"));
const SuperAdminProductsPublic = lazy(() => import("./superadmin/SuperAdminProductsPublic"));
const SuperAdminPublicFeedback = lazy(() => import("./superadmin/SuperAdminPublicFeedback"));
// const SuperAdminPayment = lazy(() => import("./superadmin/superAdminPayment"));
const SuperAdminContact = lazy(() => import("./superadmin/SuperAdminContact"));
const SuperAdminServiceDetail = lazy(() => import("./superadmin/SuperAdminServiceDetail"));
const SuperAdminEnquiry = lazy(() => import("./superadmin/SuperAdminEnquiry"));
const SuperAdminPublicNavbar = lazy(() => import("./superadmin/SuperAdminPublicNavbar"));
const SuperAdminPublicMainLayout = lazy(() => import("./layouts/SuperAdminPublicMainLayout"));


function AppContent() {
  const location = useLocation();

  const hideLayout =
    location.pathname.includes("/adminDash") ||
    location.pathname.includes("/adminlogin") ||
    location.pathname.includes("/superadminDash") ||
    location.pathname.includes("/superadminlogin") ||
    location.pathname.includes("/superadminregister");

  const isTenantSite = location.pathname.startsWith("/site/");

  return (
    <>
      {!hideLayout && (
        <RouteWrapper>
          {isTenantSite ? <Navbar /> : <SuperAdminPublicNavbar />}
        </RouteWrapper>
      )}

      <ToastContainer position="top-center" theme="dark" />

      <Routes>
        {/* ================= SUPER ADMIN PUBLIC ================= */}
        <Route element={<SuperAdminPublicMainLayout />}>
          <Route
            path="/"
            element={
              <RouteWrapper>
                <>
                  <SuperAdminHero />
                  <SuperAdminAbout />
                  <SuperAdminServices />
                  <SuperAdminProductsPublic />
                  <SuperAdminPublicFeedback />
                  {/* <SuperAdminPayment /> */}
                  <SuperAdminContact />
                </>
              </RouteWrapper>
            }
          />

          <Route
            path="/superadminservices/:id"
            element={
              <RouteWrapper>
                <SuperAdminServiceDetail />
              </RouteWrapper>
            }
          />

          <Route
            path="/superproducts/enquiry/:id"
            element={
              <RouteWrapper>
                <SuperAdminEnquiry />
              </RouteWrapper>
            }
          />
        </Route>

        <Route
          path="/superadminDash"
          element={
            <RouteWrapper>
              <SuperAdminProtected>
                <SuperAdminDashboard />
              </SuperAdminProtected>
            </RouteWrapper>
          }
        >
          <Route index element={<SuperAdminHome />} />
          <Route path="profile" element={<SuperAdminProfile />} />
          <Route path="superadminnavbar" element={<SuperAdminNavbarEditor />} />
          <Route path="superadminhero/edit" element={<SuperAdminHeroEditor />} />
          <Route path="superadminabout" element={<SuperAdminAboutEditor />} />
          <Route path="superadminservices" element={<SuperAdminServicesEditor />} />
          <Route path="superadminproducts/add" element={<SuperAdminAddProduct />} />
          <Route path="superadminproducts" element={<SuperAdminProducts />} />
          <Route path="superadminproducts/edit/:id" element={<SuperAdminEditProduct />} />
          <Route path="enquiries" element={<SuperAdminAllEnquiries />} />
          <Route path="superadminfeedback" element={<SuperAdminFeedbacksEditor />} />
          <Route path="superadmincontacts" element={<SuperAdminContactEditor />} />
          <Route path="superadminfooter" element={<SuperAdminFooterEditor />} />
          {/* <Route path="superadminpayment" element={<SuperAdminPaymentEditor />} /> */}
          <Route path="alladmins" element={<AdminList />} />
          <Route path="createadmin" element={<CreateAdmin />} />
          <Route path="edit-admin/:id" element={<EditAdmin />} />
          <Route path="logs" element={<SuperAdminLogs />} />
        </Route>

        <Route path="/superadminlogin" element={<RouteWrapper><SuperAdminLogin /></RouteWrapper>} />
        <Route path="/superadminregister" element={<RouteWrapper><SuperAdminRegister /></RouteWrapper>} />

        {/* ================= ADMIN ================= */}
        <Route path="/adminlogin" element={<RouteWrapper><AdminLogin /></RouteWrapper>} />

        <Route
          path="/adminDash"
          element={
            <RouteWrapper>
              <AdminProtected>
                <AdminDashboard />
              </AdminProtected>
            </RouteWrapper>
          }
        >
          <Route index element={<AdminPanelHome />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="addabout" element={<AdminAbout />} />
          <Route path="navbar" element={<AdminNavbar />} />
          <Route path="adminproducts" element={<AdminProducts />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="edit-product/:id" element={<EditProduct />} />
          <Route path="contactList" element={<ContactList />} />
          <Route path="allenquiries" element={<AllEnquiries />} />
          <Route path="allfeedback" element={<AdminFeedbacks />} />
          <Route path="adminpayment" element={<AdminPayment />} />
          <Route path="addservices" element={<AdminAddService />} />
          <Route path="hero" element={<AdminHero />} />
          <Route path="footer" element={<AdminFooter />} />
        </Route>

        {/* ================= TENANT PUBLIC ================= */}
        <Route path="/site/:slug" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="enquiry/:productId" element={<Enquiry />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:id" element={<ServiceDetail />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>

      {!hideLayout && !isTenantSite && (
        <RouteWrapper>
          <Footer />
        </RouteWrapper>
      )}
    </>
  );
}


export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}





