import { useContext } from "react";
import { AuthContext } from "../../store/auth-context";

const Cart = (props) => {
  const authCtx = useContext(AuthContext);

  return <button onClick={authCtx.logout}>Logout</button>;
};

export default Cart;
