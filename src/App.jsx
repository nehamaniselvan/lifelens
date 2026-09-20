import Papa from "papaparse";
import { useEffect, useMemo, useState } from "react";
import receipts from "./data/receipts";

function App() {
  const [spotifyData, setSpotifyData] = useState([]);
  const [householdData, setHouseholdData] = useState([]);
  const [indiaData, setIndiaData] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [source, setSource] = useState("All");

  // Load India Transactions
  useEffect(() => {
    Papa.parse("/data/india_transactions.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
  console.log("India records:", result.data.length);
  setIndiaData(result.data);
}
    });
  }, []);

  // Load Household Transactions
  useEffect(() => {
    Papa.parse("/data/Daily Household Transactions.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        console.log("Household records:", result.data.length);
        setHouseholdData(result.data);
      }
    });
  }, []);

  // Load Spotify
  useEffect(() => {
    Papa.parse("/data/spotify_history.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        console.log("Spotify records:", result.data.length);
        setSpotifyData(result.data);
      }
    });
  }, []);

  // Spotify data
  const spotifyReceipts = spotifyData.map((row, index) => {
    const dateTime = row.ts || "";
    const parts = dateTime.split("T");

    return {
      id: `spotify-${index}`,
      source: "Spotify",
      type: "Music",
      icon: "🎵",
      title: row.track_name || "Unknown Track",
      detail: row.artist_name || "Unknown Artist",
      date: parts[0] || "Unknown date",
      time: parts[1]
        ? parts[1].replace("Z", "").slice(0, 5)
        : "",
      location: row.platform || "Spotify",
      tags: ["music", "spotify"]
    };
  });

  // Household data
  const householdReceipts = householdData.map((row, index) => ({
    id: `household-${index}`,
    source: "Household Transactions",
    type: "Purchase",
    icon: "🛒",
    title:
      row.Subcategory ||
      row.Category ||
      "Household Purchase",
    detail:
      row.Note ||
      row.Category ||
      "Household transaction",
    date: row.Date || "Unknown date",
    time: row.Time || "",
    location: row.Mode || "Household",
    tags: ["purchase", "household"]
  }));

  // India data
  const indiaReceipts = indiaData.map((row, index) => ({
  id: `india-${index}`,
  source: "India Transactions",
  type: "Purchase",
  icon: "🇮🇳",
  title:
    row.Category ||
    row.category ||
    row.Merchant ||
    row.merchant ||
    "India Transaction",
  detail:
    row.Description ||
    row.description ||
    row.Payment_Method ||
    row.payment_method ||
    "India transaction",
  date:
    row.Date ||
    row.date ||
    "Unknown date",
  time:
    row.Time ||
    row.time ||
    "",
  location:
    row.City ||
    row.city ||
    row.State ||
    row.state ||
    "India",
  tags: ["purchase", "india"]
}));

  // Combine all data
  const allReceipts = [
    ...spotifyReceipts,
    ...householdReceipts,
    ...indiaReceipts,
    ...receipts
  ];

  // Dynamic source list
  const sources = [
    "All",
    ...new Set(allReceipts.map((item) => item.source))
  ];

  // Search and filter
  const filteredReceipts = useMemo(() => {
    return allReceipts
      .filter((item) => {
        const text = `
          ${item.title || ""}
          ${item.detail || ""}
          ${item.type || ""}
          ${item.source || ""}
          ${item.location || ""}
        `.toLowerCase();

        const matchesSearch =
          text.includes(search.toLowerCase());

        const matchesCategory =
          category === "All" ||
          item.type === category;

        const matchesSource =
          source === "All" ||
          item.source === source;

        return (
          matchesSearch &&
          matchesCategory &&
          matchesSource
        );
      })
      .slice(0, 60);
  }, [
    spotifyData,
    householdData,
    indiaData,
    search,
    category,
    source
  ]);

  // Statistics
  const musicCount =
    spotifyData.length +
    receipts.filter(
      (item) => item.type === "Music"
    ).length;

  const purchaseCount =
    householdData.length +
    indiaData.length +
    receipts.filter(
      (item) => item.type === "Purchase"
    ).length;

  const artistCount = new Set(
    spotifyData
      .map((item) => item.artist_name)
      .filter(Boolean)
  ).size;
  const indiaCount = indiaData.length;

const householdCount = householdData.length;

