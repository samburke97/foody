import { useContext } from "react";

import { AuthContext } from "../../store/auth-context";

const Homepage = () => {
  const authCtx = useContext(AuthContext);

  return (
    <div>
      <button onClick={authCtx.logout}>Logout</button>
    </div>
  );
};

export default Homepage;
