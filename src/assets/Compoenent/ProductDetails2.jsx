// import React from "react";
import { cartContext } from "./Context/Context"; // today made
import { initializeApp } from "firebase/app"; //
import app from "../../Config/Firebase"; //
import React, { useContext } from "react";
import "../Css/ProductDetail.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
export default function ProductDetails2() {
  let [product, setProduct] = useState(""); // for product fetching
  let discount = (product.price * product.discount_percentage) / 100; // discounted price maths
  let finalPrice = product.price - discount; // final price of product
  let [currentImage, setCurentImage] = useState(""); //  Image purpose used
  let param = useParams(); //
  var { cartItem, setCartItem } = useContext(cartContext); // Use context used

  let [count, setCount] = useState(1);
  let showingDetail = (iValue) => {
    setCurentImage(iValue);
  };

  useEffect(() => {
    axios
      .get(
        "https://wscubetech.co/ecommerce-api/productdetails.php?id=" + param.id,
      )
      .then((result) => {
        setProduct(result.data.product);
        setCurentImage(result.data.product.multiple_images[0]);
      })
      .catch((error) => {
        toast.error("Something is wrong");
      });
  }, []);

  let addCart = (productInfo) => {
    {
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
    }
  };
  return (
    <>
      <div class="card-wrapper">
        <div class="card">
          {/* <!-- card left --> */}
          <div class="product-imgs">
            <div class="img-display">
              <div class="img-showcase">
                <img
                  src={currentImage || null}
                  alt="shoe image"
                  class="bg-dark"
                />
                {/* <img
                  src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_2.jpg"
                  alt="shoe image"
                />
                <img
                  src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_3.jpg"
                  alt="shoe image"
                />
                <img
                  src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_4.jpg"
                  alt="shoe image"
                /> */}
              </div>
            </div>
            {/* here small product details */}
            {product ? (
              <div class="img-select">
                {product.multiple_images.map((v, i) => {
                  return (
                    <div
                      class="img-item"
                      key={i}
                      onMouseEnter={() => showingDetail(v)}
                    >
                      <img src={v} alt="shoe image" />
                    </div>
                  );
                })}

                {/* <div class="img-item">
                  <a href="#" data-id="2">
                    <img
                      src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_2.jpg"
                      alt="shoe image"
                    />
                  </a>
                </div>
                <div class="img-item">
                  <a href="#" data-id="3">
                    <img
                      src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_3.jpg"
                      alt="shoe image"
                    />
                  </a>
                </div>
                <div class="img-item">
                  <a href="#" data-id="4">
                    <img
                      src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_4.jpg"
                      alt="shoe image"
                    />
                  </a>
                </div> */}
              </div>
            ) : (
              "  "
            )}

            {/* here small product details start */}

            {/* here small product details end */}
          </div>
          {/* <!-- card right --> */}
          <div class="product-content">
            <h2 class="product-title">{product.name}</h2>
            {/* <a href="#" class="product-link">
              visit nike store
            </a> */}
            <div class="product-rating">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star-half-alt"></i>
              <span>Rating :{product.rating}</span>
            </div>

            <div class="product-price">
              <p class="last-price">
                {/* Old Price: <span>$257.00</span> */}
                <span>Older price :{product.price}</span>
              </p>
              <p class="new-price">
                {/* New Price: <span>$249.00 (5%)</span> */}
                <span>Price: {finalPrice}</span>
              </p>
              <span>Total price {finalPrice * count}</span>
            </div>

            <div class="product-detail">
              <h2>about this item: </h2>
              <p>{product.description}</p>
              {/* <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequatur, perferendis eius. Dignissimos, labore suscipit.
                Unde.
              </p> */}
              <ul>
                <li>
                  Color: <span>Black</span>
                </li>
                <li>
                  Available: <span>in stock</span>
                </li>
                <li>
                  Category: <span>{product.category}</span>
                </li>
                <li>
                  Shipping Area: <span>All over the world</span>
                </li>
                <li>
                  Shipping Fee: <span>Free</span>
                </li>
              </ul>
            </div>

            <div class="purchase-info">
              <input
                type="number"
                min="0"
                value={count}
                class="btn"
                onChange={(e) => setCount(e.target.value)}
              />
              <button
                type="button"
                class="btn"
                onClick={() => addCart(product)}
              >
                Add to Cart <i class="fas fa-shopping-cart"></i>
              </button>
              <button type="button" class="btn">
                Compare
              </button>
            </div>

            {/* <div class="social-links">
              <p>Share At: </p>
              <a href="#">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="#">
                <i class="fab fa-whatsapp"></i>
              </a>
              <a href="#">
                <i class="fab fa-pinterest"></i>
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
