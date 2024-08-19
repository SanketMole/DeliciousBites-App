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
import HeaderImage from "../assets/Header.png";
import Footer from "../Components/Footer";
import "../App.css";
import { useDebounce } from "../../custom/Debounce";

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

  const debounced = useDebounce(val, 500);

  useEffect(() => {
    const veggie = foodData.filter((data) => {
      return data.vegetarian;
    });

    setStar1(veggie);
  }, [veg]);

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

  //...................................................

  useEffect(() => {
    const bre = foodData.filter((data) => {
      return data.category == "Breakfast";
    });

    setStar1(bre);
  }, [breake]);

  //..........................................................

  const navigate = useNavigate();

  function handleStar(e) {
    setoption(parseFloat(e.target.value));
  }
  //...............................................................
  useEffect(() => {
    console.log("TESTING VAL BRO");
    setTimeout(() => {
      setloading(false);
    }, 100);

    const filtered = foodData.filter((data) => {
      return (
        data.title.toLowerCase().includes(debounced.toLowerCase()) ||
        data.description.toLowerCase().includes(debounced.toLowerCase())
      );
    });
    const indianfilter = RatedFood.filter((data) => {
      return (
        data.title.toLowerCase().includes(debounced.toLowerCase()) ||
        data.description.toLowerCase().includes(debounced.toLowerCase())
      );
    });

    setfilterFood(filtered);
    settopfood(indianfilter);
  }, [debounced]);

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

  return (
    <div className="">
      <Header cart={cart} setcart={setcart} userData={userData} />
      <div className="md:mx-32 -m-16 md:my-10 md:h-full   ">
        <img
          className="md:m-16 m-20 my-32  md:w-full w-[1000px]  md:mx-4 md:h-full h-full  "
          src={HeaderImage}
        />
      </div>
      <ImageFood />
      <div className="flex flex-col items-center py-6">
        <div className="w-full max-w-3xl px-4">
          <div className="flex w-96 md:w-full mx-10 md:flex-row items-center justify-between my-4 px-4 py-3 border-4 border-blue-900 rounded-2xl bg-white shadow-lg">
            <input
              type="search"
              placeholder="Search Something..."
              className="w-full md:w-auto outline-none bg-transparent text-gray-600 text-sm px-4 py-2 rounded-md"
              onChange={(e) => {
                setVal(e.target.value);
                setloading(true);
              }}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 192.904 192.904"
              width="24px"
              className="fill-gray-600 ml-2"
            >
              <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z" />
            </svg>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6 ">
            <label className="flex items-center space-x-2 cursor-pointer ">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5  text-blue-600"
                onChange={() => setcheck(!check)}
                checked={check}
              />
              <span className="text-gray-700">Top Rated Food</span>
            </label>
            <select
              onChange={handleStar}
              className="border-2  border-gray-300 rounded-md w-full md:w-48 h-12 text-gray-700"
            >
              <option value="0">Select based on rating</option>
              <option value="4.8">Rating 4.8+</option>
              <option value="4">Rating 4+</option>
            </select>
            <button
              className="bg-blue-500 md:mx-0 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition duration-150"
              onClick={handlenavigate}
            >
              View All Restaurants
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            <button
              onClick={() => setStar1(foodData)}
              className="bg-gray-200 text-gray-700 rounded-full px-4 py-2 hover:bg-gray-300"
            >
              All
            </button>

            <button
              onClick={() => setbreake(!breake)}
              className="bg-gray-200 text-gray-700 rounded-full px-4 py-2 hover:bg-gray-300"
            >
              Breakfast
            </button>
            <button
              onClick={() => setmain(!main)}
              className="bg-gray-200 text-gray-700 rounded-full px-4 py-2 hover:bg-gray-300"
            >
              Main Course
            </button>
            <button
              onClick={() => setdessert(!desert)}
              className="bg-gray-200 text-gray-700 rounded-full px-4 py-2 hover:bg-gray-300"
            >
              Desserts
            </button>
            <button
              onClick={() => setveg(!veg)}
              className="bg-gray-200 text-gray-700 rounded-full px-4 py-2 hover:bg-gray-300"
            >
              Veg
            </button>
            <button
              onClick={() => setnonveg(!nonveg)}
              className="bg-gray-200 text-gray-700 rounded-full px-4 py-2 hover:bg-gray-300"
            >
              Non-Veg
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap  gap-5 mt-12 ">
        {noResults && (
          <div className="flex justify-center items-center w-full">
            <h2 className="text-2xl font-bold text-red-500">
              No results found
            </h2>
          </div>
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
      </div>
      <div className="w-[75vh]">
        <ExploreOptions />
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-pink-100 py-8 sm:py-16">
        <h2 className="text-2xl sm:text-4xl font-bold text-center mb-6 sm:mb-10 text-purple-900">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8 justify-center px-2 sm:px-4">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-4 sm:p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              <p className="text-gray-700 text-base sm:text-lg mb-4 sm:mb-6 italic">
                "{testimonial.comment}"
              </p>
              <p className="text-purple-600 font-semibold">
                {testimonial.name}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Call-to-Action Banner */}
      <div className="relative bg-purple-600 text-white py-8 sm:py-16 mt-8 sm:mt-16 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-75"></div>
        <div className="relative z-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold mb-4 sm:mb-6 animate-fade-in">
            Discover the Best Food Around You!
          </h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 animate-fade-in delay-1s">
            Join our community and enjoy the finest dishes.
          </p>
          <button
            className="bg-white text-purple-600 rounded-full px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg hover:bg-gray-100 shadow-2xl transition-all duration-300 animate-bounce"
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
