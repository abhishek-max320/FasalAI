import { useEffect, useState } from "react";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory =
      JSON.parse(localStorage.getItem("fasalAIHistory")) || [];

    setHistory(savedHistory);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("fasalAIHistory");
    setHistory([]);
  };

  return (
    <section className="history-section" id="history">

      <div className="section-heading">
        <span className="section-tag">
          SCAN HISTORY
        </span>

        <h2>
          Previous Crop <span>Analyses</span>
        </h2>

        <p>
          Review previously analyzed crops and disease detection results.
        </p>
      </div>

      {history.length === 0 ? (

        <div className="empty-history">
          <h3>No scans yet</h3>
          <p>
            Your analyzed crops will appear here.
          </p>
        </div>

      ) : (

        <>
          <div className="history-grid">

            {history.map((item, index) => (

              <div
                className="history-card"
                key={index}
              >

                <div className="history-top">

                  <span>
                    {item.crop}
                  </span>

                  <strong>
                    {item.confidence}%
                  </strong>

                </div>

                <h3>
                  {item.disease}
                </h3>

                <p>
                  Severity:{" "}
                  <strong>
                    {item.severity}
                  </strong>
                </p>

                <p>
                  Crop Health:{" "}
                  <strong>
                    {item.cropHealth}/100
                  </strong>
                </p>

                <p>
                  Outbreak Risk:{" "}
                  <strong>
                    {item.outbreakRisk}
                  </strong>
                </p>

                <small>
                  {item.date}
                </small>

              </div>

            ))}

          </div>

          <button
            className="clear-history-btn"
            onClick={clearHistory}
          >
            Clear Scan History
          </button>
        </>

      )}

    </section>
  );
}

export default History;