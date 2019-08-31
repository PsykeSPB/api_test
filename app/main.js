const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./sequelize');
const api = require('./api');

const app = express();

app.use(bodyParser.json());

// Auth middleware here
// Cors middleware here
// And others
app.use('/api', api);

(async () => {
  try {

    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(9000, () => {
      console.log('Example app listening on port 9000!');
    });
  
  } catch (error) {
    console.error(error);
  }
})();
