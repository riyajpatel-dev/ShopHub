import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { cartContext } from "./Context/Context";
import { toast } from "react-toastify";
import { Toast } from "react-bootstrap";
import { initializeApp } from "firebase/app";
import app from "../../Config/Firebase";
import { getDatabase, ref, set } from "firebase/database";
import "../Css/index.css";

export default function ProductCart({ product }) {
  var { cartItem, setCartItem } = useContext(cartContext);
  var discount_price = (product.price * product.discount_percentage) / 100;
  var discount_price = product.price - discount_price;

  var addCart = (productInfo) => {
    var checkId = cartItem.filter((v) => {
      if (productInfo.id == v.id) {
        return v;
      }
    });

    if (checkId.length > 0) {
      var finalData = cartItem.map((v) => {
        if (productInfo.id == v.id) {
          v.quantity++;
          return v;
        } else {
          return v;
        }
      });
    } else {
      var info = {
        id: productInfo.id,
        name: productInfo.name,
        price: productInfo.price,
        quantity: productInfo.quantity,
        image: productInfo.image,
      };

      var finalData = [...cartItem, info];
      setCartItem(finalData);
      localStorage.setItem("cartItem", JSON.stringify(finalData));

      const db = getDatabase(app);
      set(ref(db, "users_cart/" + userId), info);
    }
  };

  return (
    <>
      {/*  This productCart component export To ProductListing Component Line Number 277 */}

      <div className="col mb-3 " style={{ height: "350px" }}>
        <div className="card bg-dark d-flex h-100 card border-0 shadow-lg p-3 mb-5 bg-body rounded">
          {/* Height 380px se kam karke 220px kar di gayi hai */}
          <Link
            className="text-decoration-none text-black"
            to={`/product/product-details/${product.id}`}
          >
            <div
              className="position-relative"
              style={{ height: "200px", margin: "15px" }}
            >
              <img
                src={product.image}
                className="card-img-top w-100 h-100"
                style={{ objectFit: "cover" }}
                alt={product.name || "Product"}
              />
              <span className="position-absolute top-0 start-0 badge bg-danger m-2">
                Sale
              </span>
            </div>
            <div>
              <h6 className="card-title text-dark fst-italic text-truncate mb-1">
                {product.name}
              </h6>
              <p className="card-text text-dark text-opacity-75 fst-italic small mb-2">
                {product.category_name}
              </p>
              <span
                className="fw-bold text-dark"
                style={{ fontSize: "1.05rem" }}
              >
                Rs.{discount_price}
              </span>
              <span
                className="text-decoration-line-through text-muted small"
                style={{
                  fontSize: "0.8rem",
                  marginTop: "-3px",
                  marginLeft: "5px",
                }}
              >
                Rs.{product.price}
              </span>
              <div
                className=""
                style={{ marginLeft: "65px", marginBottom: "20px" }}
              >
                <button
                  className="magical-btn d-flex align-items-center gap-2"
                  onClick={(e) => {
                    e.preventDefault(); // Prevents Link navigation
                    e.stopPropagation(); // Prevents event bubbling
                    addCart(product);
                  }}
                >
                  <span>Buy Now</span>
                  <i className="fa fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </Link>

          {/* Card Body - Padding thodi kam ki hai taki compact lage */}
          <div className="card-body p-3 d-flex flex-column">
            {/* Title aur Category */}

            {/* Stars - mt-auto se hamesha bottom ki taraf push rahenge */}

            {/* Price & Button */}
            <div className="d-flex justify-content-between align-items-center mt-1">
              <div className="d-flex flex-column"></div>

              {/* <button
                  type="button"
                  className="btn btn-primary btn-sm d-flex align-items-center gap-2"
                  onClick={(e) => {
                    e.preventDefault(); // Prevents Link navigation
                    e.stopPropagation(); // Prevents event bubbling
                    addCart(product);
                  }}
                >
                  Add <i className="fa fa-shopping-cart"></i>
                </button> */}
              {/*  */}
              <div className="d-flex justify-content-center mt-5"></div>
              {/*  */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
