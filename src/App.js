import { useContext } from "react";

import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";

import { AuthContext } from "./store/auth-context";
import Homepage from "./components/Homepage/Homepage";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <>
      {!authCtx.isLoggedIn && <Header />}
      {authCtx.isLoggedIn && <Homepage />}
      {/* {ORDER} */}
      <Footer />
    </>
  );
}

export default App;
