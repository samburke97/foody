import React, { useContext } from "react";
import { FaHamburger } from "react-icons/fa";
import { AuthContext } from "../store/auth-context";
import hero from "../assets/hero.png";
import Modal from "../components/UI/Modal";
import styles from "./Login.module.css";

const Login = () => {
  const authCtx = useContext(AuthContext);

  return (
    <div className={styles.login}>
      <header>
        <FaHamburger
          size={72}
          onClick={authCtx.navChange}
          className={styles.icon}
        />
        {authCtx.navIsActive && <Modal onExit={authCtx.navChange} />}
        <div className={styles.content}>
          <div>
            <h1>FOODY</h1>
            <p>Delectable delights, delivered to you</p>
          </div>
          <div className={styles.image}>
            <img src={hero} alt="Foody Marketing" />
          </div>
        </div>
      </header>
    </div>
  );
};
export default Login;
