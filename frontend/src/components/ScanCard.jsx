import { useRef, useState } from "react";

import ResultCard from "./ResultCard.jsx";

import {
  useLanguage,
} from "../context/LanguageContext.jsx";


function ScanCard() {

  const { t } = useLanguage();

  const inputRef = useRef(null);

  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);


  // =====================================
  // BACKEND URL
  // =====================================

  // Local development:
  // VITE_API_URL blank rahega aur Vite proxy use hoga.
  //
  // Production:
  // Vercel me VITE_API_URL = Render backend URL hoga.

  const API_URL =
    import.meta.env.VITE_API_URL || "";


  // =====================================
  // IMAGE SELECTION
  // =====================================

  const handleImage = (event) => {

    const file = event.target.files[0];

    if (!file) return;


    if (!file.type.startsWith("image/")) {

      alert(
        "Please select a valid image."
      );

      return;
    }


    // Old preview ko cleanup
    if (image) {
      URL.revokeObjectURL(image);
    }


    setSelectedFile(file);

    setFileName(file.name);


    const imageURL =
      URL.createObjectURL(file);


    setImage(imageURL);
  };


  // =====================================
  // ANALYZE IMAGE
  // =====================================

  const analyzeImage = async () => {

    if (!selectedFile) {

      alert(
        "Please select an image first."
      );

      return;
    }


    setLoading(true);


    try {

      const formData = new FormData();


      // IMAGE
      formData.append(
        "file",
        selectedFile
      );


      // TEMPORARY CROP
      // Later crop selector se replace kar sakte hain
      formData.append(
        "crop",
        "Wheat"
      );


      // TEMPORARY LOCATION
      formData.append(
        "latitude",
        "30.901"
      );

      formData.append(
        "longitude",
        "75.8573"
      );


      formData.append(
        "field_id",
        "0"
      );


      formData.append(
        "user_id",
        "1"
      );


      // =====================================
      // BACKEND REQUEST
      // =====================================

      const response = await fetch(
        `${API_URL}/api/v1/scans/analyze`,
        {
          method: "POST",
          body: formData,
        }
      );


      if (!response.ok) {

        let errorMessage =
          `Backend error: ${response.status}`;


        try {

          const errorData =
            await response.json();


          if (errorData?.detail) {

            errorMessage =
              typeof errorData.detail === "string"
                ? errorData.detail
                : JSON.stringify(
                    errorData.detail
                  );
          }

        } catch {

          // Ignore JSON parsing failure
        }


        throw new Error(
          errorMessage
        );
      }


      const data =
        await response.json();


      console.log(
        "Backend response:",
        data
      );


      // =====================================
      // SAVE HISTORY
      // =====================================

      const historyItem = {

        crop:
          data.crop ||
          "Unknown Crop",


        disease:
          data.disease?.name ||
          "Unknown Disease",


        confidence:
          data.disease?.confidence ||
          0,


        severity:
          data.severity
            ?.severity_grade ||
          "Unknown",


        affectedArea:
          data.severity
            ?.affected_area_percent ||
          0,


        cropHealth:
          data.crop_health_score ||
          0,


        outbreakRisk:
          data.outbreak_risk
            ?.level ||
          "Unknown",


        pest:
          data.pests?.[0]
            ?.pest_name ||
          "No major pest detected",


        date:
          new Date()
            .toLocaleString(),
      };


      const oldHistory =
        JSON.parse(
          localStorage.getItem(
            "fasalAIHistory"
          )
        ) || [];


      const updatedHistory = [

        historyItem,

        ...oldHistory,

      ].slice(0, 10);


      localStorage.setItem(
        "fasalAIHistory",
        JSON.stringify(
          updatedHistory
        )
      );


      window.dispatchEvent(
        new Event(
          "fasal-history-updated"
        )
      );


      // =====================================
      // RESULT DATA
      // =====================================

      setResult({

        // =====================
        // CROP
        // =====================

        crop:
          data.crop ||
          "Unknown Crop",


        // =====================
        // DISEASE
        // =====================

        disease:
          data.disease?.name ||
          "Unknown Disease",


        scientificName:
          data.disease
            ?.scientific_name ||
          "Not available",


        confidence:
          data.disease
            ?.confidence ||
          0,


        // =====================
        // SEVERITY
        // =====================

        severity:
          data.severity
            ?.severity_grade ||
          "Unknown",


        affectedArea:
          data.severity
            ?.affected_area_percent ||
          0,


        // =====================
        // CROP HEALTH
        // =====================

        cropHealth:
          data.crop_health_score ||
          0,


        // =====================
        // OUTBREAK RISK
        // =====================

        outbreakRisk:
          data.outbreak_risk
            ?.level ||
          "Unknown",


        // =====================
        // PEST DETECTION
        // =====================

        pest:
          data.pests?.[0]
            ?.pest_name ||
          "No major pest detected",


        pestConfidence:
          data.pests?.[0]
            ?.confidence ||
          0,


        // =====================
        // POSSIBLE CAUSE
        // =====================

        cause:
          data.disease
            ?.scientific_name

            ? `Pathogen identified as ${data.disease.scientific_name}.`

            : "Disease symptoms detected by the crop intelligence system.",


        // =====================
        // VERIFIED PROTOCOLS
        // =====================

        recommendations:
          data.recommendations ||
          [],


        // =====================
        // WEATHER
        // =====================

        weather: {

          temperature:
            data.weather
              ?.temperature ??
            "N/A",


          humidity:
            data.weather
              ?.humidity ??
            "N/A",


          precipitation:
            data.weather
              ?.precipitation_mm ??
            "N/A",


          windSpeed:
            data.weather
              ?.wind_speed_kmh ??
            "N/A",
        },


        // =====================
        // EXPLAINABLE AI
        // =====================

        explainableAI: {

          primaryAttribution:

            data.explainable_ai
              ?.primary_attribution ||

            "AI explanation not available.",
        },


        // =====================================
        // ORIGINAL IMAGE + GRAD-CAM
        // IMPORTANT FOR DEPLOYMENT
        // =====================================

        images: {

          original:
            data.images?.original

              ? `${API_URL}${data.images.original}`

              : null,


          gradcam:
            data.images
              ?.gradcam_heatmap

              ? `${API_URL}${data.images.gradcam_heatmap}`

              : null,
        },

      });


    } catch (error) {

      console.error(
        "Crop analysis error:",
        error
      );


      alert(
        `Unable to analyze the image.\n\n${error.message}\n\nMake sure the backend server is running.`
      );


    } finally {

      setLoading(false);
    }
  };


  // =====================================
  // REMOVE IMAGE
  // =====================================

  const removeImage = () => {

    if (image) {

      URL.revokeObjectURL(
        image
      );
    }


    setImage(null);

    setFileName("");

    setSelectedFile(null);


    if (inputRef.current) {

      inputRef.current.value =
        "";
    }
  };


  // =====================================
  // RESULT SCREEN
  // =====================================

  if (result) {

    return (

      <section className="scanner-section">

        <ResultCard

          result={result}


          onReset={() => {

            if (image) {

              URL.revokeObjectURL(
                image
              );
            }


            setResult(null);

            setImage(null);

            setFileName("");

            setSelectedFile(null);


            if (inputRef.current) {

              inputRef.current.value =
                "";
            }

          }}

        />

      </section>
    );
  }


  // =====================================
  // SCANNER UI
  // =====================================

  return (

    <section
      className="scanner-section"
      id="scanner"
    >

      {/* HEADING */}

      <div className="section-heading">

        <span className="section-tag">

          {t("scannerTag")}

        </span>


        <h2>

          {t("diagnose")}

          <span>
            {t("instantly")}
          </span>

        </h2>


        <p>
          {t(
            "scannerDescription"
          )}
        </p>

      </div>


      <div className="scanner-container">


        {/* =========================
            IMAGE UPLOAD
        ========================== */}

        <div className="scanner-card">


          {!image ? (

            <div
              className="upload-area"

              onClick={() =>
                inputRef.current
                  ?.click()
              }
            >

              <div className="upload-icon">
                📷
              </div>


              <h3>
                {t("uploadCrop")}
              </h3>


              <p>
                {t("selectCrop")}
              </p>


              <button
                type="button"
                className="upload-btn"
              >

                {t("chooseImage")}

              </button>


              <small>
                JPG, JPEG, PNG
              </small>

            </div>

          ) : (

            <div className="image-preview">


              <img
                src={image}
                alt="Crop preview"
              />


              <div className="image-info">

                <div>

                  <span>
                    {t(
                      "selectedImage"
                    )}
                  </span>


                  <strong>
                    {fileName}
                  </strong>

                </div>


                <button
                  type="button"

                  onClick={
                    removeImage
                  }

                  className="remove-btn"
                >

                  {t("remove")}

                </button>

              </div>


              <button
                type="button"

                className="analyze-btn"

                onClick={
                  analyzeImage
                }

                disabled={
                  loading
                }
              >

                {loading
                  ? t("analyzing")
                  : t("analyze")}

              </button>

            </div>

          )}


          <input
            ref={inputRef}

            type="file"

            accept="image/png,image/jpeg,image/jpg"

            hidden

            onChange={
              handleImage
            }
          />

        </div>


        {/* =========================
            ANALYSIS STEPS
        ========================== */}

        <div className="scanner-side">


          <div className="information-card">

            <span className="info-number">
              01
            </span>


            <div>

              <h4>
                {t("clearPhoto")}
              </h4>


              <p>
                {t(
                  "clearPhotoDesc"
                )}
              </p>

            </div>

          </div>


          <div className="information-card">

            <span className="info-number">
              02
            </span>


            <div>

              <h4>
                {t("aiAnalyze")}
              </h4>


              <p>
                {t(
                  "aiAnalyzeDesc"
                )}
              </p>

            </div>

          </div>


          <div className="information-card">

            <span className="info-number">
              03
            </span>


            <div>

              <h4>
                {t(
                  "recommendations"
                )}
              </h4>


              <p>
                {t(
                  "recommendationsDesc"
                )}
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}


export default ScanCard;