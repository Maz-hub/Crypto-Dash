import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import Header from "./components/Header";

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

  // Store how many coins should be displayed on the page
  // Default value is 10 (so the app starts by showing 10 coins)
  // "limit" holds the current value
  // "setLimit" is the function used to update it when the user changes the dropdown
  const [limit, setLimit] = useState(10);

  // Store the current text entered by the user in the filter input
  // Default value is an empty string (no filter applied)
  // "filter" holds the current text
  // "setFilter" updates it whenever the user types in the input box
  const [filter, setFilter] = useState("");

  // Store the current sorting option chosen by the user
  // Default is 'market_cap_desc' (largest market cap first)
  // "sortBy" holds the selected value, and "setSortBy" updates it
  const [sortBy, setSortBy] = useState("market_cap_desc");

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
        // console.log(data);

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
    <Header />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              coins={coins}
              filter={filter}
              setFilter={setFilter}
              limit={limit}
              setLimit={setLimit}
              sortBy={sortBy}
              setSortBy={setSortBy}
              loading={loading}
              error={error}
            />
          }
        />
        <Route path="about" element={<AboutPage />}></Route>
      </Routes>
    </>
  );
};

export default App;
