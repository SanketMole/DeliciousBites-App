// src/App.js

import React from "react";
import bike from "../assets/bi.png";

const images = [
  {
    src: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029856/PC_Creative%20refresh/3D_bau/banners_new/Pizza.png",
    alt: "Pizza",
  },
  {
    src: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1675667625/PC_Creative%20refresh/Biryani_2.png",
    alt: "Biryani",
  },
  {
    src: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1675667625/PC_Creative%20refresh/North_Indian_4.png",
    alt: "North Indian",
  },
  {
    src: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029845/PC_Creative%20refresh/3D_bau/banners_new/Burger.png",
    alt: "Burger",
  },
  {
    src: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029848/PC_Creative%20refresh/3D_bau/banners_new/Chinese.png",
    alt: "Chinese",
  },
  {
    src: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029853/PC_Creative%20refresh/3D_bau/banners_new/Paratha.png",
    alt: "Paratha",
  },
  {
    src: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029858/PC_Creative%20refresh/3D_bau/banners_new/Rolls.png",
    alt: "Rolls",
  },
];

function ImageFood() {
  return (
    <div className="container -my-20 px-16 py-4">
      <h1 className="text-3xl font-bold  ">What's on your mind?</h1>

      {/* https://raw.githubusercontent.com/Mridul2820/css-projects/master/Transitions/css-animation-creative-examples/driving-car-and-bike-using-css-animation/motobike.png */}
      <img src={bike} alt="motorbike" className="h-28 mt-4 w-28 animate-bike" />

      <div className="grid grid-cols-2 sm:grid-cols-7 gap-4">
        {images.map((image, index) => (
          <div
            id="#food"
            key={index}
            className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="h-36 w-32 object-contain mb-2"
              style={{ backgroundColor: "transparent" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageFood;
