import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./assets/Css/style.css";
import { BrowserRouter, Routes, Route } from "react-router";
import "./assets/Css/style.css";

// import Home from './assets/Compoenent/Home';
import Product from "./assets/Compoenent/Product";
import AboutUs from "./assets/Compoenent/AboutUs";
import RootLayout from "./assets/Compoenent/RootLayout";
import Home from "./assets/Compoenent/Home";
import ProductDetail from "./assets/Compoenent/ProductDetail";
import Context from "./assets/Compoenent/Context/Context";

import ViewCart from "./assets/Compoenent/ViewCart";
import ProductDetails2 from "./assets/Compoenent/ProductDetails2";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element:<Product/>,
//   },
//    {
//     path: "/contact-us",
//     element:<ContactUs/>,
//   },
// ]);

createRoot(document.getElementById("root")).render(
  <Context>
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route
            path="product/product-details/:id"
            element={<ProductDetail />}
          />
          {/* <Route path="/product/productDetail" element={<ProductDetails2 />} /> */}
          <Route path="/viewcart" element={<ViewCart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Context>,
);
