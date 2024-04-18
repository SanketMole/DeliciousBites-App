import { useEffect, useState } from "react";
import { RestCard } from "../Components/RestCard";
import { RatedCard } from "../Components/RatedCard";
import { RatedFood, foodData } from "../Components/Data";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  function handleStar(e) {
    setoption(parseFloat(e.target.value));
  }

  useEffect(() => {
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

    settopfood(indianfilter);
    setfilterFood(filtered);
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
        <div className="my-28  h-30">
          <button
            onClick={handlenavigate}
            className="border-2 border-black mx-2 rounded-md p-2 bg-sky-300 "
          >
            Top Restaurants
          </button>
          Search bar
          <input
            className="border-2 border-black rounded-2xl mx-6 px-2 w-96 h-10"
            type="text"
            onChange={(e) => {
              setVal(e.target.value);
            }}
          />
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

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "5px",
        }}
      >
        {noResults && (
          <div className="text-center text-red-500 mt-2">No results found</div>
        )}
        {check
          ? star2.map((data) => (
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
            ))
          : star1.map((data) => (
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
            ))}
      </div>
    </div>
  );
};
