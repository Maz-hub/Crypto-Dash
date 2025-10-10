// CoinChart.jsx
// --------------------------------------------------------------
// Displays a 7-day line chart of a cryptocurrency’s price using Chart.js
// Fetches price data dynamically from the CoinGecko API and visualizes it
// --------------------------------------------------------------

import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2"; // React wrapper component for Chart.js

// Import specific Chart.js modules that we'll need for the line chart
import {
  Chart as ChartJS,
  CategoryScale, // X-axis for categories (like time)
  LinearScale, // Y-axis for numerical values
  PointElement, // Points on the line
  LineElement, // The line itself
  Tooltip, // Hover info box
  Legend, // Chart legend
  TimeScale, // X-axis that supports dates/times
} from "chart.js";

// Adapter to make Chart.js understand date objects (from date-fns)
import "chartjs-adapter-date-fns";

// Register the imported modules with Chart.js (mandatory step before using them)
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale
);

// Base URL for single coin data, stored in the .env file
const API_URL = import.meta.env.VITE_COIN_API_URL;

// Component receives "coinId" as a prop from the CoinDetailsPage
// Example: coinId = "bitcoin"
const CoinChart = ({ coinId }) => {
  // Store the chart data formatted for Chart.js
  const [chartData, setChartData] = useState(null);

  // Track whether data is still loading
  const [loading, setLoading] = useState(true);

  // ------------------------ FETCH PRICE DATA ------------------------
  useEffect(() => {
    const fetchPrices = async () => {
      // Fetch 7 days of market data for the selected coin (USD prices)
      const res = await fetch(
        `${API_URL}/${coinId}/market_chart?vs_currency=usd&days=7`
      );

      const data = await res.json();
      // console.log(data); // Inspect API response structure if needed

      // Extract and format prices as (x, y) pairs for Chart.js
      // Each price = [timestamp, value]
      const prices = data.prices.map((price) => ({
        x: price[0], // timestamp (used as X-axis)
        y: price[1], // price value (used as Y-axis)
      }));

      // console.log(prices);

      // Prepare Chart.js data object
      // datasets = array of series (lines) on the chart
      setChartData({
        datasets: [
          {
            label: "Price (USD)", // Chart label
            data: prices, // The formatted data points
            fill: true, // Fill area under the line
            borderColor: "#007bff", // Line color (blue)
            backgroundColor: "rgba(0, 123, 255, 0.1)", // Transparent fill
            pointRadius: 0, // Remove point dots
            tension: 0.3, // Smoothness of the curve
          },
        ],
      });

      // Once data is ready, stop showing the loader
      setLoading(false);
    };

    // Call the async function
    fetchPrices();
  }, [coinId]); // Re-run if a new coinId is passed in (user navigates to another coin)

  // ------------------------ RENDER UI ------------------------
  return (
    <>
      {/* Later, replace "Chart" with the actual Line component */}
      {/* Example: <Line data={chartData} options={options} /> */}
      <>Chart</>
    </>
  );
};

export default CoinChart;
