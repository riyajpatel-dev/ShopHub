import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import "../../Css/style.css";
import { cartContext } from "../Context/Context";

export default function Header() {
  var { cartItem } = useContext(cartContext);

  return (
    <>
      {/* <!-- Header --> */}
      <nav class="navbar navbar-expand-lg bg-white shadow-sm px-4 py-3 border border-warning border-end-0 border border-start-0 ">
        <div class="container-fluid d-flex align-items-center justify-content-between">
          <Link class="navbar-brand fw-bold text-primary" to="/">
            ShopHub
          </Link>

          <div class="w-25 h-50  border border-transparent mx-auto  ">
            <form class="d-flex flex-grow-1 " role="search">
              <CiSearch class="mx-0 mt-1" style={{ fontSize: "30px" }} />
              <input
                class="form-control  w-30 mx-auto "
                type="search"
                placeholder="Search products..."
                aria-label="Search"
              />
            </form>
          </div>

          <div class="d-flex align-items-center gap-3">
            <Link to="/product" class="text-dark text-decoration-none rc">
              Categories
            </Link>
            <div class="d-flex align-items-center gap-3 align-items-center">
              <a href="#" class="text-dark text-decoration-none">
                Deal
              </a>

              {/* Cart se start here */}
              <div className="position-relative">
                <Link to="/viewcart">
                  <CiShoppingCart size={25} />
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: "12px" }}
                  >
                    {cartItem.length}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
