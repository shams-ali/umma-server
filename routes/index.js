const express = require('express');

const router = express.Router();

const { google } = require('googleapis');
const keys = require('../gkeys.json');

/* GET data from Google Sheets API */
router.get('/umma-server/getData', (req, res) => {
  const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets.readonly']
  );

  async function gsGet(clientAuth) {
    const gsApi = google.sheets({
      version: 'v4',
      auth: clientAuth
    });

    const options = {
      spreadsheetId: '1JWYHiOightRfEg3qFrDniItyYII5fgXdi99m11mgSH0',
      ranges: ['Projects!A4:I', 'Events!A4:G']
    };

    const data = await gsApi.spreadsheets.values.batchGet(options);

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
      gsGet(client).then(data => res.json(data));
    }
  });
});

module.exports = router;
