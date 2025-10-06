// A dropdown component that lets the user choose how to sort the coin list
// Receives two props from the parent (App.jsx):
// - "sortBy" → the current selected sort option
// - "onSortChange" → function that updates the sort order when the user changes it

const SortSelector = ({ sortBy, onSortChange }) => {
  return (
    <div className="controls">
      {/* Label connected to the select menu for accessibility */}
      <label htmlFor="sort">Sort By:</label>

      {/* Dropdown menu with all available sort options */}
      <select
        value={sortBy} // Controlled value: reflects current state
        id="sort"
        onChange={(e) => onSortChange(e.target.value)}
        // When the user selects a new option, call the parent’s function to update state
      >
        {/* Each option matches one of CoinGecko's valid sort parameters */}
        <option value="market_cap_desc">Market Cap (High To Low)</option>
        <option value="market_cap_asc">Market Cap (Low To High)</option>
        <option value="price_desc">Price (High To Low)</option>
        <option value="price_asc">Price (Low To High)</option>
        <option value="change_desc">24h Change (High To Low)</option>
        <option value="change_asc">24h Change (Low To High)</option>
      </select>
    </div>
  );
};

// Export so the component can be used in App.jsx
export default SortSelector;
