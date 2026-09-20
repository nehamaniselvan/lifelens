function Insights({
  musicCount,
  householdCount,
  indiaCount,
  onSourceSelect,
}) {
  return (
    <section className="section insights">

      <div className="section-heading">
        <p className="eyebrow">
          PATTERN DISCOVERY
        </p>

        <h2>
          What your receipts reveal
        </h2>
      </div>

      <div className="insight-grid">

        <button
          className="insight-card"
          onClick={() => onSourceSelect("Spotify")}
        >
          <span>01</span>

          <h3>
            Music is part of your journey
          </h3>

          <p>
            Your listening history creates
            a continuous record of moments
            throughout your day.
          </p>

          <small>
            Explore music →
          </small>
        </button>

        <button
          className="insight-card"
          onClick={() => onSourceSelect("Household Transactions")}
        >
          <span>02</span>

          <h3>
            Everyday activity leaves traces
          </h3>

          <p>
            Purchases provide another
            perspective on how your
            digital journey changes over time.
          </p>

          <small>
            Explore household activity →
          </small>
        </button>

        <button
          className="insight-card"
          onClick={() => onSourceSelect("All")}
        >
          <span>03</span>

          <h3>
            Different data tells one story
          </h3>

          <p>
            Combining multiple receipt types
            makes hidden relationships easier
            to explore.
          </p>

          <small>
            Explore all data →
          </small>
        </button>

        <button
          className="insight-card"
          onClick={() => onSourceSelect("India Transactions")}
        >
          <span>04</span>

          <h3>
            Multiple sources reveal your journey
          </h3>

          <p>
            LifeLens combines {musicCount} music moments,
            {householdCount} household transactions and
            {indiaCount} India transactions into one
            interactive timeline.
          </p>

          <small>
            Explore India transactions →
          </small>
        </button>

      </div>
    </section>
  );
}

export default Insights;