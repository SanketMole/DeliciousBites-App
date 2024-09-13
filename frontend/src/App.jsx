import React, { useEffect, useState } from "react";
import { Header } from "./Components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Body } from "./Pages/Body";
import RestaurantPage from "./Pages/RestaurantPage";
import More from "./Pages/More";
import View from "./Pages/View";
import Signin from "./Pages/Signin";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import axios from "axios";
import Thankyou from "./Pages/Thankyou";
import AllOrders from "./Pages/AllOrders";

const App = () => {
  const [cart, setcart] = useState([]);
  const [userData, setUserData] = useState({});

  console.log(cart);
  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const resp = await axios.get(
          "https://deliciousbites-app.onrender.com/api/v1/user-info",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        setUserData(resp.data);

        console.log(userData);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    }

    fetchUserInfo();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login cart={cart} setcart={setcart} />} />
          <Route
            path="/dashboard"
            element={<Body cart={cart} setcart={setcart} userData={userData} />}
          />
          <Route
            path="/restaurantlist"
            element={
              <RestaurantPage
                cart={cart}
                setcart={setcart}
                userData={userData}
              />
            }
          />
          <Route
            path="/more/:id"
            element={<More cart={cart} setcart={setcart} userData={userData} />}
          />
          <Route
            path="/view"
            element={<View cart={cart} setcart={setcart} userData={userData} />}
          />
          <Route
            path="/register"
            element={
              <Signin cart={cart} setcart={setcart} userData={userData} />
            }
          />
          <Route
            path="/home"
            element={<HomePage cart={cart} setcart={setcart} />}
          />
          <Route
            path="/login"
            element={<Login cart={cart} setcart={setcart} />}
          />
          <Route path="/thankyou/:id" element={<Thankyou />} />
          <Route path="/allorders/:id" element={<AllOrders />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
