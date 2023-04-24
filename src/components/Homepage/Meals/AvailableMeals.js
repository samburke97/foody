import Meals from "./Meals";
import styles from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  return (
    <section className={styles.wrapper}>
      <h1>Treat Yourself</h1>
      <hr></hr>
      <Meals />
    </section>
  );
};

export default AvailableMeals;
