import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Placing user order for frontend (without Stripe)
const placeOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      orderTime: new Date(),
    });

    await newOrder.save();

    // Clear cart after placing order
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    res.json({
      success: true,
      message: "Order placed successfully",
      orderId: newOrder._id,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error placing order",
    });
  }
};

// verify orders

const verifyOrder = async (req, res) => {
  const { orderId } = req.body;

  try {
    const updatedOrder = await orderModel.findByIdAndUpdate(orderId, {
      payment: true,
    });

    if (!updatedOrder) {
      return res.json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      message: "Order confirmed successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error while verifying order",
    });
  }
};

// User Orders For Frontend

const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error",
    });
  }
};

// Listing Orders For Admin Panel
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error",
    });
  }
};

// Api For Updating Order Status

const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({
      success: true,
      message: "Status Updated",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      messasge: "Error"
    });
  }
};

// cancel Order
const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    await orderModel.findByIdAndDelete(orderId);

    res.json({ success: true, message: "Order cancelled successfully" });
  } catch (err) {
    console.error("Cancel order error:", err);
    res.status(500).json({ success: false, message: "Failed to cancel order" });
  }
};

export {
  placeOrder,
  verifyOrder,
  userOrders,
  listOrders,
  updateStatus,
  cancelOrder,
};
