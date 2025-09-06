import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./store/pages/LandingPage";
import MobilesPage from "./store/pages/MobilesPage";
import AcPage from "./store/pages/AcPage";
import BooksPage from "./store/pages/BooksPage";
import ComputersPage from "./store/pages/ComputersPage";
import FridgesPage from "./store/pages/FridgesPage";
import FurniturePage from "./store/pages/FurniturePage";
import KitchenPage from "./store/pages/KitchenPage";
import MenPage from "./store/pages/MenPage";
import SpeakersPage from "./store/pages/SpeakersPage";
import TvPage from "./store/pages/TvPage";
import WatchesPage from "./store/pages/WatchesPage";
import WomenPage from "./store/pages/WomenPage";
import ContactPage from "./store/pages/ContactPage";

import MobileSingle from "./store/pages/SinglePages/MobileSingle";
import AcSingle from "./store/pages/SinglePages/AcSingle";
import BookSingle from "./store/pages/SinglePages/BookSingle";
import ComputerSingle from "./store/pages/SinglePages/ComputerSingle";
import FridgeSingle from "./store/pages/SinglePages/FridgeSingle";
import FurnitureSingle from "./store/pages/SinglePages/FurnitureSingle";
import KitchenSingle from "./store/pages/SinglePages/KitchenSingle";
import MenSingle from "./store/pages/SinglePages/MenSingle";
import SpeakerSingle from "./store/pages/SinglePages/SpeakerSingle";
import TvSingle from "./store/pages/SinglePages/TvSingle";
import WatchSingle from "./store/pages/SinglePages/WatchSingle";
import WomenSingle from "./store/pages/SinglePages/WomenSingle";

import ShopPage from "./store/pages/Shop/ShopPage";
import CartPage from "./store/pages/CartPage/CartPage";
import Authentication from "./store/components/Authentication/Authentication";
import PrivateRoute from "./store/components/Authentication/PrivateRoute";
import AdminRoute from "./store/components/Authentication/AdminRoute";
import AdminLayout from "./store/pages/Admin/AdminLayout";
import AdminDashboard from "./store/pages/Admin/AdminDashboard";
import ProductManagement from "./store/pages/Admin/ProductManagement";
import OrderManagement from "./store/pages/Admin/OrderManagement";
import CustomerManagement from "./store/pages/Admin/CustomerManagement";
import Analytics from "./store/pages/Admin/Analytics";
import Settings from "./store/pages/Admin/Settings";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/mobiles" element={<MobilesPage />} />
        <Route path="/ac" element={<AcPage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/computers" element={<ComputersPage />} />
        <Route path="/fridge" element={<FridgesPage />} />
        <Route path="/furniture" element={<FurniturePage />} />
        <Route path="/kitchen" element={<KitchenPage />} />
        <Route path="/men's-wear" element={<MenPage />} />
        <Route path="/speakers" element={<SpeakersPage />} />
        <Route path="/tv" element={<TvPage />} />
        <Route path="/watch" element={<WatchesPage />} />
        <Route path="/women-wear" element={<WomenPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Authentication />} />
        <Route path="/register" element={<Authentication />} />
        <Route path="/authentication" element={<Authentication />} />

        {/* Private Routes */}
        <Route
          path="/shop"
          element={
            <PrivateRoute>
              <ShopPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <CartPage />
            </PrivateRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin-dashboard"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="customers" element={<CustomerManagement />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Single Product Routes */}
        <Route path="/mobiles/:id" element={<MobileSingle />} />
        <Route path="/ac/:id" element={<AcSingle />} />
        <Route path="/books/:id" element={<BookSingle />} />
        <Route path="/computers/:id" element={<ComputerSingle />} />
        <Route path="/fridge/:id" element={<FridgeSingle />} />
        <Route path="/furniture/:id" element={<FurnitureSingle />} />
        <Route path="/kitchen/:id" element={<KitchenSingle />} />
        <Route path="/men's-wear/:id" element={<MenSingle />} />
        <Route path="/speakers/:id" element={<SpeakerSingle />} />
        <Route path="/tv/:id" element={<TvSingle />} />
        <Route path="/watch/:id" element={<WatchSingle />} />
        <Route path="/women-wear/:id" element={<WomenSingle />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ fontSize: "14px", fontWeight: "500" }}
      />
    </>
  );
};

export default App;
