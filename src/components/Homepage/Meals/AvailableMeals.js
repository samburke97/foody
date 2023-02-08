import styles from "./AvailableMeals.module.css";

import Meals from "./Meals";

const AvailableMeals = () => {
  return (
    <section className={styles.wrapper}>
      <h1>Treat Yourself</h1>
      <Meals />
    </section>
  );
};

export default AvailableMeals;
