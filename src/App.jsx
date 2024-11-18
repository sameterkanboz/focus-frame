import { useState } from "react";

const App = () => {
  const [bordersAdded, setBordersAdded] = useState(false);

  // Toggle function to add or remove borders
  const toggleBorders = () => {
    // eslint-disable-next-line no-undef
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // eslint-disable-next-line no-undef
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: toggleBorderStyles,
        args: [!bordersAdded],
      });
    });

    // Update the state to reflect the current toggle status
    setBordersAdded(!bordersAdded);
  };

  return (
    <div style={styles.container}>
      <button
        onClick={toggleBorders}
        style={bordersAdded ? styles.buttonActive : styles.button}
      >
        {bordersAdded ? "Remove Borders" : "Add Borders"}
      </button>
    </div>
  );
};
function toggleBorderStyles(addBorders) {
  const elements = document.querySelectorAll(
    "header, nav, section, article, aside, footer, div, span"
  );
  const typographyElements = document.querySelectorAll(
    "h1, h2, h3, h4, h5, h6"
  );

  elements.forEach((element) => {
    element.style.border = addBorders ? "1px solid red" : "none";
  });
  typographyElements.forEach((element) => {
    element.style.border = addBorders ? "1px dashed red" : "none";
  });
}

// Inline styles for button
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#FFFFFF",
    backgroundColor: "#4CAF50", // Green for default
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  buttonActive: {
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#FFFFFF",
    backgroundColor: "#FF5722", // Orange for active
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default App;
