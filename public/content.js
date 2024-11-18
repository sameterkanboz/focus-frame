const addBorders = () => {
  const elements = document.querySelectorAll(
    "header, nav, section, article, aside, footer, div, span"
  );
  elements.forEach((element) => {
    element.style.border = "2px solid green";
  });
  const typographyElements = document.querySelectorAll(
    "h1, h2, h3, h4, h5, h6"
  );
  typographyElements.forEach((element) => {
    element.style.border = "2px solid green";
  });
};

addBorders();
