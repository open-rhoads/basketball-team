function activeButton() { // this function adds/removes the active class depending on current window
  document.addEventListener('DOMContentLoaded', function() {
    // Get the current window location path
    const currentPath = window.location.pathname;

    // Select all buttons in the navigation panel
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        // Create an anchor element to parse the button's href
        const buttonPath = new URL(button.href, window.location.origin).pathname;

        // Normalize paths to handle both .htm and .html extensions
        const normalizedCurrentPath = currentPath.replace(/\.html?$/, '');
        const normalizedButtonPath = buttonPath.replace(/\.html?$/, '');

        // Check if the normalized paths match
        if (normalizedButtonPath === normalizedCurrentPath) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
  });

}

// dynamic calendar - grab elements and create a Date object

const calendarBody = document.getElementById('calendarBody');
const monthYear = document.getElementById('monthYear');
let currentDate = new Date();

function generateCalendar(date) {
  calendarBody.innerHTML = '';
  const year = date.getFullYear(); // get the current full year
  const month = date.getMonth(); // get the current month (0-11)
  const firstDay = new Date(year, month, 1).getDay(); // returns the day of week (0-6) for the first day of the given month/year
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // this returns the last day of the month...0 must access the month before...

  // display the month and year of the date passed as param
  monthYear.textContent = date.toLocaleString('default', { month: 'long', year: 'numeric' });

  let row = document.createElement('tr'); // create a table row

  for (let i = 0; i < firstDay; i++) { // create td cells for each day before the first day... this seems like it should be better
    const emptyCell = document.createElement('td');
    row.appendChild(emptyCell);
  }

  for (let day = 1; day <= daysInMonth; day++) { // loop through each day of the month
    const cell = document.createElement('td'); // create a td for each day and put the day value in
    cell.textContent = day;

    // this will add the 'today' class for the current date
    const today = new Date(); 
    if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
      cell.classList.add('today');
    }

    row.appendChild(cell); // append every cell in the calendar

    // If the row is full, append it and start a new one
    if ((firstDay + day) % 7 === 0) {
      calendarBody.appendChild(row);
      row = document.createElement('tr');
    }
    
    // Append the last row if it has any remaining cells
    if (row.children.length > 0) {
      calendarBody.appendChild(row);
    }
  }

  calendarBody.appendChild(row); // so why is the row appended again here...
}

// this function is attached to the onclick event for the nav buttons 
// and uses an offset of 1 or -1 to alter the current month and re-generate the calendar
function changeMonth(offset) {
  currentDate.setMonth(currentDate.getMonth() + offset);
  generateCalendar(currentDate);
}

generateCalendar(currentDate); // initial generation of calendar, passing currentDate

function init() {
  activeButton();
}

init();