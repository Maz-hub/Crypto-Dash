// Header.jsx
// --------------------------------------------------------------
// A simple navigation header component that appears on every page.
// Uses React Router <Link> elements for smooth client-side navigation
// without reloading the page.
// --------------------------------------------------------------

import { Link } from "react-router";

const Header = () => {
  return (
    <div className="top-nav">
      {/* Navigation link to the Home page */}
      <Link to="/">Home</Link>

      {/* Navigation link to the About page */}
      <Link to="/about">About</Link>
    </div>
  );
};

// Export the component so it can be imported and displayed in App.jsx
export default Header;
