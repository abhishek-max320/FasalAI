import {
  useLanguage,
} from "../context/LanguageContext.jsx";


function ResultCard({
  result,
  onReset,
}) {

  const { t } = useLanguage();


  return (

    <div className="result-section">


      {/* TOP RESULT */}

      <div className="result-header">

        <div>

          <span className="result-label">
            {t("analysisComplete")}
          </span>

          <h2>
            {result.disease}
          </h2>

          <p>
            {t("crop")}:{" "}

            <strong>
              {result.crop}
            </strong>
          </p>

          <p>

            {t("scientificName")}:{" "}

            <strong>
              {result.scientificName ||
                "Not available"}
            </strong>

          </p>

        </div>


        <div className="confidence-box">

          <span>
            {t("confidence")}
          </span>

          <strong>
            {result.confidence}%
          </strong>

        </div>

      </div>


      {/* DIAGNOSTIC CARDS */}

      <div className="diagnostic-grid">

        <div className="diagnostic-card">

          <span>
            {t("severity")}
          </span>

          <h3 className="severity">
            {result.severity}
          </h3>

          <p>
            {t("severityDesc")}
          </p>

        </div>


        <div className="diagnostic-card">

          <span>
            {t("affectedArea")}
          </span>

          <h3>
            {result.affectedArea}%
          </h3>

          <p>
            {t("affectedDesc")}
          </p>

        </div>


        <div className="diagnostic-card">

          <span>
            {t("cropHealth")}
          </span>

          <h3>
            {result.cropHealth}/100
          </h3>

          <p>
            {t("healthDesc")}
          </p>

        </div>


        <div className="diagnostic-card">

          <span>
            {t("outbreakRisk")}
          </span>

          <h3 className="risk-value">
            {result.outbreakRisk}
          </h3>

          <p>
            {t("riskDesc")}
          </p>

        </div>

      </div>


      {/* PEST */}

      <div className="pest-card">

        <div>

          <span className="card-label">
            {t("pestDetection")}
          </span>

          <h3>
            {result.pest}
          </h3>

          <p>
            {t("pestDesc")}
          </p>

        </div>


        <div className="pest-confidence">

          <span>
            {t("confidence")}
          </span>

          <strong>
            {result.pestConfidence || 0}%
          </strong>

        </div>

      </div>


      {/* CAUSE */}

      <div className="result-card cause-card">

        <span className="card-label">
          {t("possibleCause")}
        </span>

        <h3>
          {t("diseaseAnalysis")}
        </h3>

        <p>
          {result.cause}
        </p>

      </div>


      {/* EXPLAINABLE AI */}

      <div className="xai-section">

        <div className="recommendations-heading">

          <span>
            {t("explainableAI")}
          </span>

          <h2>
            {t("whyDetected")}
          </h2>

          <p>
            {t("explainableDesc")}
          </p>

        </div>


        <div className="xai-images">

          <div className="xai-image-card">

            <span>
              {t("originalImage")}
            </span>

            {result.images?.original ? (

              <img
                src={result.images.original}
                alt="Original crop"
              />

            ) : (

              <p>
                Image unavailable
              </p>

            )}

          </div>


          <div className="xai-image-card">

            <span>
              {t("heatmap")}
            </span>

            {result.images?.gradcam ? (

              <img
                src={result.images.gradcam}
                alt="Grad-CAM"
              />

            ) : (

              <p>
                Heatmap unavailable
              </p>

            )}

          </div>

        </div>


        <div className="ai-explanation-card">

          <span>
            {t("aiExplanation")}
          </span>

          <h3>
            {t("influenced")}
          </h3>

          <p>
            {
              result.explainableAI
                ?.primaryAttribution
            }
          </p>

        </div>

      </div>


      {/* WEATHER */}

      <div className="weather-result-section">

        <div className="recommendations-heading">

          <span>
            {t("weatherIntelligence")}
          </span>

          <h2>
            {t("fieldConditions")}
          </h2>

          <p>
            {t("weatherDesc")}
          </p>

        </div>


        <div className="weather-grid">

          <div className="weather-card">

            <span>
              🌡 {t("temperature")}
            </span>

            <h3>
              {result.weather
                ?.temperature ?? "N/A"}°C
            </h3>

            <p>
              {t("temperatureDesc")}
            </p>

          </div>


          <div className="weather-card">

            <span>
              💧 {t("humidity")}
            </span>

            <h3>
              {result.weather
                ?.humidity ?? "N/A"}%
            </h3>

            <p>
              {t("humidityDesc")}
            </p>

          </div>


          <div className="weather-card">

            <span>
              🌧 {t("rainfall")}
            </span>

            <h3>
              {result.weather
                ?.precipitation ??
                "N/A"} mm
            </h3>

            <p>
              {t("rainfallDesc")}
            </p>

          </div>


          <div className="weather-card">

            <span>
              💨 {t("windSpeed")}
            </span>

            <h3>
              {result.weather
                ?.windSpeed ??
                "N/A"} km/h
            </h3>

            <p>
              {t("windDesc")}
            </p>

          </div>

        </div>

      </div>


      {/* RECOMMENDATIONS */}

      <div className="recommendations-section">

        <div className="recommendations-heading">

          <span>
            {t("verifiedProtocols")}
          </span>

          <h2>
            {t("recommendedActions")}
          </h2>

          <p>
            {t("protocolDesc")}
          </p>

        </div>


        <div className="recommendations-grid">

          {result.recommendations
            ?.length > 0 ? (

            result.recommendations
              .map((item, index) => (

                <div
                  className="recommendation-card"
                  key={
                    item.id || index
                  }
                >

                  <div className="recommendation-top">

                    <span className="recommendation-number">

                      {String(
                        index + 1
                      ).padStart(
                        2,
                        "0"
                      )}

                    </span>


                    <span className="recommendation-category">

                      {item.category ||
                        "RECOMMENDED"}

                    </span>

                  </div>


                  <h3>
                    {item.action_title ||
                      "Recommended Action"}
                  </h3>


                  <p className="recommendation-description">

                    {item.description}

                  </p>


                  {item.dosage_or_application && (

                    <div className="recommendation-info">

                      <span>
                        {t("application")}
                      </span>

                      <p>
                        {
                          item.dosage_or_application
                        }
                      </p>

                    </div>

                  )}


                  {item.safety_warning && (

                    <div className="safety-warning">

                      <span>
                        ⚠ {t("safety")}
                      </span>

                      <p>
                        {
                          item.safety_warning
                        }
                      </p>

                    </div>

                  )}


                  {item.source && (

                    <div className="recommendation-source">

                      {t("source")}:{" "}
                      {item.source}

                    </div>

                  )}

                </div>

              ))

          ) : (

            <div className="no-recommendations">

              No verified recommendations available.

            </div>

          )}

        </div>

      </div>


      <button
        className="scan-again-btn"
        onClick={onReset}
      >

        {t("scanAnother")}

      </button>

    </div>
  );
}

export default ResultCard;