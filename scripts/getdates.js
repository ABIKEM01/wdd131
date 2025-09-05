// Get current year and populate the copyright year span
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

// Get last modified date and populate the lastModified paragraph
document.getElementById("lastModified").textContent =
  "Last Modification: " + document.lastModified;
