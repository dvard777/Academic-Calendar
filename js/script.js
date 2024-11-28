const monthYearElement = document.getElementById("month-year");
const previousButton = document.getElementById("prev-month");
const nextButton = document.getElementById("next-month");
const container = document.querySelector(".container");

const months = ["January","February","March","April","May","June","July","August","September","October","November","December",];

// Start current date
let currentDate = new Date();

// Get number of days in the month
function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
// Update the calender
function updateCalendar() {

  // Make sures when clicking to the next month it doesn't keep numbers displayed
  container.innerHTML = "";

  //Get the current month and year
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  //Updates our header
  monthYearElement.textContent = `${months[month]} ${year}`;

  //Get the number of days in the month and the weekday it starts off with
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = new Date(year, month, 1).getDay();

    // Add empty boxes for the days before the 1st
  for (let i = 0; i < firstDay; i++) {
    const emptyBox = document.createElement("div");
    emptyBox.classList.add("box");
    container.appendChild(emptyBox);
  }

    //Add boxes for each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayBox = document.createElement("div");
    dayBox.classList.add("box");
    dayBox.textContent = day;
    container.appendChild(dayBox);
  }
}
  
// Lets us go to previous month with click
previousButton.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  updateCalendar();
});

//Lets us go to next month with click
nextButton.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  updateCalendar();
});

// Loads our calender page
updateCalendar();
