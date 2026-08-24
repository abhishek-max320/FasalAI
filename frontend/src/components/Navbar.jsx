import {
  useLanguage,
} from "../context/LanguageContext.jsx";

function Navbar() {
  const {
    language,
    toggleLanguage,
    t,
  } = useLanguage();

  return (
    <nav className="navbar">

      <div className="logo">

        <div className="logo-icon">
          🌾
        </div>

        <div>
          <h2>FasalAI</h2>

          <span>
            Smart Crop Intelligence
          </span>
        </div>

      </div>


      <div className="nav-links">

        <a href="#home">
          {t("home")}
        </a>

        <a href="#scanner">
          {t("scanner")}
        </a>

        <a href="#weather">
          {t("weather")}
        </a>

        <a href="#history">
          {t("history")}
        </a>

        <a href="#schemes">
          {t("schemes")}
        </a>

      </div>


      <button
        className="language-btn"
        onClick={toggleLanguage}
      >
        {language === "en"
          ? "हिन्दी / EN"
          : "हिन्दी / EN"}
      </button>

    </nav>
  );
}

export default Navbar;