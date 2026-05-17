import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { cartContext } from "./Context/Context";
import { toast } from "react-toastify";
import { Toast } from "react-bootstrap";
import { initializeApp } from "firebase/app";
import app from "../../Config/Firebase";
import { getDatabase, ref, set } from "firebase/database";

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
      <Link
        className="text-decoration-none text-black"
        to={`${"/product/product-details/" + product.id}`}
      >
        <div class="col h-10">
          <div class="card  bg-dark d-flex">
            <div class="position-relative" style={{ height: "380px" }}>
              <img
                src={product.image}
                class="card-img-top h-100"
                style={{ objectFit: "cover" }}
                alt="TV"
              />
              <span class="position-absolute top-0 start-0 badge bg-danger m-2">
                Sale
              </span>
            </div>

            <div class="card-body">
              <h6 class="card-title custom-text text-light fst-italic">
                {product.name}
              </h6>
              {/* </Link> */}
              <p class="card-text text-light fst-italic small mb-0 ">
                {product.category_name}
              </p>
              <div class="d-flex align-items-center mb-2">
                <div class="text-warning me-1">
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star-half-alt"></i>
                </div>
                {/* <span class=" small text-light">4.5</span> */}
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <span class="fs-5 fw-bold fs-7 text-light">
                    Rs.{discount_price}
                  </span>
                  <span class="text-decoration-line-through text-muted ms-2 fs-7">
                    Rs.{product.price}
                  </span>
                </div>

                <button
                  type="button"
                  class="btn btn-primary btn-sm"
                  onClick={() => addCart(product)}
                >
                  Add To Cart
                  <i class="fa fa-shopping-cart"></i>
                  {/* <CiShoppingCart /> */}
                </button>
              </div>
            </div>
            {/* </Link> */}
          </div>
        </div>
      </Link>
    </>
  );
}
