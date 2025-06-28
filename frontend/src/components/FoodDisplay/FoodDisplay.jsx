import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  const isLoading = food_list.length === 0;

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {isLoading ? (
          // Show 8 skeleton cards
          Array(8)
            .fill()
            .map((_, index) => (
              <div className="skeleton-card" key={index}>
                <Skeleton height={140} borderRadius={10} />
                <Skeleton height={20} style={{ marginTop: 10 }} />
                <Skeleton height={15} width={"60%"} />
              </div>
            ))
        ) : (
          food_list.map((item) => {
            if (category === "All" || category === item.category) {
              return (
                <div key={item._id} id={item._id}>
                  <FoodItem
                    id={item._id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    image={item.image}
                  />
                </div>
              );
            }
          })
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
