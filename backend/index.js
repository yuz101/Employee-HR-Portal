const app = require('./app');
const connection = require("./config/db");

// Make sure the database is connected before starting the server
const port = process.env.PORT || 3000;
connection.once('open', () => {
  app.listen(port, () => {
    console.log(`Server is up and running on: http://localhost:${port}`);
  });
});


