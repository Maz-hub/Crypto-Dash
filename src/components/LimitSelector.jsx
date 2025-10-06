// A small UI component that lets the user choose how many coins to display
// Receives the current limit value and a function to update it (from App.jsx)

const LimitSelector = ({ limit, onLimitChange }) => {
  return (
    // Wrapper for the dropdown and label
    <div className="controls">
      {/* Label connected to the select via the "htmlFor" and "id" attributes */}
      <label htmlFor="limit">Show:</label>

      {/* Dropdown menu with fixed options for how many results to show */}
      <select
        value={limit} // Controlled by React state from parent
        id="limit"
        onChange={(e) => onLimitChange(Number(e.target.value))}
        // When the user picks a new number:
        // - Convert the value from string to number
        // - Call the onLimitChange function (from parent) to update the state
      >
        {/* Available options the user can choose from */}
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  );
};

// Export the component so it can be used in App.jsx
export default LimitSelector;
