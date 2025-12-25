import React, { useState } from "react";
import axios from "axios";
import "./Cupon.css";

const Coupon = () => {
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const url = "https://tomato-backend-4onk.onrender.com";

  const handleAdd = async () => {
    const res = await axios.post(url + "/api/coupon/add", { code, discount });
    alert(res.data.message);
  };

  const handleExpire = async () => {
    const res = await axios.post(url + "/api/coupon/expire", { code });
    alert(res.data.message);
  };

  return (
    <div className="coupon-page">
      <div className="coupon-input-container">
        <h2>Manage Coupons</h2>
        <input
          type="text"
          placeholder="Coupon Code"
          className="coupon-code-input"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <input
          type="number"
          placeholder="Discount Amount"
          className="discount"
          value={discount}
          onChange={(e) => setDiscount(Number(e.target.value))}
        />
        <div className="coupon-btn-container">
          <button onClick={handleAdd} className="coupon-add">
            Add Coupon
          </button>
          <button onClick={handleExpire} className="expired-coupon">
            Expire Coupon
          </button>
        </div>
      </div>
    </div>
  );
};

export default Coupon;
