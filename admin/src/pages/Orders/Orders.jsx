import React, { useEffect, useState } from "react";
import "./Orders.css";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../assets/assets.js";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Failed to fetch orders.");
      }
    } catch (error) {
      toast.error("Something went wrong while fetching orders.");
      console.error(error);
    }
  };

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: event.target.value,
    });
    if (response.data.success) {
      await fetchAllOrders();
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleString("en-US", options);
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h2>Order Page</h2>
      <div className="order-list">
        {orders.map((order, index) => (
          <div className="order-item" key={index}>
            <img src={assets.parcel_icon} alt="Parcel Icon" />

            <div className="order-info">
              <p className="order-item-food">
                {order.items
                  .map((item) => `${item.name} x ${item.quantity}`)
                  .join(", ")}
              </p>

              <p className="order-item-name">
                {` Name: ${order.address.firstName} ${order.address.lastName}`}
              </p>

              <div className="order-item-address">
                <p>{`Street: ${order.address.street}`}</p>
                <div className="nx">
                  <p>{`City: ${order.address.city}`}</p>
                  <p>{`State: ${order.address.state}`}</p>
                  <p>{`Country: ${order.address.country}`}</p>
                  <p>{`Zip Code: ${order.address.zipcode}`}</p>
                </div>
              </div>

              <p className="order-item-phone">{`Phone: ${order.address.phone}`}</p>

              {/* ✅ Order Time Show Here */}
              <p className="order-item-time">
                <strong>Order Time:</strong> {formatDate(order.orderTime)}
              </p>
            </div>

            <p className="order-item-count">{`Items: ${order.items.length}`}</p>
            <p className="order-item-amount">{`৳ ${order.amount}`}</p>

            <select
              className="order-item-select"
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
