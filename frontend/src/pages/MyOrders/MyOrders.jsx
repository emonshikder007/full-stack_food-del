import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const { url, token } = useContext(StoreContext);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        url + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      const res = await axios.post(
        url + "/api/order/cancel",
        { orderId },
        { headers: { token } }
      );
      if (res.data.success) {
        toast.success("Order cancelled successfully");
        setOrders((prev) => prev.filter((order) => order._id !== orderId));
      } else {
        toast.error("Failed to cancel order");
      }
    } catch (err) {
      toast.error("Error cancelling order");
      console.error("Cancel order error:", err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <>
      <ToastContainer />
      <div className="my-orders">
        <h2>My Orders:</h2>
        <div className="container">
          {orders.length === 0 ? (
            <h1 className="no-order">No orders found.</h1>
          ) : (
            orders.map((order, index) => (
              <div className="my-orders-order" key={order._id}>
                <div className="order-img-wrapper">
                  <img src={assets.parcel_icon} alt="Order" />
                </div>
                <p>
                  {order.items
                    .map((item) => `${item.name} x ${item.quantity}`)
                    .join(", ")}
                </p>
                <p>৳{order.amount}.00</p>
                <p>Items: {order.items.length}</p>
                <p>
                  <span>&#x25cf;</span> <b>{order.status}</b>
                </p>
                <div className="btn-container">
                  <button className="button nx" onClick={fetchOrders}>
                    Track Order
                  </button>
                  <button
                    className="button nx jx"
                    onClick={() => cancelOrder(order._id)}
                  >
                    Cancel Order
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default MyOrders;
