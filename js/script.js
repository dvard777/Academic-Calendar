const monthYearElement = document.getElementById("month-year");
const previousButton = document.getElementById("prev-month");
const nextButton = document.getElementById("next-month");
const container = document.querySelector(".container");

const months = ["January","February","March","April","May","June","July","August","September","October","November","December",];

// Start current date
let currentDate = new Date();
let messages = JSON.parse(localStorage.getItem("calendarMessages")) || {};

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
    
    const key = `${year}-${month + 1}-${day}`;
    if (messages[key]) {
      const message = document.createElement("div");
      message.textContent = messages[key];
      message.classList.add("message");
      dayBox.appendChild(message);
    }

    // Add hover effect
    dayBox.addEventListener("mouseenter", () => {
      dayBox.classList.add("hovered");
    });
    dayBox.addEventListener("mouseleave", () => {
      dayBox.classList.remove("hovered");
    });

    dayBox.addEventListener("click", () => {
      // prompt to leave your message
      const userInput = prompt("Enter your message:", messages[key] || ""); 
      // if user click no in prompt it will cancel
      if (userInput !== null) {
        // check is user entered empty string
        if (userInput.trim() === "") {
          delete messages[key];
        } else {
          messages[key] = userInput.trim();
        }
        // save to local storage
        localStorage.setItem("calendarMessages", JSON.stringify(messages));
        updateCalendar();
      }
    });

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
