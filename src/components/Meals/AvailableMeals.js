import React, { useEffect, useState } from "react";

import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem";

const AvailableMeals = () => {
  const [mealsData, setMealsData] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [httpError, setHttpError] = useState(false);

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      const response = await fetch(
        "https://react-online-ordering-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something has gone wrong");
      }

      const data = await response.json();

      let mealsList = [];

      for (const key in data) {
        mealsList.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price
        });
      }

      mealsList.sort(function (a, b) {
        let nameA = a.name.toLowerCase();
        let nameB = b.name.toLowerCase();

        if (nameA < nameB) {
          //sort string ascending
          return -1;
        }

        if (nameA > nameB) {
          return 1;
        }

        return 0; //default return value (no sorting)
      });

      setMealsData(mealsList);

      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setHttpError(error.message);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes["meals-loading-text"]}>Loading...</section>
    );
  }

  if (httpError) {
    return (
      <section className={classes["meals-loading-text"]}>{httpError}</section>
    );
  }

  const menu = mealsData.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      desc={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{menu}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
