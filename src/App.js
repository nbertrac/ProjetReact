import "./App.css";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Menu from "./core/component/layouts/Menu";
import RoutesMain from "./core/component/routes/RoutesMain";
import { UserContext } from "./core/component/contexts/AuthContext";

function App() {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("USER")));
  return (
    <div>
      <UserContext.Provider value={[user, setUser]}>
        <BrowserRouter>
          <Menu />
          <RoutesMain />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
