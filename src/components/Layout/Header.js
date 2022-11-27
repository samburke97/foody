import { useState } from "react";

import Modal from "../UI/Modal";

import styles from "./Header.module.css";

import { FaHamburger } from "react-icons/fa";

const Header = () => {
  const [navIsActive, setNavIsActive] = useState(false);

  const navChangeHandler = () => {
    setNavIsActive(!navIsActive);
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.icon}>
          <FaHamburger size={72} onClick={navChangeHandler} />
          {navIsActive && <Modal onExit={navChangeHandler} />}
        </div>

        <h1>FOODY</h1>
        <p>Brisbane's Most Delectable</p>
      </header>
    </div>
  );
};

export default Header;
