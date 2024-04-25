import { Link, useLocation } from "react-router-dom";
import car from "../assets/cart.png";
import dman from "../assets/dman.avif";

export const Header = ({ cart }) => {
  const location = useLocation();
  const totalItemsInCart = Object.values(cart).reduce(
    (acc, curr) => acc + curr.quantity,
    0
  );

  const isLoginPage = location.pathname === "/login";

  return (
    <header className="fixed inset-x-0 top-0 z-30 mx-auto w-full h-18 max-w-screen-md border border-gray-100 bg-white/80 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
      <div className="px-2">
        <div className="flex items-center justify-between">
          <div className="flex shrink-0">
            <a aria-current="page" className="flex items-center">
              <img
                src={dman}
                alt="Boy riding a bike"
                className="h-16 w-22 mix-blend-multiply mr-3 -mx-2 sm:rounded-l-3xl"
              />
            </a>
          </div>
          <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
            <Link to="/">
              <a
                aria-current="page"
                className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                href="/"
              >
                Home
              </a>
            </Link>
            <Link to="/restaurantlist">
              <a
                className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                href="/"
              >
                Restaurants
              </a>
            </Link>
            <Link to="/restaurantlist">
              <a
                className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                href="/"
              >
                About
              </a>
            </Link>
            <Link to="/restaurantlist">
              <a
                className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                href="/"
              >
                Contact
              </a>
            </Link>
          </div>
          <div className="flex items-center justify-end gap-3">
            <a
              className="hidden items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex"
              href=""
            >
              Sign in
            </a>
            <a
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              href=""
            >
              Login
            </a>
            {!isLoginPage && ( // Hide this block on /login page
              <div className="flex items-center">
                <Link to="/view">
                  <img className="h-10" src={car} alt="Cart icon" />
                </Link>
                <p className="ml-2 font-bold">{totalItemsInCart}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
