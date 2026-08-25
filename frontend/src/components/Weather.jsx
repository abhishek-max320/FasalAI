import { useCallback, useEffect, useMemo, useState } from "react";
import { useLanguage } from "../context/LanguageContext.jsx";
import "./Weather.css";

const DEFAULT_LOCATION = {
  latitude: 30.901,
  longitude: 75.8573,
};

const REFRESH_INTERVAL = 5 * 60 * 1000;

function Weather() {
  const { language } = useLanguage();

  const text = useMemo(
    () =>
      language === "hi"
        ? {
            eyebrow: "लाइव मौसम निगरानी",
            title: "खेत का लाइव मौसम",
            description:
              "तापमान, नमी, वर्षा और हवा की स्थिति के आधार पर रोग अनुकूलता की निगरानी।",
            live: "लाइव",
            auto: "हर 5 मिनट में ऑटो रिफ्रेश",
            location: "वर्तमान लोकेशन उपयोग करें",
            locating: "लोकेशन खोजी जा रही है...",
            refresh: "अभी रिफ्रेश करें",
            refreshing: "अपडेट हो रहा है...",
            temp: "तापमान",
            humidity: "नमी",
            rain: "वर्षा",
            wind: "हवा की गति",
            favorability: "रोग अनुकूलता",
            risk: "रोग जोखिम",
            dew: "पत्ती नमी जोखिम",
            lastUpdated: "अंतिम अपडेट",
            source: "डेटा स्रोत",
            defaultLocation: "डिफ़ॉल्ट खेत लोकेशन",
            liveLocation: "डिवाइस लोकेशन",
            error:
              "मौसम डेटा प्राप्त नहीं हो पाया। Backend live है या नहीं, जाँच करें।",
            permission:
              "लोकेशन अनुमति नहीं मिली। डिफ़ॉल्ट खेत लोकेशन का उपयोग किया जा रहा है।",
            unsupported:
              "इस ब्राउज़र में लोकेशन उपलब्ध नहीं है। डिफ़ॉल्ट खेत लोकेशन का उपयोग होगा।",
          }
        : {
            eyebrow: "LIVE WEATHER MONITORING",
            title: "Live Field Weather",
            description:
              "Monitor temperature, humidity, rainfall and wind conditions used for crop disease-risk intelligence.",
            live: "LIVE",
            auto: "Auto-refresh every 5 min",
            location: "Use Current Location",
            locating: "Detecting location...",
            refresh: "Refresh Now",
            refreshing: "Updating...",
            temp: "Temperature",
            humidity: "Humidity",
            rain: "Rainfall",
            wind: "Wind Speed",
            favorability: "Disease Favorability",
            risk: "Disease Risk",
            dew: "Leaf Wetness Risk",
            lastUpdated: "Last updated",
            source: "Data source",
            defaultLocation: "Default field location",
            liveLocation: "Device location",
            error:
              "Unable to fetch live weather data. Check whether the backend is live.",
            permission:
              "Location permission was not granted. Using the default field location.",
            unsupported:
              "Geolocation is not supported by this browser. Using the default field location.",
          },
    [language]
  );

  const API_URL = import.meta.env.VITE_API_URL || "";

  const [coords, setCoords] = useState(DEFAULT_LOCATION);
  const [locationMode, setLocationMode] = useState("default");
  const [locating, setLocating] = useState(false);

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [locationMessage, setLocationMessage] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchWeather = useCallback(
    async (silent = false) => {
      if (!silent) setLoading(true);
      setError("");

      try {
        const params = new URLSearchParams({
          latitude: String(coords.latitude),
          longitude: String(coords.longitude),
        });

        const response = await fetch(
          `${API_URL}/api/v1/weather/current?${params.toString()}`
        );

        if (!response.ok) {
          throw new Error(`Weather API error: ${response.status}`);
        }

        const data = await response.json();
        setWeather(data);
        setLastUpdated(new Date());
      } catch (err) {
        console.error("Live weather error:", err);
        setError(text.error);
      } finally {
        setLoading(false);
      }
    },
    [API_URL, coords.latitude, coords.longitude, text.error]
  );

  useEffect(() => {
    fetchWeather();

    const intervalId = window.setInterval(() => {
      fetchWeather(true);
    }, REFRESH_INTERVAL);

    return () => window.clearInterval(intervalId);
  }, [fetchWeather]);

  const useCurrentLocation = () => {
    setLocationMessage("");

    if (!navigator.geolocation) {
      setLocationMessage(text.unsupported);
      return;
    }

    setLocating(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLocationMode("live");
        setLocating(false);
      },
      () => {
        setLocationMode("default");
        setLocating(false);
        setLocationMessage(text.permission);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 5 * 60 * 1000,
      }
    );
  };

  const riskClass = (value = "") => {
    const risk = String(value).toUpperCase();

    if (risk === "CRITICAL" || risk === "HIGH") return "weather-risk-critical";
    if (risk === "MODERATE" || risk === "MEDIUM") return "weather-risk-moderate";
    return "weather-risk-low";
  };

  return (
    <section className="live-weather-section" id="weather">
      <div className="live-weather-shell">
        <div className="live-weather-header">
          <div>
            <div className="live-weather-eyebrow">
              <span className="live-dot" />
              {text.eyebrow}
            </div>

            <h2>{text.title}</h2>
            <p>{text.description}</p>
          </div>

          <div className="live-weather-actions">
            <div className="live-weather-status">
              <span className="live-dot" />
              {text.live}
            </div>

            <button
              type="button"
              className="weather-location-btn"
              onClick={useCurrentLocation}
              disabled={locating}
            >
              {locating ? `📍 ${text.locating}` : `📍 ${text.location}`}
            </button>

            <button
              type="button"
              className="weather-refresh-btn"
              onClick={() => fetchWeather()}
              disabled={loading}
            >
              {loading ? `↻ ${text.refreshing}` : `↻ ${text.refresh}`}
            </button>
          </div>
        </div>

        <div className="weather-meta-row">
          <span>
            {locationMode === "live" ? text.liveLocation : text.defaultLocation}
            {" • "}
            {coords.latitude.toFixed(4)}, {coords.longitude.toFixed(4)}
          </span>

          <span>{text.auto}</span>
        </div>

        {locationMessage && (
          <div className="weather-notice">{locationMessage}</div>
        )}

        {error && <div className="weather-error">{error}</div>}

        <div className="live-weather-grid">
          <div className="live-weather-card">
            <span>🌡 {text.temp}</span>
            <strong>
              {weather?.temperature ?? "--"}
              <small>°C</small>
            </strong>
          </div>

          <div className="live-weather-card">
            <span>💧 {text.humidity}</span>
            <strong>
              {weather?.humidity ?? "--"}
              <small>%</small>
            </strong>
          </div>

          <div className="live-weather-card">
            <span>🌧 {text.rain}</span>
            <strong>
              {weather?.precipitation_mm ?? "--"}
              <small> mm</small>
            </strong>
          </div>

          <div className="live-weather-card">
            <span>💨 {text.wind}</span>
            <strong>
              {weather?.wind_speed_kmh ?? "--"}
              <small> km/h</small>
            </strong>
          </div>
        </div>

        <div className="weather-intelligence-grid">
          <div className="weather-intelligence-card">
            <span>{text.favorability}</span>
            <strong>{weather?.disease_favorability_index ?? "--"}%</strong>
            <div className="weather-progress">
              <div
                style={{
                  width: `${Math.min(
                    100,
                    Math.max(0, Number(weather?.disease_favorability_index) || 0)
                  )}%`,
                }}
              />
            </div>
          </div>

          <div className="weather-intelligence-card">
            <span>{text.risk}</span>
            <strong
              className={riskClass(weather?.disease_risk_category)}
            >
              {weather?.disease_risk_category ?? "--"}
            </strong>
          </div>

          <div className="weather-intelligence-card weather-dew-card">
            <span>{text.dew}</span>
            <strong>{weather?.dew_risk ?? "--"}</strong>
          </div>
        </div>

        {weather?.summary && (
          <div className="weather-summary-card">
            <div className="weather-summary-icon">⚠</div>
            <div>
              <span>{text.risk}</span>
              <p>{weather.summary}</p>
            </div>
          </div>
        )}

        <div className="weather-footer">
          <span>
            {text.lastUpdated}:{" "}
            {lastUpdated ? lastUpdated.toLocaleTimeString() : "--"}
          </span>

          <span>
            {text.source}: {weather?.source ?? "Open-Meteo"}
          </span>
        </div>
      </div>
    </section>
  );
}

export default Weather;
