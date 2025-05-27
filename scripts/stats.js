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
  const season = 2019-2020;

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
    console.log(result.response.games);
    const games = result.response.games;
    return games;
  } catch (error) {
    console.error(error);
  }
}

function init() {
  //getTeams();
  fetchTeamStats();
}

init();