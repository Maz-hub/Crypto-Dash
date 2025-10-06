// A reusable input component for filtering coins by name or symbol
// Receives "filter" (current text value) and "onFilterChange" (function to update it) as props

const FilterInput = ({ filter, onFilterChange }) => {
  return (
    <div className="filter">
      {/* Text input controlled by React state */}
      <input
        type="text"
        value={filter} // The input displays whatever is stored in "filter"
        placeholder="Filter coins by name or symbol" // Helpful hint for the user
        onChange={(e) => {
          // When the user types, send the new value back up to the parent (App.jsx)
          onFilterChange(e.target.value);
        }}
      />
    </div>
  );
};

// Export the component so it can be imported and used in App.jsx
export default FilterInput;
