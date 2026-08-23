import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import "./ProductDetails.css";

import { StoreContext } from "../../context/StoreContext";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    url,
    cartItems,
    addToCart,
    removeFromCart,
    food_list,
  } = useContext(StoreContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await axios.get(`${url}/api/food/${id}`);

        if (response.data.success) {
          setProduct(response.data.data);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, url]);

  if (loading) {
    return (
      <div className="product-details-loading">
        <div className="product-loading-image"></div>

        <div className="product-loading-info">
          <div className="loading-line large"></div>
          <div className="loading-line medium"></div>
          <div className="loading-line small"></div>
          <div className="loading-button"></div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-not-found">
        <h2>Product not found</h2>
        <p>
          Sorry, we couldn't find the product you're looking for.
        </p>

        <button onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    );
  }

  const quantity = cartItems[product._id] || 0;

  const relatedProducts = food_list
    .filter(
      (item) =>
        item.category === product.category &&
        item._id !== product._id
    )
    .slice(0, 4);

  return (
    <div className="product-details-page">

      <button
        className="product-back-button"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="product-details">

        {/* Product Image */}
        <div className="product-details-image-container">
          <img
            src={`${url}/images/${product.image}`}
            alt={product.name}
            className="product-details-image"
          />
        </div>

        {/* Product Information */}
        <div className="product-details-info">

          <p className="product-category">
            {product.category}
          </p>

          <h1>{product.name}</h1>

          <div className="product-rating">
            <span>★★★★★</span>
            <p>4.8</p>
          </div>

          <p className="product-details-price">
            ${product.price}
          </p>

          <p className="product-details-description">
            {product.description}
          </p>

          <div className="product-details-divider"></div>

          <div className="product-actions">

            {quantity === 0 ? (
              <button
                className="add-to-cart-button"
                onClick={() => addToCart(product._id)}
              >
                Add to Cart
              </button>
            ) : (
              <div className="product-counter">

                <button
                  onClick={() => removeFromCart(product._id)}
                >
                  −
                </button>

                <span>{quantity}</span>

                <button
                  onClick={() => addToCart(product._id)}
                >
                  +
                </button>

              </div>
            )}

            <button
              className="buy-now-button"
              onClick={() => {
                if (!quantity) {
                  addToCart(product._id);
                }

                navigate("/cart");
              }}
            >
              Buy Now
            </button>

          </div>

        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="related-products">

          <h2>You may also like</h2>

          <div className="related-products-grid">

            {relatedProducts.map((item) => (
              <div
                key={item._id}
                className="related-product-card"
                onClick={() =>
                  navigate(`/product/${item._id}`)
                }
              >

                <img
                  src={`${url}/images/${item.image}`}
                  alt={item.name}
                />

                <div className="related-product-info">
                  <h3>{item.name}</h3>

                  <p>
                    ${item.price}
                  </p>
                </div>

              </div>
            ))}

          </div>

        </div>
      )}

    </div>
  );
};

export default ProductDetails;