import React from "react";
import { Header } from "./Components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Body } from "./Components/Body";
import RestaurantPage from "./Pages/RestaurantPage";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/restaurantlist" element={<RestaurantPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
