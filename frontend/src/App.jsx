import React, { useEffect, useState } from "react";
import { Header } from "./Components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Body } from "./Pages/Body";
import RestaurantPage from "./Pages/RestaurantPage";
import More from "./Pages/More";
import View from "./Pages/View";

const App = () => {
  const [cart, setcart] = useState(0);

  return (
    <div>
      <BrowserRouter>
        <Header cart={cart} setcart={setcart} />
        <Routes>
          <Route path="/" element={<Body cart={cart} setcart={setcart} />} />
          <Route path="/restaurantlist" element={<RestaurantPage />} />
          <Route path="/more/:id" element={<More />} />
          <Route path="/view" element={<View cart={cart} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
