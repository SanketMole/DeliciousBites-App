import veg from "../assets/veg.png";
import nonveg from "../assets/nonveg.png";
import { Link } from "react-router-dom";

export const RestCard = ({
  id,
  data,
  cart,
  setcart,
  title,
  description,
  image,
  price,
}) => {
  return (
    <div className="ml-20">
      {" "}
      {/* Adjusted margin-left to move the card to the right */}
      <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96 transition-transform transform hover:scale-105 hover:shadow-xl">
        <div className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
          <img
            src={image}
            alt="card-image"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <div className="flex justify-end h-10">
            {data.vegetarian ? (
              <img src={veg} alt="vegetarian" />
            ) : (
              <img src={nonveg} alt="non-vegetarian" />
            )}
          </div>
          <h5 className="block mb-1 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            {title}:- <span className="font-bold"> &#8377; {price}</span>{" "}
          </h5>
          <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
            {description}
          </p>
        </div>
        <div className="p-3 pt-0 rounded-md ">
          <button
            onClick={() => {
              setcart((prevCart) => {
                const newCount = (prevCart[id]?.quantity || 0) - 1;
                return {
                  ...prevCart,
                  [id]: {
                    quantity: Math.max(newCount, 0),
                    description,
                    image,
                    title,
                    price,
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
                    description,
                    image,
                    title,
                    price,
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
              className="align-middle  font-sans font-bold text-center uppercase transition-all text-xs py-3 px-3  rounded-lg bg-gray-900 text-white shadow-md hover:shadow-lg mt-2 my-3"
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
