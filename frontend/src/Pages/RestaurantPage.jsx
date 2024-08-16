import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { RestaurantList } from "../Components/Data";
import Restaurant from "../Components/Restaurant";
import { Header } from "../Components/Header";

// Custom arrow components
const PrevArrow = ({ onClick }) => (
  <div
    className="slick-arrow slick-prev"
    style={{ left: 0, zIndex: 1 }}
    onClick={onClick}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 text-gray-600"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 19l-7-7 7-7" />
    </svg>
  </div>
);

const NextArrow = ({ onClick }) => (
  <div
    className="slick-arrow slick-next"
    style={{ right: 0, zIndex: 1 }}
    onClick={onClick}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 text-gray-600"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 5l7 7-7 7" />
    </svg>
  </div>
);

const RestaurantPage = ({ cart, setcart, userData }) => {
  const [swiggydata, setSwiggyData] = useState([]);
  const [place, setPlace] = useState("");
  const [restaurant, setRestaurant] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setSwiggyData(RestaurantList);
    extractMenuItems(RestaurantList);
  }

  useEffect(() => {
    const filtered = swiggydata.filter((data) => {
      return (
        data.city.toLowerCase().includes(place.toLowerCase()) ||
        data.restaurant_name.toLowerCase().includes(place.toLowerCase())
      );
    });

    setRestaurant(filtered);
    setNoResults(filtered.length === 0);
  }, [place, swiggydata]);

  function extractMenuItems(data) {
    const items = data
      .flatMap((restaurant) => restaurant.menu.slice(0, 5))
      .filter(Boolean);
    setMenuItems(items);
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000, // Adjust speed as needed
    pauseOnHover: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Header cart={cart} setcart={setcart} userData={userData} />
      <div className="container mx-auto px-4 py-10">
        {/* Search Bar with Clear Button and Search Icon */}
        <div className="relative flex justify-center mt-16 mb-8">
          <input
            onChange={(e) => setPlace(e.target.value)}
            type="text"
            placeholder="Search Restaurants"
            className="bg-gray-100 rounded-md px-6 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full md:w-3/4 lg:w-1/2 xl:w-1/3"
          />

          <svg
            className="absolute left-3 top-2 w-6 h-6 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 4a7 7 0 100 14 7 7 0 000-14zM4.22 4.22a9 9 0 0112.56 0m-1.27 12.44a9 9 0 01-12.56 0"
            />
          </svg>
        </div>

        {/* No Results Message */}
        {noResults && (
          <div className="text-center text-red-500 mt-4 text-lg font-semibold">
            No results found
          </div>
        )}

        {/* Horizontal Infinite Scroller Section */}
        <div className="py-4 mb-8 px-2">
          {" "}
          {/* Added padding here */}
          <div className="relative">
            <Slider {...settings}>
              {menuItems.length > 0 ? (
                menuItems.map((item, index) => (
                  <div key={index} className="px-2">
                    <div className="bg-gray-200 rounded-lg overflow-hidden shadow-lg">
                      <img
                        src={item.image_url} // Replace with the correct field for item image
                        alt={item.name} // Replace with the correct field for item name
                        className="w-full h-40 object-cover"
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500">
                  No menu items available
                </div>
              )}
            </Slider>
          </div>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 p-3 mt-12">
          {restaurant.map((data) => (
            <Restaurant
              key={data.id}
              swiggydata={data}
              cart={cart}
              setcart={setcart}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RestaurantPage;
