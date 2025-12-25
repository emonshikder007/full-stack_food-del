import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const {
    getTotalCartAmount,
    token,
    food_list,
    cartItems,
    url,
    discount,
    setDiscount,
  } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token, getTotalCartAmount, navigate]);

  useEffect(() => {
    const saved = localStorage.getItem("appliedDiscount");
    if (saved) {
      setDiscount(parseFloat(saved));
    }
  }, []);

  const deliveryFee = getTotalCartAmount() === 0 ? 0 : 2;

  const finalAmount =
    getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2 - discount;

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];

    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        orderItems.push({
          ...item,
          quantity: cartItems[item._id],
        });
      }
    });

    const orderData = {
      address: data,
      items: orderItems,
      amount: finalAmount,
    };

    try {
      const response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token },
      });

      if (response.data.success) {
        localStorage.removeItem("appliedDiscount"); //  clear used coupon
        navigate(`/verify?success=true&orderId=${response.data.orderId}`);
      } else {
        alert("Something went wrong while placing the order.");
      }
    } catch (error) {
      console.error("Order placing error:", error);
      alert("Order failed. Please try again later.");
    }
  };

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={data.firstName}
            onChange={onChangeHandler}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={data.lastName}
            onChange={onChangeHandler}
            required
          />
        </div>

        <input
          type="email"
          placeholder="Email Address"
          name="email"
          value={data.email}
          onChange={onChangeHandler}
          required
        />
        <input
          type="text"
          placeholder="Street"
          name="street"
          value={data.street}
          onChange={onChangeHandler}
          required
        />

        <div className="multi-fields">
          <input
            type="text"
            placeholder="City"
            name="city"
            value={data.city}
            onChange={onChangeHandler}
            required
          />
          <input
            type="text"
            placeholder="State"
            name="state"
            value={data.state}
            onChange={onChangeHandler}
            required
          />
        </div>

        <div className="multi-fields">
          <input
            type="number"
            placeholder="Zip Code"
            name="zipcode"
            value={data.zipcode}
            onChange={onChangeHandler}
            required
          />
          <input
            type="text"
            placeholder="Country"
            name="country"
            value={data.country}
            onChange={onChangeHandler}
            required
          />
        </div>

        <input
          type="number"
          placeholder="Phone Number"
          name="phone"
          value={data.phone}
          onChange={onChangeHandler}
          required
        />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>

          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>{`${getTotalCartAmount()} - ${discount} = ${
              getTotalCartAmount() - discount
            }`}</p>
          </div>

          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>${deliveryFee}</p>
          </div>

          {discount > 0 && (
            <>
              <hr />
              <div className="cart-total-details">
                <p>Discount</p>
                <p>${discount}</p>
              </div>
            </>
          )}

          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>${finalAmount}</b>
          </div>

          <button className="btnn fourth" type="submit">
            PLACE ORDER
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
