function Connections({
  musicCount,
  purchaseCount,
  indiaCount,
  onSourceSelect,
}) {
  return (
    <section
      id="connections"
      className="section connections"
    >
      <div className="section-heading">
        <p className="eyebrow">
          CONNECTIONS
        </p>

        <h2>
          Moments are connected.
        </h2>

        <p>
          Your music and purchase activity
          can reveal patterns across
          different parts of your digital life.
        </p>
      </div>

      <div className="connection-grid">

        <button
          className="connection-card"
          onClick={() => onSourceSelect("Spotify")}
        >
          <div className="big-icon">
            🎵
          </div>

          <h3>
            Music
          </h3>

          <p>
            {musicCount} music moments
            captured in your journey.
          </p>
        </button>

        <div className="connection-line">
          →
        </div>

        <button
          className="connection-card"
          onClick={() => onSourceSelect("All")}
        >
          <div className="big-icon">
            🛍️
          </div>

          <h3>
            Purchases
          </h3>

          <p>
            {purchaseCount} transaction moments
            found in your data.
          </p>
        </button>

        <div className="connection-line">
          →
        </div>

        <button
          className="connection-card"
          onClick={() =>
            onSourceSelect("India Transactions")
          }
        >
          <div className="big-icon">
            🇮🇳
          </div>

          <h3>
            India Transactions
          </h3>

          <p>
            {indiaCount} transaction moments
            found in the India dataset.
          </p>
        </button>

        <div className="connection-line">
          →
        </div>

        <div className="connection-card">
          <div className="big-icon">
            ✨
          </div>

          <h3>
            Story
          </h3>

          <p>
            Together these moments create a picture
            of your digital journey.
          </p>
        </div>

      </div>
    </section>
  );
}

export default Connections;