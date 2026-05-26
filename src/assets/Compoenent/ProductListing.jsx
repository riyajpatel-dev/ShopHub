import axios from "axios";
import React, { useEffect, useState } from "react";
import { Toast } from "react-bootstrap";
import { data } from "react-router-dom";
import { toast } from "react-toastify";
import "../Css/index.css";
import ProductCart from "./ProductCart";
import { LuCircleGauge } from "react-icons/lu";
import { CgLaptop } from "react-icons/cg";

export default function ProductListing() {
  var [category, setCategory] = useState([]);

  var [brand, setBrand] = useState([]);
  var [product, setProduct] = useState([]);
  var [filer, setFiler] = useState([]);
  var [filterCategorieValue, setFilterCategorieValue] = useState([]);
  let [priceForm, setPriceFrom] = useState(0);
  let [priceTo, setPriceTo] = useState(1000);

  // console.log(filterCategorieValue);
  //  axios.get('https://wscubetech.co/ecommerce-api/categories.php')
  //  .then((result)=>{
  //     console.log(result.data.data);
  //  })
  //  .catch((error)=>{

  //  })

  useEffect(() => {
    axios
      .get("https://wscubetech.co/ecommerce-api/categories.php")
      .then((result) => {
        setCategory(result.data.data);
      })
      .catch((error) => {
        toast.error("Something Went Wrong . Please try again");
      });
  }, []);

  // bellow ApI for Brand //
  useEffect(() => {
    axios
      .get("https://wscubetech.co/ecommerce-api/brands.php")
      .then((result) => {
        setBrand(result.data.data);
      })
      .catch((error) => {
        toast.error("Something Went Wrong . Please try again");
      });
  }, []);

  // below API for product List //
  useEffect(() => {
    axios
      .get("https://wscubetech.co/ecommerce-api/products.php", {
        params: {
          limit: 9,
          sorting: filer,
          categories: filterCategorieValue.toString(),
          price_to: priceTo,
          price_from: priceForm,
        },
      })
      .then((result) => {
        setProduct(result.data.data);
      })
      .catch((error) => {
        toast.error("Something Went Wrong . Please try again");
      });
  }, [filer, filterCategorieValue, priceTo, priceForm]);

  // This code for changing filters product //
  var filterProduct = (event) => {
    setFiler(event.target.value);
  };

  // oncheck categories will show on this function //
  var fileterChange = (slug) => {
    if (filterCategorieValue.includes(slug)) {
      var finalData = filterCategorieValue.filter((v) => {
        if (v != slug) {
          return v;
        }
      });
      var finalData = [...finalData];
      setFilterCategorieValue(finalData);
    } else {
      console.log(slug);
      var finalData = [...filterCategorieValue, slug];
      setFilterCategorieValue(finalData);
    }
    console.log(filterCategorieValue);
  };

  var ranger = (event) => {
    setPriceTo(event.target.value);
    console.log(priceTo);
  };

  var pricefilter = (event) => {
    setPriceFrom(event.target.value);
  };
  var priceTill = (event) => {
    setPriceTo(event.target.value);
  };
  return (
    <>
      {/* <!-- Main Container --> */}
      <div class="container py-5">
        <div class="row">
          {/* <!-- Filter Button (Mobile) --> */}
          <div class="col-12 d-lg-none mb-3">
            <button
              class="btn btn-outline-secondary w-100 d-flex justify-content-center align-items-center gap-2"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#filterSidebar"
            >
              <i class="fa fa-filter">Filter Products</i>
            </button>
          </div>

          {/* <!-- Sidebar Filters (Desktop) --> */}
          <div class="col-lg-3">
            <div class="card shadow-sm d-none d-lg-block">
              <div class="card-body">
                {/* <!-- Filters Header --> */}
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <h5 class="card-title mb-0">Filters</h5>
                  <button class="btn btn-sm btn-link text-decoration-none p-0">
                    Clear All
                  </button>
                </div>

                {/* <!-- Categories --> */}
                <div class="mb-4  category_scroll">
                  <h6 class="fw-bold mb-3">Categories</h6>
                  {/* <div class="form-check mb-2">
                    <input class="form-check-input" type="checkbox" id="category1" />
                    <label class="form-check-label" for="category1">Electronics</label>
                  </div>
                  <div class="form-check mb-2">
                    <input class="form-check-input" type="checkbox" id="category2" />
                    <label class="form-check-label" for="category2">Audio</label>
                  </div> */}
                  {category.length > 0
                    ? category.map((v, i) => {
                        return (
                          <DisplayCategory
                            key={i}
                            categories={v}
                            fileterChange={fileterChange}
                          />
                        );
                      })
                    : console.log("Something going wrong")}
                  {
                    // category.map((v, i) => {
                    //   return (
                    //     <DisplayCategory key={i} cate={v} />
                    //   )
                    // })
                    // category.map((v, i) => {
                    //   return (
                    //     <DisplayCategory key={i} cate={v} />
                    //   )
                    // })
                  }
                </div>

                {/* <!-- Brands --> */}
                <div class="mb-4  category_scroll">
                  <h6 class="fw-bold mb-3">Brands</h6>
                  {brand.length > 0
                    ? brand.map((v, i) => {
                        return (
                          <DisplayBrand
                            key={i}
                            brand={v}
                            fileterChange={fileterChange}
                          />
                        );
                      })
                    : ""}
                  {
                    // brand.map((v, i) => {
                    //   return (
                    //     <DisplayBrand key={i} brand={v} />
                    //   )
                    // })
                  }
                </div>

                {/* <!-- Price Range --> */}
                <div class="mb-3">
                  <h6 class="fw-bold mb-3">Price Range</h6>
                  <div class="d-flex justify-content-between mb-2">
                    <span>$0</span>
                    <span>$10000</span>
                  </div>
                  <input
                    type="range"
                    onChange={ranger}
                    class="form-range"
                    min="0"
                    max="100000"
                    step="1000"
                    id="priceRange"
                  />
                  <div class="row g-2 mt-2">
                    <div class="col-6">
                      <div class="input-group input-group-sm">
                        <span class="input-group-text">$</span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Min"
                          min="0"
                          onChange={pricefilter}
                        />
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="input-group input-group-sm">
                        <span class="input-group-text">$</span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Max"
                          min="0"
                          onChange={priceTill}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Main Content (Products + Sort Dropdown) --> */}
          <div class="col-lg-9">
            {/* <!-- Top bar: Products Count and Sort --> */}
            <div class="card shadow-sm mb-4 d-flex">
              <div class="card-body">
                <div class="row align-items-center">
                  <div class="col-md-6 mb-2 mb-md-0">
                    <h6 class="mb-0  align-items-center">
                      {product.length} Product are Here
                    </h6>
                    <small class="text-muted">Filtered results</small>
                  </div>
                  <div class="col-md-6">
                    <div class="d-flex align-items-center justify-content-md-end">
                      <i class="fa fa-sort text-muted me-2"></i>
                      <span class="text-nowrap me-2 d-none d-sm-inline">
                        Sort by:
                      </span>
                      <select
                        class="form-select form-select-sm w-auto"
                        onChange={filterProduct}
                      >
                        <option value="featured">Newest</option>
                        <option value="1">A-Z</option>
                        <option value="2">Z-A</option>
                        <option value="3">Price: Low to High</option>
                        <option value="4">Price: High to Low</option>
                        <option value="5">DiscountedPrice: Low to High</option>
                        <option value="6">DiscountedPrice: High to Low</option>
                        <option value="7">Rating Low to High</option>
                        <option value="8">Rating High to Low</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Product Grid --> */}
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 ">
              {product.length > 0
                ? product.map((v, i) => {
                    return (
                      <ProductCart
                        key={i}
                        product={v}
                        fileterChange={fileterChange}
                      />
                    );
                  })
                : ""}

              {/* <!-- Product 1 --> */}

              {/* <!-- Product 2 --> */}
            </div>
            {/* </div> <!-- End Product Row --> */}
          </div>
          {/* </div> <!-- End Main Column --> */}
        </div>
        {/* </div> <!-- End Row --> */}
      </div>
      {/* </div> <!-- End Container --> */}
    </>
  );
}

function DisplayCategory({ categories, fileterChange }) {
  return (
    <div class="form-check mb-2">
      <input
        class="form-check-input"
        type="checkbox"
        id={`${"cate_" + categories.id}`}
        onClick={() => fileterChange(categories.slug)}
      />
      <label class="form-check-label" for={`${"cate_" + categories.id}`}>
        {categories.name}
      </label>
    </div>
  );
}

function DisplayBrand({ brand }) {
  return (
    <div class="form-check mb-2">
      <input
        class="form-check-input"
        type="checkbox"
        id={`${"brand_" + brand.id}`}
      />
      <label class="form-check-label" for={`${"brand_" + brand.id}`}>
        {brand.name}
      </label>
    </div>
  );
}
