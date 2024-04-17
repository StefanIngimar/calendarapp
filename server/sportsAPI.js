import https from 'https';
import dotenv from 'dotenv';

dotenv.config();

const SPORTS_API_BASE_URL = process.env.SPORTS;

function fetchAllSports() {
  const url = `https://${SPORTS_API_BASE_URL}/all_sports.php`;

  return new Promise((resolve, reject) => {
    https.get(url, response => {
      let data = '';

      response.on('data', chunk => {
        data += chunk;
      });

      response.on('end', () => {
        resolve(JSON.parse(data));
      });
    }).on('error', err => {
      reject(err);
    });
  });
}

function fetchNextEvents(leagueId) {
  const url = `https://${SPORTS_API_BASE_URL}/eventsnextleague.php?id=${leagueId}`;

  return new Promise((resolve, reject) => {
    https.get(url, response => {
      let data = '';

      response.on('data', chunk => {
        data += chunk;
      });

      response.on('end', () => {
        resolve(JSON.parse(data));
      });
    }).on('error', err => {
      reject(err);
    });
  });
}

export { fetchAllSports, fetchNextEvents };
