// import the express framework
const express = require("express");

// load environment variables from a .env file into process.env
require("dotenv").config();

// import CORS middleware
// CORS allows your API to be accessed from different origins (e.g. frontend apps)
const cors = require("cors");

const app = express();

// import the main router containing all route definitions
const router = require("./routes/main.js");

// MIDDLEWARE

// error handler for handling a route that does not exist
const notFoundMiddleware = require("./middleware/not-found.js");

// enable Cross-Origin Resource Sharing
app.use(cors());

// parse incoming JSON request bodies
// allows access to data via req.body
app.use(express.json());

// parse URL-encoded form data
// extended: false means only simple key-value pairs are allowed
app.use(express.urlencoded({ extended: false }));

// serve static files from the "public" folder
app.use(express.static("./public"));

// register the router
// all routes defined in main.js will be handled from the root path '/'
app.use("/", router);

// middleware for routes that do not exist
app.use(notFoundMiddleware);

// SERVER CONFIGURATION

// use PORT from environment variables if available, otherwise default to 4000
const PORT = process.env.PORT || 4000;

// start the server
try {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
} catch (error) {
  console.log(error);
}

// success, failure, and no token html
// when pictures come remove pic file in the root folder
