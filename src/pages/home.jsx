import CoinCard from "../components/CoinCard";
import LimitSelector from "../components/LimitSelector";
import FilterInput from "../components/FilterInput";
import SortSelector from "../components/SortSelector";
import Spinner from "../components/Spinner";

const HomePage = ({
  coins,
  loading,
  error,
  limit,
  setLimit,
  filter,
  setFilter,
  sortBy,
  setSortBy,
}) => {
  // ------------------------ FILTER + SORT DATA -------------------------------------------------

  // Start with the full coins array
  // 1️⃣ FILTER → Keep only the coins that match the search input
  // 2️⃣ SORT → Then reorder those filtered coins based on the selected sort option

  const filteredCoins = coins
    // 1️⃣ Filter coins by name or symbol (case-insensitive)
    .filter((coin) => {
      return (
        coin.name.toLowerCase().includes(filter.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(filter.toLowerCase())
      );
    })

    // 2️⃣ Create a shallow copy of the filtered array before sorting
    // This avoids modifying the original 'coins' array directly
    .slice()

    // 3️⃣ Sort the filtered coins depending on the user's selected option (sortBy)
    .sort((a, b) => {
      switch (sortBy) {
        // Sort by market cap: highest to lowest
        case "market_cap_desc":
          return b.market_cap - a.market_cap;

        // Sort by market cap: lowest to highest
        case "market_cap_asc":
          return a.market_cap - b.market_cap;

        // Sort by price: highest to lowest
        case "price_desc":
          return b.current_price - a.current_price;

        // Sort by price: lowest to highest
        case "price_asc":
          return a.current_price - b.current_price;

        // Sort by 24h price change: biggest gainers first
        case "change_desc":
          return b.price_change_percentage_24h - a.price_change_percentage_24h;

        // Sort by 24h price change: biggest losers first
        case "change_asc":
          return a.price_change_percentage_24h - b.price_change_percentage_24h;
      }
    });
  return (
    <div>
      {/* App title */}
      <h1>🚀 Crypto Dash</h1>

      {/* Show the Spinner component while data is being fetched
    This replaces the plain "Loading..." text with a visual loading animation */}
      {loading && <Spinner color="white" />}

      {/* If an error occurs during the fetch, display it to the user */}
      {error && <div className="error">{error}</div>}

      {/* --- Top Controls: Filter + Limit --- */}
      <div className="top-controls">
        {/* FilterInput: allows the user to type a coin name or symbol */}
        {/* "filter" stores the current text, and "setFilter" updates it on each keystroke */}
        <FilterInput filter={filter} onFilterChange={setFilter} />

        {/* LimitSelector: lets the user choose how many coins to display */}
        {/* "limit" is the current selected number, and "setLimit" updates it when changed */}
        <LimitSelector limit={limit} onLimitChange={setLimit} />

        <SortSelector sortBy={sortBy} onSortChange={setSortBy} />
      </div>

      {/* --- Main Content: Coin Grid --- */}
      {/* Only render the grid when there’s no loading and no error */}
      {!loading && !error && (
        <main className="grid">
          {/* If there are filtered coins, display them */}
          {/* If the filter finds nothing, show a message instead */}
          {filteredCoins.length > 0 ? (
            filteredCoins.map((coin) => (
              // Render one CoinCard per coin
              // "key" helps React efficiently track each card in the list
              <CoinCard key={coin.id} coin={coin} />
            ))
          ) : (
            // Message shown when no coins match the filter
            <p>No matching coins</p>
          )}
        </main>
      )}
    </div>
  );
};

export default HomePage;
