function Timeline({
  musicCount,
  householdCount,
  indiaCount,
  onSourceSelect,
}) {
  return (
    <section className="section timeline">

      <div className="section-heading">
        <p className="eyebrow">
          DIGITAL JOURNEY
        </p>

        <h2>
          Your journey at a glance
        </h2>
      </div>

      <div className="timeline-grid">

        <button
          className="timeline-item"
          onClick={() => onSourceSelect("Spotify")}
        >
          <span>🎵</span>
          <h3>{musicCount}</h3>
          <p>Music moments</p>
          <small>Explore music →</small>
        </button>

        <button
          className="timeline-item"
          onClick={() =>
            onSourceSelect("Household Transactions")
          }
        >
          <span>🛒</span>
          <h3>{householdCount}</h3>
          <p>Household transactions</p>
          <small>Explore household →</small>
        </button>

        <button
          className="timeline-item"
          onClick={() =>
            onSourceSelect("India Transactions")
          }
        >
          <span>🇮🇳</span>
          <h3>{indiaCount}</h3>
          <p>India transactions</p>
          <small>Explore India →</small>
        </button>

      </div>

    </section>
  );
}

export default Timeline;