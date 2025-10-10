// CoinDetailsPage.jsx
// --------------------------------------------------------------
// Displays detailed information for a single cryptocurrency.
// Fetches coin data dynamically using the coin's ID from the URL.
// --------------------------------------------------------------

import { useState, useEffect } from "react";
import { useParams } from "react-router"; // React Router hook for reading the coin ID from the URL
import { Link } from "react-router"; // Used to navigate back to the home page

// Base URL for the single-coin endpoint, stored in the .env file
const API_URL = import.meta.env.VITE_COIN_API_URL;

const CoinDetailsPage = () => {
  // Extract the dynamic "id" parameter from the route (e.g., /coins/bitcoin)
  const { id } = useParams();

  // ------------------------ STATE MANAGEMENT ------------------------
  // Store the fetched coin data
  const [coin, setCoin] = useState(null);

  // Track loading and error states for clean user feedback
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ------------------------ FETCH COIN DETAILS ------------------------
  useEffect(() => {
    // Async function to fetch the coin details from the API
    const fetchCoin = async () => {
      try {
        // Make a GET request using the coin ID from the URL
        const res = await fetch(`${API_URL}/${id}`);

        // If the request fails (status not 200–299), throw an error
        if (!res.ok) throw new Error("Failed to fetch coin");

        // Convert the JSON response into a JavaScript object
        const data = await res.json();

        // Save the fetched coin data in state
        setCoin(data);
      } catch (err) {
        // Store the error message and log it to the console
        setError(err.message);
        console.log(err);
      } finally {
        // Stop the loading state whether success or error
        setLoading(false);
      }
    };

    // Call the async fetch function
    fetchCoin();
  }, [id]); // Depend on "id" so the data reloads when the user visits another coin page

  // ------------------------ RENDER UI ------------------------
  return (
    <div className="coin-details-container">
      {/* Navigation link to go back to the main page */}
      <Link to="/">← Go Back Home</Link>

      {/* Page title — show coin name and symbol when loaded */}
      <h1 className="coin-details-title">
        {coin ? `${coin.name} (${coin.symbol.toUpperCase()})` : "Coin Details"}
      </h1>

      {/* Conditional messages for loading and error states */}
      {loading && <p>Loading...</p>}
      {error && <div className="error">❌ {error}</div>}

      {/* Show the detailed data only when loading and error are resolved */}
      {!loading && !error && coin && (
        <>
          {/* Coin image and short description */}
          <img
            src={coin.image.large}
            alt={coin.name}
            className="coin-details-image"
          />

          {/* Display the first sentence from the English description */}
          <p>{coin.description.en.split(".")[0] + "."}</p>

          {/* --------------- COIN INFORMATION SECTION --------------- */}
          <div className="coin-details-info">
            <h3>Rank: #{coin.market_cap_rank}</h3>
            <h3>
              Current Price: $
              {coin.market_data.current_price.usd.toLocaleString()}
            </h3>
            <h4>
              Market Cap: ${coin.market_data.market_cap.usd.toLocaleString()}
            </h4>
            <h4>24h High: ${coin.market_data.high_24h.usd.toLocaleString()}</h4>
            <h4>24h Low: ${coin.market_data.low_24h.usd.toLocaleString()}</h4>

            <h4>
              24h Price Change: ${coin.market_data.price_change_24h.toFixed(2)}{" "}
              ({coin.market_data.price_change_percentage_24h.toFixed(2)}%)
            </h4>

            <h4>
              Circulating Supply:{" "}
              {coin.market_data.circulating_supply?.toLocaleString() || "N/A"}
            </h4>
            <h4>
              Total Supply:{" "}
              {coin.market_data.total_supply?.toLocaleString() || "N/A"}
            </h4>

            <h4>
              All-Time High: ${coin.market_data.ath.usd.toLocaleString()} on{" "}
              {new Date(coin.market_data.ath_date.usd).toLocaleDateString()}
            </h4>
            <h4>
              All-Time Low: ${coin.market_data.atl.usd.toLocaleString()} on{" "}
              {new Date(coin.market_data.atl_date.usd).toLocaleDateString()}
            </h4>
            <h4>
              Last Updated: {new Date(coin.last_updated).toLocaleDateString()}
            </h4>
          </div>

          {/* --------------- LINKS SECTION --------------- */}
          <div className="coin-details_links">
            {/* Official website link (if available) */}
            {coin.links.homepage[0] && (
              <p>
                🌐{" "}
                <a
                  href={coin.links.homepage[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Website
                </a>
              </p>
            )}

            {/* Blockchain explorer link */}
            {coin.links.blockchain_site[0] && (
              <p>
                🧩{" "}
                <a
                  href={coin.links.blockchain_site[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Blockchain Explorer
                </a>
              </p>
            )}

            {/* Categories, if available */}
            {coin.categories.length > 0 && (
              <p>Categories: {coin.categories.join(", ")}</p>
            )}

            {/* Fallback message if no data is found */}
            {!loading && !error && !coin && <p>No Data Found!</p>}
          </div>
        </>
      )}
    </div>
  );
};

export default CoinDetailsPage;
