function DataSnapshot({
  musicCount,
  householdCount,
  indiaCount,
  maxCount,
}) {
  return (
    <section className="section">

      <div className="section-heading">

        <p className="eyebrow">
          DATA SNAPSHOT
        </p>

        <h2>
          Your activity across sources
        </h2>

      </div>

      <div className="bar-chart">

        <div className="bar-row">

          <span>
            🎵 Music
          </span>

          <div className="bar-track">

            <div
              className="bar-fill"
              style={{
                width: `${(musicCount / maxCount) * 100}%`,
              }}
            />

          </div>

          <strong>
            {musicCount}
          </strong>

        </div>

        <div className="bar-row">

          <span>
            🛒 Household
          </span>

          <div className="bar-track">

            <div
              className="bar-fill"
              style={{
                width: `${(householdCount / maxCount) * 100}%`,
              }}
            />

          </div>

          <strong>
            {householdCount}
          </strong>

        </div>

        <div className="bar-row">

          <span>
            🇮🇳 India
          </span>

          <div className="bar-track">

            <div
              className="bar-fill"
              style={{
                width: `${(indiaCount / maxCount) * 100}%`,
              }}
            />

          </div>

          <strong>
            {indiaCount}
          </strong>

        </div>

      </div>

    </section>
  );
}

export default DataSnapshot;