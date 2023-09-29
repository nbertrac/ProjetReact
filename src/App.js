import "./App.css";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Menu from "./core/component/layouts/Menu";
import RoutesMain from "./core/component/routes/RoutesMain";
import { UserContext } from "./core/component/contexts/AuthContext";
import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import enTranslation from "./translation/en.json";
import frTranslation from "./translation/fr.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslation,
    },
    fr: {
      translation: frTranslation,
    },
  },
  lng: "fr", // Default language
  fallbackLng: "fr", // Fallback language
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

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
