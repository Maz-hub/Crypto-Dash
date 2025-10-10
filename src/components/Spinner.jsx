// Spinner.jsx
// --------------------------------------------------------------
// A simple reusable loading spinner component.
// Uses the "BarLoader" from the react-spinners library to display
// a centered loading bar while data is being fetched.
// --------------------------------------------------------------

import { BarLoader } from "react-spinners";

// Inline CSS style override for centering the spinner on the page
const override = {
  display: "block",
  margin: "0 auto", // centers horizontally
};

// Spinner component
// Props:
// - color → allows customizing the spinner color (default: blue)
// - size → allows customizing the spinner size (default: 150)
// These can be changed when using the component (e.g. <Spinner color="red" />)
const Spinner = ({ color = "blue", size = "150" }) => {
  return (
    <div>
      {/* BarLoader shows a smooth animated loading bar */}
      <BarLoader
        color={color}            // spinner color
        size={size}              // spinner size
        cssOverride={override}   // apply the custom centering style
        aria-label="Loading..."  // accessible label for screen readers
      />
    </div>
  );
};

// Export component so it can be used in any page (e.g. when loading data)
export default Spinner;
