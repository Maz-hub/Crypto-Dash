import { useState, useEffect } from "react";

// Base URL of the CoinGecko API endpoint we're using
// This specific endpoint returns data for multiple coins (prices, market cap, etc.)
// Query parameters that tell the API exactly what kind of data we want
// ? → starts the list of parameters
// vs_currency=usd → prices will be shown in US dollars
// order=market_cap_desc → sorts coins by largest market cap first
// per_page=10 → limits the results to 10 coins per page
// page=1 → requests the first page of results
// sparkline=false → disables mini line charts in the response
const API_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

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

// useEffect runs once when the component first mounts
// (empty dependency array [] means it won't run again unless the component reloads)
useEffect(() => {
  // Make a GET request to the CoinGecko API endpoint
  fetch(API_URL)
    .then((res) => {
      // Check if the response is successful (status code 200–299)
      // If not, throw an error to be caught below
      if (!res.ok) throw new Error("Failed to fetch data");
      // Convert the response body from JSON text into a JavaScript object
      return res.json();
    })
    .then((data) => {
      // Log the data in the console for debugging (optional during development)
      console.log(data);
      // Save the fetched coin data into state so it can be displayed
      setCoins(data);
      // Set loading to false once data is received
      setLoading(false);
    })
    .catch((err) => {
      // If anything goes wrong (network error, invalid URL, etc.)
      // store the error message in state so we can show it to the user
      setError(err.message);
      // Stop the loading state since the request has finished (even with an error)
      setLoading(false);
    });
}, []); // ← Empty array = run only once when the component loads


  return (
    <>
      <div>
        <h1>🚀 Crypo Dash</h1>
      </div>
    </>
  );
};

export default App;
