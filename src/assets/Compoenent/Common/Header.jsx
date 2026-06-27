import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
// import "../../Css/style.css";
import "../../Css/navbar.css";
import { cartContext } from "../Context/Context";

export default function Header() {
  var { cartItem } = useContext(cartContext);

  return (
    <>
      {/* <!-- Header --> */}
      <div className="container py-4  sticky-top">
        <nav className="navbar navbar-expand-lg glass-navbar px-4">
          <div className="container-fluid">
            {/* Logo */}
            <div>
              <a className="navbar-brand text-dark fw-bold fs-2" href="#">
                shopiee
              </a>
            </div>
            <div>
              <input
                type="text"
                className="form-control rounded-pill px-4 py-2 shadow-sm border-light"
                placeholder="Search..."
                style={{
                  outline: "none",
                  boxShadow: "none",
                  marginLeft: "30px",
                }}
              />
            </div>

            <div
              className="collapse navbar-collapse justify-content-center"
              id="navbarNav"
            >
              <ul className="navbar-nav gap-lg-3  ">
                <li className="nav-item">
                  {/* <a className="nav-link text-dark" href="#"></a> */}
                  {/* <input
                    type="text"
                    className="form-control rounded-pill px-4 py-2 shadow-sm border-light"
                    placeholder="Search..."
                    style={{ outline: "none", boxShadow: "none" }}
                  /> */}
                </li>

                <li className="nav-item d-flex gap-4">
                  <li>
                    <a className="nav-link text-dark" href="#">
                      Categories
                    </a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link text-dark" href="#">
                      Deal
                    </a>
                  </li>

                  <li className="nav-item">
                    {/* <a className="nav-link text-white" href="#">
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
                    </a> */}
                    <a className="nav-link text-dark" href="#">
                      User
                    </a>
                  </li>
                </li>

                {/* <li className="nav-item">
                  <a className="nav-link text-white" href="#">
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
                  </a>
                </li> */}

                <li className="nav-item">
                  <a className="nav-link text-white" href="#">
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
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link text-dark" href="#">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Icons */}
            <div className="d-flex gap-3">
              <i className="bi bi-github text-white fs-4"></i>
              <i className="bi bi-sun-fill text-warning fs-4"></i>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
