function Timeline({
  musicCount,
  householdCount,
  indiaCount,
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

        <div className="timeline-item">
          <span>🎵</span>
          <h3>{musicCount}</h3>
          <p>Music moments</p>
        </div>

        <div className="timeline-item">
          <span>🛒</span>
          <h3>{householdCount}</h3>
          <p>Household transactions</p>
        </div>

        <div className="timeline-item">
          <span>🇮🇳</span>
          <h3>{indiaCount}</h3>
          <p>India transactions</p>
        </div>

      </div>

    </section>
  );
}

export default Timeline;