require('dotenv').config();
const express = require('express');
const { connectToDb } = require('./db.js');
const { installHandler } = require('./api_handler.js');


const port = process.env.API_SERVER_PORT;// || 3000;
const app = express();
installHandler(app);
(async function start() {
  try {
    await connectToDb();
    app.listen(port, () => {
      console.log('Bank API v1.0.0 started on port', port);
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
}());