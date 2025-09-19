// Static weather data for Nigeria
const temperature = 28; // Celsius (typical for Nigeria)
const windSpeed = 3; // km/h

// Function to calculate wind chill (Metric formula)
function calculateWindChill(temp, wind) {
  // Wind chill formula for Celsius and km/h
  return (
    13.12 +
    0.6215 * temp -
    11.37 * Math.pow(wind, 0.16) +
    0.3965 * temp * Math.pow(wind, 0.16)
  );
}

// Function to determine if wind chill calculation is viable
function isViableWindChill(temp, wind) {
  // Conditions for viable wind chill calculation (Metric)
  // Temperature <= 10°C and Wind speed > 4.8 km/h
  return temp <= 10 && wind > 4.8;
}

// Function to display wind chill
function displayWindChill() {
  const windChillElement = document.getElementById("windchill");

  if (isViableWindChill(temperature, windSpeed)) {
    const windChill = calculateWindChill(temperature, windSpeed);
    windChillElement.textContent = `${windChill.toFixed(1)} °C`;
  } else {
    windChillElement.textContent = "N/A";
  }
}

// Function to update footer with current year and last modified date
function updateFooter() {
  const currentYearElement = document.getElementById("currentyear");
  const lastModifiedElement = document.getElementById("lastModified");

  // Set current year
  const currentYear = new Date().getFullYear();
  currentYearElement.textContent = currentYear;

  // Set last modified date
  const lastModified = document.lastModified;
  lastModifiedElement.textContent = lastModified;
}

// Initialize page when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  displayWindChill();
  updateFooter();
});
