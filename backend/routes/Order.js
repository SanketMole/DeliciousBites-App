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
      // Update the existing order
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
        msg: "Order updated successfully",
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
