import React, { useEffect, useState } from "react";
import { Header } from "./Components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Body } from "./Pages/Body";
import RestaurantPage from "./Pages/RestaurantPage";
import More from "./Pages/More";
import View from "./Pages/View";
import Login from "./Pages/Login";
import HomePage from "./Pages/HomePage";

const App = () => {
  const [cart, setcart] = useState({});

  return (
    <div>
      <BrowserRouter>
        <Header cart={cart} setcart={setcart} />
        <Routes>
          <Route
            path="/body"
            element={<Body cart={cart} setcart={setcart} />}
          />
          <Route path="/restaurantlist" element={<RestaurantPage />} />
          <Route
            path="/more/:id"
            element={<More cart={cart} setcart={setcart} />}
          />
          <Route
            path="/view"
            element={<View cart={cart} setcart={setcart} />}
          />
          <Route path="/" element={<Login cart={cart} setcart={setcart} />} />
          <Route
            path="/home"
            element={<HomePage cart={cart} setcart={setcart} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
