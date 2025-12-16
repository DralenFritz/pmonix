// import the express framework
const express = require("express");

// initialises the router
const router = express.Router();

// import routing functionality from the main controller 
const { homePage, aboutPage, enquireProductPage, submitEnquiryFormPage } = require("../controllers/main.js");

// links the route to the respective functionality for that route
router.get("/", homePage);
router.get("/about",aboutPage);
router.get('/enquire-product', enquireProductPage)
router.post('/enquiry-submit', submitEnquiryFormPage);

// exports the router to be used in app.js
module.exports = router;
