import express from "express";
import mongoose from "mongoose";
import { Order } from "../models/db.js"; // Update path as necessary
import { User } from "../models/db.js"; // Update path as necessary
import authMiddleware from "../controllers/authMiddleware.js";
import zod from "zod";

const OrderRouter = express.Router();

// Create or Update Order
// Create or Update Order
OrderRouter.post("/create", authMiddleware, async (req, res) => {
  try {
    const { items, totalPrice, discount, finalPrice } = req.body;
    const userId = req.UserId;

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Find an existing order for the user
    let existingOrder = await Order.findOne({
      userId,
      // Add criteria to find the correct existing order if needed
    });

    if (existingOrder) {
      // Update existing order
      existingOrder.items.push(...items);
      existingOrder.totalPrice = totalPrice;
      existingOrder.discount = discount;
      existingOrder.finalPrice = finalPrice;

      await existingOrder.save();

      // Update the user's orders array
      if (!user.orders.includes(existingOrder._id)) {
        user.orders.push(existingOrder._id);
        await user.save();
      }

      return res.json({
        msg: "Order updated successfully",
        order: existingOrder,
      });
    } else {
      // Create a new order
      const newOrder = new Order({
        userId,
        items,
        totalPrice,
        discount,
        finalPrice,
      });

      await newOrder.save();

      // Update the user's orders array
      user.orders.push(newOrder._id);
      await user.save();

      return res.json({ msg: "Order created successfully", order: newOrder });
    }
  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ msg: "Internal server error" });
  }
});

// Route to get an order by ID
OrderRouter.get("/:orderId", authMiddleware, async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.UserId; // Assuming the user ID is attached to the request by authMiddleware

    const order = await Order.findOne({ _id: orderId, userId });

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

// Route to update an order
const updateOrderSchema = zod.object({
  items: zod
    .array(
      zod.object({
        id: zod.string().min(1), // Assuming item IDs are strings
        title: zod.string(),
        description: zod.string(),
        price: zod.number(),
        quantity: zod.number().min(1),
        image: zod.string(),
      })
    )
    .optional(),
  totalPrice: zod.number().min(0).optional(),
  discount: zod.number().min(0).optional(),
  finalPrice: zod.number().min(0).optional(),
});

OrderRouter.put("/:orderId", authMiddleware, async (req, res) => {
  try {
    const { orderId } = req.params;
    const validation = updateOrderSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        msg: "Invalid input",
        errors: validation.error.issues,
      });
    }

    const updateData = req.body;
    const userId = req.UserId; // Assuming the user ID is attached to the request by authMiddleware

    const updatedOrder = await Order.findOneAndUpdate(
      { _id: orderId, userId },
      updateData,
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ msg: "Order not found" });
    }

    res.json({
      msg: "Order updated successfully",
      order: updatedOrder,
    });
  } catch (err) {
    console.error("Error updating order:", err);
    res.status(500).json({ msg: "Internal server error" });
  }
});

export default OrderRouter;
