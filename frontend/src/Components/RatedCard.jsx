import veg from "../assets/veg.png";
import nonveg from "../assets/nonveg.png";
import { Link } from "react-router-dom";

export const RatedCard = ({
  id,
  data,
  cart,
  setcart,
  title,
  description,
  image,
  price,
}) => {
  console.log(cart);
  return (
    <div className="m-6 ml-20">
      {" "}
      {/* Adjusted margin-left to move the card to the right */}
      <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
        <div className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
          <img
            src="https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/health/wp-content/uploads/2022/01/foods_to_eat_to_lose_weight.jpeg"
            alt="card-image"
          />
        </div>
        <div className="p-6">
          <div className="flex justify-end h-10">
            {data.vegetarian ? (
              <img src={veg} alt="veg" />
            ) : (
              <img src={nonveg} alt="non-veg" />
            )}
          </div>
          <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            {data.title}
          </h5>
          <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
            {data.description}
          </p>
        </div>
        <div className="p-4 pt-0">
          <button
            onClick={() => {
              setcart((prevCart) => {
                const newCount = (prevCart[id]?.quantity || 0) - 1;
                return {
                  ...prevCart,
                  [id]: {
                    quantity: newCount < 0 ? 0 : newCount,
                    description: description,
                    image: image,
                    title: title,
                    price: price,
                  },
                };
              });
            }}
            className="mx-4 border-2 border-black font-bold text-3xl rounded-full px-3"
          >
            -
          </button>
          <span className="px-2 font-bold text-3xl">
            {cart[id]?.quantity || 0}
          </span>
          <button
            onClick={() => {
              setcart((prevCart) => {
                return {
                  ...prevCart,
                  [id]: {
                    quantity: (prevCart[id]?.quantity || 0) + 1,
                    description: description,
                    image: image,
                    title: title,
                    price: price,
                  },
                };
              });
            }}
            className="mx-4 border-2 border-black font-bold text-3xl rounded-full px-2"
          >
            +
          </button>

          <Link to="/view">
            <button
              className="align-middle select-none font-sans font-bold text-center uppercase transition-all text-xs py-3 px-3 rounded-lg bg-gray-900 text-white shadow-md hover:shadow-lg mb-4 ml-20"
              type="button"
            >
              View Cart
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
