import React, { useContext } from "react";
import "./FoodItem.css";

import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

import { useNavigate } from "react-router-dom";

const FoodItem = ({ id, name, price, description, image }) => {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    url,
  } = useContext(StoreContext);

  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/product/${id}`);
  };

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(id);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    removeFromCart(id);
  };

  return (
    <div
      className="food-item"
      onClick={handleProductClick}
    >
      <div className="food-item-image-container">
        <img
          className="food-item-image"
          src={`${url}/images/${image}`}
          alt={name}
        />

        {!cartItems[id] ? (
          <img
            className="add"
            onClick={handleAdd}
            src={assets.add_icon_white}
            alt="Add to cart"
          />
        ) : (
          <div
            className="food-item-counter"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              onClick={handleRemove}
              src={assets.remove_icon_red}
              alt="Remove"
            />

            <p>{cartItems[id]}</p>

            <img
              onClick={handleAdd}
              src={assets.add_icon_green}
              alt="Add"
            />
          </div>
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>

          <img
            src={assets.rating_starts}
            alt="Rating"
          />
        </div>

        <p className="food-item-description">
          {description}
        </p>

        <p className="food-item-price">
          ${price}
        </p>
      </div>
    </div>
  );
};

export default FoodItem;