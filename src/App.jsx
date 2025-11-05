import React, { useEffect, lazy, Suspense } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { CircularProgress } from "@mui/material";
import Cart from "./components/cart/Cart";

const Signin = lazy(() => import("./components/Signin"));
const DashBoard = lazy(() => import("./components/Dashboard/Dashboard"));
const BookList = lazy(() => import("./components/Book/BookList"));
const BookStore = lazy(() => import("./components/BookStore/BookStore"));

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const location = useLocation();
  const { isCartOpen } = useSelector((state) => state.common);

  useEffect(() => {
    if (location.pathname == "/bookList") {
      document.body.style.overflow = "hidden !important";
    }
  }, [location.pathname]);

  return (
    <>
      {location.pathname !== "/auth" && <Navbar />}
      <AnimatePresence>{isCartOpen && <Cart />}</AnimatePresence>

      <Suspense
        fallback={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "80vh",
            }}
          >
            <CircularProgress size={40} />
          </div>
        }
      >
        <Routes>
          <Route path="/auth" element={<Signin />} />
          <Route
            exact
            path="/"
            element={isLoggedIn ? <DashBoard /> : <Navigate to="/auth" />}
          />
          <Route
            path="/bookList"
            element={isLoggedIn ? <BookList /> : <Navigate to="/auth" />}
          />
          <Route
            path="/bookStore"
            element={isLoggedIn ? <BookStore /> : <Navigate to="/auth" />}
          />
          <Route
            path="/bookStore/:id"
            element={isLoggedIn ? <BookStore /> : <Navigate to="/auth" />}
          />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
