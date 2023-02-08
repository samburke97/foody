import MealItem from "./MealItem";

const DUMMY_DATA = [
  {
    id: 1,
    name: "Eggs Benedict",
    description: 'Eggs, The "Secret" Sauce, English Muffin, Bacon',
    price: 12.99,
  },
  {
    id: 2,
    name: "Carbonara",
    description: "Egg Yolk, Pancetta, Pecorino, Fresh Pasta",
    price: 18.99,
  },
  {
    id: 3,
    name: "Vietnamese Pho",
    description: "24 Hour Broth, Noodles, Beef, Herbs, Sprouts",
    price: 8.99,
  },
];

const Meals = () => {
  const mealsList = DUMMY_DATA.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return <ul>{mealsList}</ul>;
};

export default Meals;
