import Papa from "papaparse";
import { useEffect, useMemo, useState } from "react";

import receipts from "./data/receipts";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Explore from "./components/Explore";
import Connections from "./components/Connections";
import Insights from "./components/Insights";
import Timeline from "./components/Timeline";
import DataSnapshot from "./components/DataSnapshot";
import Story from "./components/Story";

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
      },
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
      },
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
      },
    });
  }, []);

  // Spotify data
  const spotifyReceipts = useMemo(() => {
    return spotifyData.map((row, index) => {
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
        tags: ["music", "spotify"],
      };
    });
  }, [spotifyData]);

  // Household data
  const householdReceipts = useMemo(() => {
    return householdData.map((row, index) => ({
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
      tags: ["purchase", "household"],
    }));
  }, [householdData]);

  // India data
  const indiaReceipts = useMemo(() => {
    return indiaData.map((row, index) => ({
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
      tags: ["purchase", "india"],
    }));
  }, [indiaData]);

  // Combine all data
  const allReceipts = useMemo(() => {
    return [
      ...spotifyReceipts,
      ...householdReceipts,
      ...indiaReceipts,
      ...receipts,
    ];
  }, [
    spotifyReceipts,
    householdReceipts,
    indiaReceipts,
  ]);

  // Dynamic source list
  const sources = useMemo(() => {
    return [
      "All",
      ...new Set(
        allReceipts.map((item) => item.source)
      ),
    ];
  }, [allReceipts]);

  // Search and filter
  const filteredReceipts = useMemo(() => {
  const searchText = search.trim().toLowerCase();

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
        searchText === "" || text.includes(searchText);

      const matchesCategory =
        category === "All" || item.type === category;

      const matchesSource =
        source === "All" || item.source === source;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesSource
      );
    })
    .slice(0, 60);
}, [
  allReceipts,
  search,
  category,
  source,
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

  const artistCount = useMemo(() => {
    return new Set(
      spotifyData
        .map((item) => item.artist_name)
        .filter(Boolean)
    ).size;
  }, [spotifyData]);

  const indiaCount = indiaData.length;

  const householdCount = householdData.length;

  const totalReceipts =
    spotifyData.length +
    householdData.length +
    indiaData.length +
    receipts.length;

  const maxCount = Math.max(
    musicCount,
    householdCount,
    indiaCount,
    1
  );

  return (
    <div className="app">
      <Navbar />

      <Hero />

      <Stats
        totalReceipts={totalReceipts}
        musicCount={musicCount}
        purchaseCount={purchaseCount}
        artistCount={artistCount}
        householdCount={householdCount}
        indiaCount={indiaCount}
      />

      <Explore
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        source={source}
        setSource={setSource}
        sources={sources}
        filteredReceipts={filteredReceipts}
      />

      <Connections
        musicCount={musicCount}
        purchaseCount={purchaseCount}
        indiaCount={indiaCount}
      />

      <Insights
        musicCount={musicCount}
        householdCount={householdCount}
        indiaCount={indiaCount}
      />

      <Timeline
        musicCount={musicCount}
        householdCount={householdCount}
        indiaCount={indiaCount}
      />

      <DataSnapshot
        musicCount={musicCount}
        householdCount={householdCount}
        indiaCount={indiaCount}
        maxCount={maxCount}
      />

      <Story />

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