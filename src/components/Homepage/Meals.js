import React, { useEffect, useState } from "react";
import styles from "./Meals.module.css";
import MealItem from "./MealItem";

const Meals = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      //JSON Response
      const response = await fetch(
        "https://react-http-b681a-default-rtdb.firebaseio.com/meals.json"
      );

      //Handle any errors
      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      //This gives us the response data in an object

      const responseData = await response.json();

      //Convert the object to an array containing each item

      const loadedMeals = [];

      for (let key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
          image: responseData[key].image,
        });
      }
      setMeals(loadedMeals);
    };
    fetchMeals();
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      image={meal.image}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={styles.content}>
      <h1>Treat Yourself</h1>
      <ul className={styles.meals}>{mealsList}</ul>
    </section>
  );
};

export default Meals;
