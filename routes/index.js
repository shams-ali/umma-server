const express = require('express');

const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

const { google } = require('googleapis');
let { CLIENT_EMAIL, PRIVATE_KEY } = process.env;

PRIVATE_KEY = PRIVATE_KEY.replace(new RegExp('\\\\n', 'g'), '\n');

/* GET data from Google Sheets API */
router.get('/umma-server/getData', (req, res) => {
  const client = new google.auth.JWT(CLIENT_EMAIL, null, PRIVATE_KEY, [
    'https://www.googleapis.com/auth/spreadsheets.readonly'
  ]);

  async function gsGet(clientAuth) {
    const gsApi = google.sheets({
      version: 'v4',
      auth: clientAuth
    });

    const options = {
      spreadsheetId: '1JWYHiOightRfEg3qFrDniItyYII5fgXdi99m11mgSH0',
      ranges: ['Projects!A4:I', 'Events!A4:G']
    };

    const data = await gsApi.spreadsheets.values
      .batchGet(options)
      .catch(err => console.error(err));

    const projects = data.data.valueRanges[0].values;
    const events = data.data.valueRanges[1].values;

    const sheetsData = {
      projects,
      events
    };

    return sheetsData;
  }

  client.authorize((err, tokens) => {
    if (err) {
      console.error(err, tokens);
      throw err;
    } else {
      gsGet(client)
        .then(data => res.json(data))
        .catch(err => console.error(err));
    }
  });
});

module.exports = router;
