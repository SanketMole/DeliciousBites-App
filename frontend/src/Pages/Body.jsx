import React, { useEffect, useState } from "react";
import { RestCard } from "../Components/RestCard";
import { RatedCard } from "../Components/RatedCard";
import { RatedFood, foodData } from "../Components/Data";
import { useNavigate } from "react-router-dom";
import { Header } from "../Components/Header";
import SkeletonLoader from "../Components/SkeletonLoader";

export const Body = ({ cart, setcart }) => {
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

  const navigate = useNavigate();

  function handleStar(e) {
    setoption(parseFloat(e.target.value));
  }

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

  return (
    <div>
      <div className="flex justify-center">
        <div className="my-20  h-30 text-center ">
          <div className="flex px-4 w-96  py-3  border-4 border-blue-900 overflow-hidden  rounded-2xl font-[sans-serif]">
            <input
              type="search"
              placeholder="Search Something..."
              className="w-full outline-none bg-transparent text-gray-600 text-sm"
              onChange={(e) => {
                setVal(e.target.value);
                setloading(true);
              }}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 192.904 192.904"
              width="16px"
              className="fill-gray-600"
            >
              <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z" />
            </svg>
          </div>

          <select onChange={handleStar} className="mx-4 border-2 border-black">
            <option value="0">Select</option>
            <option value="4.8">Rating 4.8+</option>
            <option value="4">Rating 4+</option>
          </select>
          <button
            onClick={() => {
              setrate(!rate);
              setcheck(!check);
            }}
            style={{ marginLeft: "5px" }}
          >
            <input
              onChange={() => {
                setcheck(!check);
              }}
              type="checkbox"
              checked={check}
            />
            Top Rated Food
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-5">
        {noResults && (
          <div className=" text-red-500 ml-24 ml-[500px] ">
            No results found
          </div>
        )}
        {(loading
          ? Array.from({ length: star1.length || star2.length })
          : check
          ? star2
          : star1
        ).map((data, index) => (
          <div key={index}>
            {loading ? (
              <div className="  ">
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
    </div>
  );
};
