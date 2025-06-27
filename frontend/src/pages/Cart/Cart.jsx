import React, { useContext, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Cart = () => {
  const {
    cartItems,
    food_list,
    removeFromCart,
    getTotalCartAmount,
    url,
    applyDiscount,
  } = useContext(StoreContext);

  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const finalAmount =
    getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2 - discount;

  const applyCoupon = async () => {
    try {
      const res = await axios.post(url + "/api/coupon/validate", {
        code: couponCode,
      });

      if (res.data.success) {
        const discountValue = res.data.discount;
        applyDiscount(discountValue); // ✅ context এ set করার জন্য
        setDiscount(discountValue); // ✅ local state update

        alert(`Coupon applied! ৳${discountValue} discount`);
      } else {
        alert(res.data.message);
        setDiscount(0);
        localStorage.removeItem("appliedDiscount");
      }
    } catch (error) {
      console.error("Coupon apply error:", error);

      toast.error("Something went wrong while applying the coupon..");
      setDiscount(0);
      localStorage.removeItem("appliedDiscount");
    }
  };

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={url + "/images/" + item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">
                    X
                  </p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
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
          </div>
          <button className="btnn fourth" onClick={() => navigate("/order")}>
            PROCEED TO CHECKOUT
          </button>
        </div>

        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, enter it here</p>
            <div className="cart-promocode-input">
              <input
                type="text"
                placeholder="Promo Code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button onClick={applyCoupon}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
