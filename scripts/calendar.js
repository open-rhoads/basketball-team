// dynamic calendar - grab elements and create a Date object

const calendarBody = document.getElementById('calendarBody');
const monthYear = document.getElementById('monthYear');
let currentDate = new Date();
let gameData = []; // this will hold all fetched games

// async function fetchTeams() { // you can use this to return all the teams, if needed
//   const url = 'https://wnba-api.p.rapidapi.com/wnbateamlist';
//   const options = {
//     method: 'GET',
//     headers: {
//       'x-rapidapi-key': 'a33729b243msh3367725453e5651p11658bjsn585d27304cd6',
//       'x-rapidapi-host': 'wnba-api.p.rapidapi.com'
//     }
//   };

//   try {
//     const response = await fetch(url, options);
//     const result = await response.text();
//     console.log(result);
//   } catch (error) {
//     console.error(error);
//   }
// }
async function fetchGameData() {
  const url = 'https://wnba-api.p.rapidapi.com/schedule-team?season=2025&teamId=14';
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'a33729b243msh3367725453e5651p11658bjsn585d27304cd6',
      'x-rapidapi-host': 'wnba-api.p.rapidapi.com'
    }
  };
  try { // come back to this in a month, and know this API has some limits...
    //const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    return result.events;
  } catch (e) {
    console.error(e);
  }
}

async function generateCalendar(date) {
  calendarBody.innerHTML = '';
  const year = date.getFullYear(); // get the current full year
  const month = date.getMonth(); // get the current month (0-11)
  const firstDay = new Date(year, month, 1).getDay(); // returns the day of week (0-6) for the first day of the given month/year
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // this returns the last day of the month...0 must access the month before...
  gameData = await fetchGameData(); // store the data globally
  console.log(gameData);
  
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

    // check for games on each day
    const cellDate = new Date(year, month, day).toISOString().split('T')[0]; // format: YYYY-MM-DD
    console.log(cellDate);
    const gamesToday = gameData.filter(game => game.date.startsWith(cellDate)); // filter data for games where date matches the current cell
    
    if (gamesToday.length > 0) {
      const gameList = document.createElement('ul');
      gamesToday.forEach(game => { // may not need this, but nice to have if there were ever multiple games...
        const item = document.createElement('li');
        item.textContent = game.shortName;
        gameList.appendChild(item);
      });
      cell.appendChild(gameList);
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
  //calendarBody.appendChild(row); // so why is the row appended again here...
}

// this function is attached to the onclick event for the nav buttons 
// and uses an offset of 1 or -1 to alter the current month and re-generate the calendar
function changeMonth(offset) {
  currentDate.setMonth(currentDate.getMonth() + offset);
  generateCalendar(currentDate);
}

async function init() {
  //fetchTeams();
  const loading = document.getElementById("loading");
  const calendar = document.getElementById("calendarBody");

  // Show loading, hide table
  loading.style.display = "block";
  table.style.display = "none";

  const data = await fetchGameData();
  if (!data) {
    console.error("No data returned from API.");
    return;
  }
  if (data) {
    // Show loading, hide table
    loading.style.display = "none";
    table.style.display = "block";
    generateCalendar(currentDate); // initial generation of calendar, passing currentDate
  } else {
    console.error("Failed to load game data.");
  }
}

init();