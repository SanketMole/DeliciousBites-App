import React, { useEffect, useState } from "react";
import { RestCard } from "../Components/RestCard";
import { RatedCard } from "../Components/RatedCard";
import { RatedFood, RestaurantList, foodData } from "../Components/Data";
import { useNavigate } from "react-router-dom";

import SkeletonLoader from "../Components/SkeletonLoader";
import HomePage from "./HomePage";
import TopSearch from "../Components/TopSearch";
import ExploreOptions from "../Components/ExploreOptions";
import { Header } from "../Components/Header";
import ImageFood from "../Components/ImageFood";

import Footer from "../Components/Footer";
import "../App.css";
export const Body = ({ cart, setcart, userData }) => {
  const [val, setVal] = useState("");
  const [filterFood, setfilterFood] = useState([]);
  const [topfood, settopfood] = useState([]);
  const [star1, setStar1] = useState([]);
  const [star2, setStar2] = useState([]);
  const [rate, setrate] = useState(true);
  const [check, setcheck] = useState(false);
  const [option, setoption] = useState(0);
  const [noResults, setNoResults] = useState(true);
  const [loading, setloading] = useState(true);

  const [veg, setveg] = useState(false);
  const [nonveg, setnonveg] = useState(false);
  const [desert, setdessert] = useState(false);
  const [main, setmain] = useState(false);
  const [breake, setbreake] = useState(false);

  //...........................................
  useEffect(() => {
    const veggie = foodData.filter((data) => {
      return data.vegetarian;
    });

    setStar1(veggie);
  }, [veg]);
  console.log(veg);

  useEffect(() => {
    const nonveggie = foodData.filter((data) => {
      return !data.vegetarian;
    });
    setStar1(nonveggie);
  }, [nonveg]);

  //................................................

  useEffect(() => {
    const dese = foodData.filter((data) => {
      return data.category == "Dessert";
    });
    setStar1(dese);
  }, [desert]);

  //................................................

  useEffect(() => {
    const maine = foodData.filter((data) => {
      return data.category == "Main Course";
    });

    setStar1(maine);
  }, [main]);

  //..................................................

  useEffect(() => {
    const bre = foodData.filter((data) => {
      return data.category == "Breakfast";
    });

    setStar1(bre);
  }, [breake]);

  //.................................................

  const navigate = useNavigate();

  function handleStar(e) {
    setoption(parseFloat(e.target.value));
  }
  //...............................................................
  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 500);

    const filtered = foodData.filter((data) => {
      return (
        data.title.toLowerCase().includes(val.toLowerCase()) ||
        data.description.toLowerCase().includes(val.toLowerCase())
      );
    });
    const indianfilter = RatedFood.filter((data) => {
      return (
        data.title.toLowerCase().includes(val.toLowerCase()) ||
        data.description.toLowerCase().includes(val.toLowerCase())
      );
    });

    setfilterFood(filtered);
    settopfood(indianfilter);
  }, [val]);

  //................................................................
  useEffect(() => {
    const stard = filterFood.filter((data) => {
      return data.rating >= parseFloat(option);
    });
    const stardd = topfood.filter((data) => {
      return data.rating >= parseFloat(option);
    });

    setStar1(stard);
    setStar2(stardd);

    if (stard.length > 0 || stardd.length > 0) {
      setNoResults(false);
    } else {
      setNoResults(true);
    }
  }, [option, filterFood, topfood]);

  function handlenavigate() {
    navigate(`/restaurantlist`);
  }
  //..........................................................................
  const featuredDishes = [
    {
      title: "Pizza Margherita",
      imageUrl:
        "https://img.freepik.com/premium-photo/food-background-pasta-chicken-pumpkin-salad-meat-mushrooms-vegetables-black-stone-background-top-view-free-space-text_187166-31381.jpg",
      description:
        "Classic Pizza Margherita with fresh tomatoes and mozzarella.",
    },
    {
      title: "Sushi Platter",
      imageUrl:
        "https://img.freepik.com/premium-photo/food-background-pasta-chicken-pumpkin-salad-meat-mushrooms-vegetables-black-stone-background-top-view-free-space-text_187166-31381.jpg",
      description: "Assorted sushi platter with fresh sashimi and rolls.",
    },
    {
      title: "Cheeseburger",
      imageUrl:
        "https://img.freepik.com/free-photo/top-view-fried-potatoes-with-seasonings-bread-loafs-different-vegetables-dark-desk_140725-115312.jpg?t=st=1717936474~exp=1717940074~hmac=1ec1fce0114f5db99e86e961658f01ac1f651e2e550caa11e9faaa02c526331d&w=996",
      description: "Juicy cheeseburger with a side of fries.",
    },
  ];

  const testimonials = [
    { name: "John Doe", comment: "Great food and excellent service!" },
    { name: "Jane Smith", comment: "Loved the ambiance and the dishes." },
    { name: "Alice Johnson", comment: "A delightful dining experience." },
  ];

  console.log(userData);

  return (
    <div className="bg-gray-100">
      <Header cart={cart} setcart={setcart} userData={userData} />

      <div
        className="my-28 w-full h-[300px] sm:h-[550px] bg-cover bg-center"
        style={{
          backgroundImage: `url('https://img.freepik.com/premium-photo/top-view-scene-thanksgiving-celebration-traditional-dinner-setting-food-conceptthanksgiving-dinner_217051-5021.jpg?w=1380')`,
        }}
      ></div>

      <ImageFood />
      <div className="flex justify-center my-14 ">
        <div className="text-center my-8 w-full max-w-3xl">
          <div className="flex my-14 mx-4 px-2 h-16  py-3 border-4 border-blue-900 rounded-2xl font-sans bg-white shadow-lg input-container">
            <input
              type="search"
              placeholder="Search Something..."
              className="w-full outline-none bg-transparent text-gray-600 text-sm px-4"
              onChange={(e) => {
                setVal(e.target.value);
                setloading(true);
              }}
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 192.904 192.904"
              width="24px"
              className="fill-gray-600"
            >
              <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z" />
            </svg>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center space-x-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600"
                onChange={() => setcheck(!check)}
                checked={check}
              />

              <span className="text-gray-700">Top Rated Food</span>
            </label>
            <select
              onChange={handleStar}
              className="border-2 border-black rounded-md w-48 h-12 sm:h-10 text-gray-700"
            >
              <option value="0">Select based on rating</option>
              <option value="4.8">Rating 4.8+</option>
              <option value="4">Rating 4+</option>
            </select>
            <button
              className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
              onClick={handlenavigate}
            >
              View All Restaurants
            </button>
          </div>
          <div className="">
            <div>
              <div className="mt-4 flex flex-wrap justify-center space-x-2 sm:space-x-4">
                <button
                  onClick={() => {
                    setStar1(foodData);
                  }}
                  className="bg-gray-200 text-gray-700 rounded-full px-4 py-2 hover:bg-gray-300"
                >
                  All
                </button>

                <button
                  onClick={() => {
                    setbreake(!breake);
                  }}
                  className="bg-gray-200 text-gray-700 rounded-full px-4 py-2 hover:bg-gray-300"
                >
                  BreakFast
                </button>
                <button
                  onClick={() => {
                    setmain(!main);
                  }}
                  className="bg-gray-200 text-gray-700 rounded-full px-4 py-2 hover:bg-gray-300"
                >
                  Main course
                </button>
                <button
                  onClick={() => {
                    setdessert(!desert);
                  }}
                  className="bg-gray-200 text-gray-700 rounded-full px-4 py-2 hover:bg-gray-300"
                >
                  Desserts
                </button>
                <button
                  onClick={() => {
                    setveg(!veg);
                  }}
                  className="bg-gray-200 text-gray-700 rounded-full px-4 py-2 hover:bg-gray-300"
                >
                  Veg
                </button>
                <button
                  onClick={() => {
                    setnonveg(!nonveg);
                  }}
                  className="bg-gray-200 text-gray-700 rounded-full px-4 py-2 hover:bg-gray-300"
                >
                  Non-Veg
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap  gap-5 mt-12 ">
        {noResults && (
          <div className="text-red-500 justify-center">No results found</div>
        )}

        {(loading
          ? Array.from({ length: star1.length || star2.length })
          : check
          ? star2
          : star1
        ).map((data, index) => (
          <div key={index} loading="lazy">
            {loading ? (
              <div className="mx-6">
                <SkeletonLoader />
              </div>
            ) : check ? (
              <RatedCard
                cart={cart}
                id={data.id}
                setcart={setcart}
                data={data}
                key={data.id}
                title={data.title}
                description={data.description}
                image={data.imageUrl}
                price={data.price}
              />
            ) : (
              <RestCard
                cart={cart}
                id={data.id}
                setcart={setcart}
                key={data.id}
                data={data}
                title={data.title}
                description={data.description}
                image={data.src}
                price={data.price}
              />
            )}
          </div>
        ))}
        {RestaurantList.map((restaurant) => {
          if (restaurant.menu && restaurant.menu.length > 0) {
            const data = restaurant.menu[0];
            return (
              <RestCard
                cart={cart}
                id={data.id}
                setcart={setcart}
                key={data.id}
                data={data}
                title={data.name}
                description={data.description}
                image={data.image_url}
                price={data.price}
              />
            );
          }
          return null;
        })}
      </div>

      <ExploreOptions />

      <div className="bg-gradient-to-r from-blue-50 to-blue-100 py-16">
        <h2 className="text-4xl font-bold text-center mb-10 text-blue-900">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center px-4">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              <p className="text-gray-700 text-lg mb-6 italic">
                "{testimonial.comment}"
              </p>
              <p className="text-blue-600 font-semibold">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call-to-Action Banner */}
      <div className="relative bg-blue-600 text-white py-16 mt-16 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 opacity-75"></div>
        <div className="relative z-10">
          <h2 className="text-5xl font-extrabold mb-6">
            Discover the Best Food Around You!
          </h2>
          <p className="text-xl mb-8">
            Join our community and enjoy the finest dishes.
          </p>
          <button
            className="bg-white text-blue-600 rounded-full px-8 py-4 text-lg hover:bg-gray-100 shadow-2xl transition-all duration-300"
            onClick={handlenavigate}
          >
            Explore Restaurants
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};
7;
