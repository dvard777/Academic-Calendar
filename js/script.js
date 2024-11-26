const monthYearElement = document.getElementById("month-year");
const previousButton = document.getElementById("prev-month");
const nextButton = document.getElementById("next-month");

const months = ["January","February","March","April","May","June","July","August","September","October","November","December",];

// Initialize current date
let currentDate = new Date();

// Function to update the month and year display
function updateMonthYear() {
  const month = months[currentDate.getMonth()];
  const year = currentDate.getFullYear();
  monthYearElement.textContent = `${month} ${year}`;
}

 // Event listeners for navigation
previousButton.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1); // Go to the previous month
  updateMonthYear();
});

nextButton.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1); // Go to the next month
  updateMonthYear();
});

// Initialize the display on page load
updateMonthYear();