import React from "react";
import Header from "./Common/Header";
import Discover from "./Discover";
import Footer from "./Common/Footer";
import ProductListing from "./ProductListing";
// import { ToastContainer } from 'react-toastify'
import ProductDetail from "./ProductDetail";

export default function Product() {
  return (
    <>
      {/* <ToastContainer /> */}

      <Discover />
      <ProductListing />
      <ProductDetail />
    </>
  );
}
