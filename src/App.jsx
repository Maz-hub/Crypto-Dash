import { useState, useEffect } from "react";
import CoinCard from "./components/CoinCard";

// Base URL of the CoinGecko API endpoint we're using
// This specific endpoint returns data for multiple coins (prices, market cap, etc.)
// Query parameters that tell the API exactly what kind of data we want
// ? → starts the list of parameters
// vs_currency=usd → prices will be shown in US dollars
// order=market_cap_desc → sorts coins by largest market cap first
// per_page=10 → limits the results to 10 coins per page
// page=1 → requests the first page of results
// sparkline=false → disables mini line charts in the response

// ✅ Load the API base URL from the .env file
// This value comes from the variable called VITE_API_URL in your .env file
// Using import.meta.env keeps your code clean and makes the URL easy to change later
const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  // List of all coins fetched from the CoinGecko API
  // Will be updated each time the API request succeeds
  const [coins, setCoins] = useState([]);

  // Used to show a loading spinner or message while data is being fetched
  // Starts as true because we load data as soon as the app starts
  const [loading, setLoading] = useState(true);

  // Stores any error message if the API request fails
  // Helps show a user-friendly error instead of breaking the app
  const [error, setError] = useState(null);

  const [limit, setLimit] = useState(10);

  // ------------------------ FETCH DATA -------------------------------------------------

  // useEffect runs once when the component mounts (empty [] dependency array)
  // This is where we fetch live data from the CoinGecko API
  useEffect(() => {
    // Define an async function because useEffect itself can't be async
    const fetchCoins = async () => {
      try {
        // Make a GET request to the API endpoint
        // ✅ Fetch request to the CoinGecko API
        // Here we combine the base URL from the .env file with extra query parameters
        // (order, per_page, page, sparkline) to control what data we get
        const res = await fetch(
          `${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
        );

        // If the response is not OK (status not 200–299), throw an error
        if (!res.ok) throw new Error("Failed to fetch data");

        // Convert the response into a JavaScript object
        const data = await res.json();

        // For now, log the data in the console to inspect the structure
        console.log(data);

        // Store the data in state so we can render it later
        setCoins(data);
      } catch (err) {
        // If any error happens (e.g., network issue, wrong URL),
        // save the message to state so it can be shown in the UI
        setError(err.message);
      } finally {
        // Whether success or error, stop showing the loading spinner
        setLoading(false);
      }
    };

    // Call the async function
    fetchCoins();
  }, [limit]); // ← Empty dependency array = run only once when component mounts

  return (
    <>
      <div>
        {/* App title */}
        <h1>🚀 Crypo Dash</h1>
        {/* Show a loading message while the data is being fetched */}
        {loading && <p>Loading...</p>}
        {/* If an error occurs during the fetch, display it to the user */}
        {error && <div className="error">{error}</div>}

        <div className="controls">
          <label htmlFor="limit">Show:</label>
          <select
            value={limit}
            id="limit"
            onChange={(e) => setLimit(Number(e.target.value))}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>

        {/* Once data is loaded successfully (no loading, no error), display the coin list */}
        {!loading && !error && (
          <main className="grid">
            {/* Loop through the coins array and render one CoinCard per coin */}
            {/* The "key" helps React identify each card efficiently */}
            {coins.map((coin) => (
              <CoinCard key={coin.id} coin={coin} />
            ))}
          </main>
        )}
      </div>
    </>
  );
};

export default App;