const totalRealData =
  spotifyData.length +
  householdData.length +
  indiaData.length;

  const totalReceipts =
    spotifyData.length +
    householdData.length +
    indiaData.length +
    receipts.length;
    const maxCount = Math.max(musicCount, householdCount, indiaCount);
  return (
    <div className="app">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">LifeLens</div>

        <div className="nav-links">
          <a href="#explore">Explore</a>
          <a href="#connections">Connections</a>
          <a href="#story">Story</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">

          <p className="eyebrow">
            YOUR DIGITAL JOURNEY
          </p>

          <h1>
            Your moments.
            <br />
            Your patterns.
            <br />
            <span>Your story.</span>
          </h1>

          <p className="hero-text">
            Explore the traces of your digital life
            and discover connections hiding inside
            your everyday moments.
          </p>

          <a
            href="#explore"
            className="hero-button"
          >
            Explore my receipts →
          </a>

        </div>
      </section>

      {/* STATS */}
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

      {/* EXPLORE */}
      <section
        id="explore"
        className="section"
      >

        <div className="section-heading">

          <p className="eyebrow">
            EXPLORE
          </p>

          <h2>
            Your digital receipts
          </h2>

          <p>
            Search and filter your moments
            to find meaningful patterns.
          </p>

        </div>

        <div className="filters">

          <input
            type="text"
            placeholder="Search your receipts..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >
            <option value="All">
              All Categories
            </option>

            <option value="Music">
              Music
            </option>

            <option value="Purchase">
              Purchase
            </option>
          </select>

          <select
            value={source}
            onChange={(e) =>
              setSource(e.target.value)
            }
          >
            {sources.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>

        </div>

        <p className="result-count">
  Showing {filteredReceipts.length} moments from your journey
</p>
        <div className="receipt-grid">

          {filteredReceipts.map((item) => (

            <article
              className="receipt-card"
              key={item.id}
            >

              <div className="receipt-top">

                <span className="receipt-icon">
                  {item.icon || "✦"}
                </span>

                <span className="receipt-type">
                  {item.type}
                </span>

              </div>

              <h3>
                {item.title}
              </h3>

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

      {/* CONNECTIONS */}
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

  <div className="connection-card">
    <div className="big-icon">🎵</div>

    <h3>Music</h3>

    <p>
      {musicCount} music moments
      captured in your journey.
    </p>
  </div>


  <div className="connection-line">
    →
  </div>


  <div className="connection-card">
    <div className="big-icon">🛍️</div>

    <h3>Purchases</h3>

    <p>
      {purchaseCount} transaction moments
      found in your data.
    </p>
  </div>


  <div className="connection-line">
    →
  </div>


  <div className="connection-card">
    <div className="big-icon">🇮🇳</div>

    <h3>India Transactions</h3>

    <p>
      {indiaCount} transaction moments
      found in the India dataset.
    </p>
  </div>


  <div className="connection-line">
    →
  </div>


  <div className="connection-card">
    <div className="big-icon">✨</div>

    <h3>Story</h3>

    <p>
      Together these moments create a picture
      of your digital journey.
    </p>
  </div>

</div>

      </section>

      {/* INSIGHTS */}
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
      {/* TIMELINE */}
<section className="section timeline">

  <div className="section-heading">
    <p className="eyebrow">DIGITAL JOURNEY</p>
    <h2>Your journey at a glance</h2>
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
{/* DATA SNAPSHOT */}

<section className="section">
  <div className="section-heading">
    <p className="eyebrow">DATA SNAPSHOT</p>
    <h2>Your activity across sources</h2>
  </div>

  <div className="bar-chart">

    <div className="bar-row">
      <span>🎵 Music</span>
      <div className="bar-track">
        <div
          className="bar-fill"
          style={{ width: `${(musicCount / maxCount) * 100}%` }}
        ></div>
      </div>
      <strong>{musicCount}</strong>
    </div>

    <div className="bar-row">
      <span>🛒 Household</span>
      <div className="bar-track">
        <div
          className="bar-fill"
          style={{ width: `${(householdCount / maxCount) * 100}%` }}
        ></div>
      </div>
      <strong>{householdCount}</strong>
    </div>

    <div className="bar-row">
      <span>🇮🇳 India</span>
      <div className="bar-track">
        <div
          className="bar-fill"
          style={{ width: `${(indiaCount / maxCount) * 100}%` }}
        ></div>
      </div>
      <strong>{indiaCount}</strong>
    </div>

  </div>
</section>
      {/* STORY */}
      <section
        id="story"
        className="story-section"
      >

        <p className="eyebrow">
          YOUR STORY
        </p>

        <h2>
          Small moments.
          <br />
          One digital story.
        </h2>

        <p>
          LifeLens transforms scattered digital
          receipts into an interactive experience
          where moments, patterns and connections
          become easier to understand.
        </p>

        <a
          href="#explore"
          className="hero-button"
        >
          Explore again →
        </a>

      </section>

      {/* FOOTER */}
      <footer>
        <strong>LifeLens</strong>
        <span>
          Turning data into stories.
        </span>
      </footer>

    </div>
  );
}

export default App;