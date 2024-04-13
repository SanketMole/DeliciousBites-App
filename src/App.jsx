import React, { useEffect, useState } from "react";
import { Header } from "./Components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Body } from "./Components/Body";
import RestaurantPage from "./Pages/RestaurantPage";

const App = () => {
  const [cart, setcart] = useState(0);

  return (
    <div>
      <BrowserRouter>
        <Header cart={cart} setcart={setcart} />
        <Routes>
          <Route path="/" element={<Body cart={cart} setcart={setcart} />} />
          <Route path="/restaurantlist" element={<RestaurantPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
