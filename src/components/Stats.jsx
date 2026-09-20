function Stats({
  totalReceipts,
  musicCount,
  purchaseCount,
  artistCount,
  householdCount,
  indiaCount,
}) {
  return (
    <section className="stats">

      <div className="stat-card">
        <span>Total Receipts</span>
        <strong>{totalReceipts}</strong>
      </div>

      <div className="stat-card">
        <span>Music Moments</span>
        <strong>{musicCount}</strong>
      </div>

      <div className="stat-card">
        <span>Purchases</span>
        <strong>{purchaseCount}</strong>
      </div>

      <div className="stat-card">
        <span>Music Details</span>
        <strong>{artistCount}</strong>
      </div>

      <div className="stat-card">
        <span>Household</span>
        <strong>{householdCount}</strong>
      </div>

      <div className="stat-card">
        <span>India Transactions</span>
        <strong>{indiaCount}</strong>
      </div>

    </section>
  );
}

export default Stats;