// NotFoundPage.jsx
// --------------------------------------------------------------
// Simple 404 page shown when the user visits a route that doesn't exist.
// Includes a message and a link to return back to the home page.
// --------------------------------------------------------------

import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div style={styles.container}>
      {/* Large 404 title to clearly indicate the error */}
      <h1 style={styles.title}>404</h1>

      {/* Short user-friendly message explaining the issue */}
      <p style={styles.message}>
        Oops! The page you're looking for does not exist
      </p>

      {/* Link to navigate back to the home page */}
      <Link to="/" style={styles.link}>
        ← Go Back Home
      </Link>
    </div>
  );
};

// Inline CSS styles for the 404 page elements
// Keeps the page simple and self-contained without external CSS
const styles = {
  container: {
    textAlign: "center", // Center all content horizontally
    padding: "80px 20px", // Add space around content
    color: "#fff", // White text for dark backgrounds
  },
  title: {
    fontSize: "72px", // Big "404" headline
    marginBottom: "20px", // Space below the title
  },
  message: {
    fontSize: "18px", // Readable message size
    marginBottom: "30px", // Space before the link
  },
  link: {
    textDecoration: "none", // Remove underline from link
    color: "#007bff", // Light blue link color
    fontWeight: "bold", // Make the link stand out
  },
};

export default NotFoundPage;
