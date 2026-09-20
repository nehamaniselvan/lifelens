function Insights({
  musicCount,
  householdCount,
  indiaCount,
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

        <div className="insight-card">

          <span>01</span>

          <h3>
            Music is part of your journey
          </h3>

          <p>
            Your listening history creates
            a continuous record of moments
            throughout your day.
          </p>

        </div>

        <div className="insight-card">

          <span>02</span>

          <h3>
            Everyday activity leaves traces
          </h3>

          <p>
            Purchases provide another
            perspective on how your
            digital journey changes over time.
          </p>

        </div>

        <div className="insight-card">

          <span>03</span>

          <h3>
            Different data tells one story
          </h3>

          <p>
            Combining multiple receipt types
            makes hidden relationships easier
            to explore.
          </p>

        </div>

        <div className="insight-card">

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

        </div>

      </div>

    </section>
  );
}

export default Insights;