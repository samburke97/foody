import React, { useContext } from "react";
import { FaHamburger } from "react-icons/fa";
import { AuthContext } from "../../store/auth-context";
import Modal from "../UI/Modal";
import styles from "./Header.module.css";

const Header = () => {
  const authCtx = useContext(AuthContext);

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <FaHamburger
          size={72}
          onClick={authCtx.navChange}
          className={styles.icon}
        />
        {authCtx.navIsActive && <Modal onExit={authCtx.navChange} />}
        <h1>FOODY</h1>
      </header>
    </div>
  );
};

export default Header;
