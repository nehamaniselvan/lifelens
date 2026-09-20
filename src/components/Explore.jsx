function Explore({
  search,
  setSearch,
  category,
  setCategory,
  source,
  setSource,
  sources,
  filteredReceipts,
}) {
  return (
    <section id="explore" className="section">
      <div className="section-heading">
        <p className="eyebrow">EXPLORE</p>

        <h2>Your digital receipts</h2>

        <p>
          Search and filter your moments to find meaningful patterns.
        </p>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search your receipts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search your receipts"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Filter by category"
        >
          <option value="All">All Categories</option>
          <option value="Music">Music</option>
          <option value="Purchase">Purchase</option>
        </select>

        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          aria-label="Filter by source"
        >
          {sources.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <p className="result-count" aria-live="polite">
        Showing {filteredReceipts.length} moments from your journey
      </p>

      <div className="receipt-grid">
        {filteredReceipts.map((item) => (
          <article className="receipt-card" key={item.id}>
            <div className="receipt-top">
              <span className="receipt-icon">
                {item.icon || "✦"}
              </span>

              <span className="receipt-type">
                {item.type}
              </span>
            </div>

            <h3>{item.title}</h3>

            <p className="receipt-detail">
              {item.detail}
            </p>

            <div className="receipt-info">
              <span>{item.date}</span>
              <span>{item.time}</span>
            </div>

            {item.location && (
              <p className="location">
                📍 {item.location}
              </p>
            )}

            {item.amount && (
              <p className="amount">
                ₹{item.amount}
              </p>
            )}

            <span className="source">
              {item.source}
            </span>
          </article>
        ))}
      </div>

      {filteredReceipts.length === 0 && (
        <div className="empty">
          No receipts found.
        </div>
      )}
    </section>
  );
}

export default Explore;