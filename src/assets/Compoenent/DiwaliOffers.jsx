import React from "react";
import image1 from "../Image/Offer1.jpg";
import image2 from "../Image/Offer2.jpg";
import image3 from "../Image/Offer3.jpg";
import image4 from "../Image/Offer4.jpg";

export default function DiwaliOffers() {
  return (
    <>
      <div className="container mt-4">
        {/* ul ko d-flex aur flex-column diya hai taki vertical rahe */}
        <ul className="list-unstyled d-flex" style={{ gap: "3px" }}>
          <li
            className="d-flex border shadow-sm p-3 rounded bg-white w-25  "
            style={{ height: "180px" }}
          >
            <img
              src={image1}
              className="img-fluid rounded-top  w-100 h-100"
              alt=""
              style={{
                objectFit: "cover",
              }}
            />
          </li>

          <li
            className="d-flex border shadow-sm p-3 rounded bg-white w-25  "
            style={{ height: "180px" }}
          >
            <img
              src={image2}
              className="img-fluid rounded-top  w-100 h-100"
              alt=""
              style={{
                objectFit: "cover",
              }}
            />
          </li>

          <li
            className="d-flex border shadow-sm p-3 rounded bg-white w-25  "
            style={{ height: "180px" }}
          >
            <img
              src={image3}
              className="img-fluid rounded-top  w-100 h-100"
              alt=""
              style={{
                objectFit: "cover",
              }}
            />
          </li>

          <li
            className="d-flex border shadow-sm p-3 rounded bg-white w-25  "
            style={{ height: "180px" }}
          >
            <img
              src={image4}
              className="img-fluid rounded-top  w-100 h-100"
              alt=""
              style={{
                objectFit: "cover",
              }}
            />
          </li>
        </ul>
      </div>
    </>
  );
}
