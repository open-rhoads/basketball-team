// 
// async function getTeams() {
//   const url = 'https://api-basketball.p.rapidapi.com/teams?league=12&season=2019-2020';
//   const options = {
//     method: 'GET',
//     headers: {
//       'x-rapidapi-key': 'a33729b243msh3367725453e5651p11658bjsn585d27304cd6',
//       'x-rapidapi-host': 'api-basketball.p.rapidapi.com'
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

async function fetchTeamStats() {
  const teamId = 133; // Boston Celtics - sample team data
  const league = 12; // NBA
  const season = '2019-2020';

  const url = 'https://api-basketball.p.rapidapi.com/statistics?season=2019-2020&league=12&team=133';
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'a33729b243msh3367725453e5651p11658bjsn585d27304cd6',
      'x-rapidapi-host': 'api-basketball.p.rapidapi.com'
    }
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    return result.response;
  } catch (error) {
    console.error(error);
  }
}

function buildStatsTable(data) {
  const table = document.getElementById("playerStats");
  const thead = table.querySelector("thead");
  const tbody = table.querySelector("tbody");

  // Clear existing content
  thead.innerHTML = "";
  tbody.innerHTML = "";

  // Create header row
  const headerRow = document.createElement("tr");
  headerRow.innerHTML = `<th>Statistic</th><th>Value</th>`;
  thead.appendChild(headerRow);

  // Define sections
  const sections = {
    "Games": {
      "Games Played": data.games.played.all,
      "Wins": data.games.wins.all.total,
      "Win %": (data.games.wins.all.percentage * 100).toFixed(2),
      "Losses": data.games.loses.all.total,
      "Loss %": (data.games.loses.all.percentage * 100).toFixed(2),
      "Draws": data.games.draws.all.total,
      "Draw %": (data.games.draws.all.percentage * 100).toFixed(2)
    },
    "Points": {
      "Points For (Total)": data.points.for.total.all,
      "Points For (Avg)": data.points.for.average.all,
      "Points Against (Total)": data.points.against.total.all,
      "Points Against (Avg)": data.points.against.average.all
    }
  };

  // Populate table rows by section
  for (const [section, stats] of Object.entries(sections)) {
    const sectionRow = document.createElement("tr");
    sectionRow.innerHTML = `<th colspan="2" class="section-header">${section}</th>`;
    tbody.appendChild(sectionRow);

    for (const [label, value] of Object.entries(stats)) {
      const row = document.createElement("tr");
      row.innerHTML = `<th class="label-cell">${label}</th><td>${value}</td>`;
      tbody.appendChild(row);
    }
  }
}

async function init() {
  
  const loading = document.getElementById("loading");
  const table = document.getElementById("playerStats");

  // Show loading, hide table
  loading.style.display = "block";
  table.style.display = "none";

  const data = await fetchTeamStats();
  if (!data) {
    console.error("No data returned from API.");
    return;
  }
  if (data) {
    // Show loading, hide table
    loading.style.display = "none";
    table.style.display = "block";
    buildStatsTable(data);
  } else {
    console.error("Failed to load team stats.");
  }
}

init();