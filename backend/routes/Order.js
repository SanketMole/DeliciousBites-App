import express from "express";
import mongoose from "mongoose";
import { Order } from "../models/db.js"; // Update path as necessary
import { User } from "../models/db.js"; // Update path as necessary
import authMiddleware from "../controllers/authMiddleware.js";
import zod from "zod";

const OrderRouter = express.Router();

OrderRouter.post("/create", authMiddleware, async (req, res) => {
  try {
    const { items, totalPrice, discount, finalPrice } = req.body;
    const userId = req.UserId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const existingOrder = await Order.findOne({ userId });

    if (existingOrder) {
      existingOrder.items = [...existingOrder.items, ...items];
      existingOrder.totalPrice = totalPrice;
      existingOrder.discount = discount;
      existingOrder.finalPrice = finalPrice;

      await existingOrder.save();

      if (!user.orders.includes(existingOrder._id)) {
        user.orders.push(existingOrder._id);
        await user.save();
      }

      return res.json({
        msg: "Order updated successfully done",
        order: existingOrder,
      });
    } else {
      const newOrder = new Order({
        userId,
        items,
        totalPrice,
        discount,
        finalPrice,
      });

      await newOrder.save();

      user.orders.push(newOrder._id);
      await user.save();

      return res.json({
        msg: "Order created successfully",
        order: newOrder,
      });
    }
  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ msg: "Internal server error" });
  }
});

OrderRouter.get("/getallOrders", authMiddleware, async (req, res) => {
  try {
    const order = await Order.find({});
    console.log(order);

    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    res.json({
      order,
    });
  } catch (err) {
    console.error("Error fetching order:", err);
    res.status(500).json({ msg: "Internal server error" });
  }
});

export default OrderRouter;
[
  {
    domain: "namastedev.com",
    expirationDate: 1756846789.858563,
    hostOnly: true,
    httpOnly: true,
    name: "sessionToken",
    path: "/",
    sameSite: "no_restriction",
    secure: true,
    session: false,
    storeId: null,
    value: "c95ae050-8ca9-4355-a17a-b76aa43f153e",
  },
  {
    domain: "namastedev.com",
    expirationDate: 1725397189.858436,
    hostOnly: true,
    httpOnly: true,
    name: "token",
    path: "/",
    sameSite: "no_restriction",
    secure: true,
    session: false,
    storeId: null,
    value:
      "Bearer%20eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OGNkZmE5MmNkZTY5MzVlN2UwOWVkYyIsImlhdCI6MTcyNTMxMDc4OSwiZXhwIjoxNzI1Mzk3MTg5fQ.iPiK7aya2fPz321DUit_OK8eX4TtwBXlwIb3XhGmqZ8",
  },
];
