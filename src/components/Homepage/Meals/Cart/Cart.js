import { useContext } from "react";
import { AuthContext } from "../../../../store/auth-context";

import Order from "./Order";

const Cart = (props) => {
  const authCtx = useContext(AuthContext);

  return (
    <>
      <Order />
      <button onClick={authCtx.logout}>Logout</button>
    </>
  );
};

export default Cart;
