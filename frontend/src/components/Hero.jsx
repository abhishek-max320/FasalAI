import { useLanguage } from "../context/LanguageContext.jsx";

function Hero() {
  const { t } = useLanguage();

  return (
    <section className="hero" id="home">

      <div className="hero-content">

        <div className="badge">
          {t("heroBadge")}
        </div>

        <h1>
          {t("heroTitle1")}
          <br />

          <span>
            {t("heroTitle2")}
          </span>
        </h1>

        <p>
          {t("heroDescription")}
        </p>

        <div className="hero-buttons">

          <a
            href="#scanner"
            className="primary-btn"
          >
            {t("scanNow")}
          </a>

          <button className="secondary-btn">
            {t("howWorks")}
          </button>

        </div>

        <div className="trust-row">

          <div>
            <strong>AI</strong>
            <span>{t("diseaseDetection")}</span>
          </div>

          <div>
            <strong>24/7</strong>
            <span>{t("farmerAssistance")}</span>
          </div>

          <div>
            <strong>Hindi</strong>
            <span>{t("regionalSupport")}</span>
          </div>

        </div>

      </div>


      <div className="hero-visual">

        <div className="glow glow-one"></div>
        <div className="glow glow-two"></div>

        <div className="plant-card">

          <div className="scan-line"></div>

          <div className="plant-icon">
            🌱
          </div>

          <div className="floating-card floating-one">
            <span>AI Analysis</span>
            <strong>Running...</strong>
          </div>

          <div className="floating-card floating-two">
            <span>Plant Health</span>
            <strong className="healthy">
              94%
            </strong>
          </div>

          <div className="floating-card floating-three">
            <span>Disease Risk</span>
            <strong className="risk">
              Low
            </strong>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;