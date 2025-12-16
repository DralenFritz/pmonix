// import Node.js path module for handling file paths safely
const path = require("path");

// load environment variables from a .env file into process.env
require("dotenv").config();

// import the email transport utility, the nodemailer configuration
const transporter = require("../utils/email.js");

// import hCaptcha library for server-side captcha verification
const hcaptcha = require("hcaptcha");

// resolve the absolute path to the public directory
const rootDir = path.resolve(__dirname, "../public");

// Route Controllers

// controller for the home page
// sends the index.html file to the client
const homePage = (req, res) => {
  res.sendFile(path.join(rootDir, "pages/index.html"));
};

// controller for the about page
// sends the about.html file to the client
const aboutPage = (req, res) => {
  res.sendFile(path.join(rootDir, "pages/about.html"));
};

// controller for the product enquiry page
// displays the enquiry form
const enquireProductPage = (req, res) => {
  res.sendFile(path.join(rootDir, "pages/enquire-product.html"));
};

// Form Submission Controller

// destructure form fields from the request body

const submitEnquiryFormPage = async (req, res) => {
  const {
    name,
    email,
    country,
    state,
    phone,
    age,
    gender,
    wigs,
    supplements,
    skincare,
    otherProduct,
    additionalInfo,
  } = req.body;

  // array to store selcted products
  let productsEnquired = [];

  // group all products into one object
  const products = { wigs, supplements, skincare, otherProduct };
  
  // convert the products object into an array of values
  const productsArray = Object.values(products);

  // add only selected products to the productsEnquired array
  productsArray.forEach((product) => {
    if (product) {
      productsEnquired.push(product);
    }
  });

  // configure email details
  const mailOptions = {
    from: process.env.EMAIL_ID,
    to: process.env.EMAIL_ID,
    // when you click reply, it replies to the user
    replyTo: email,
    subject: `New Product Enquiry for ${productsEnquired.join(", ")}`,
    // email body formatted as HTML
    html: `
        <p><strong>Name: </strong>${name}</p>
        <p><strong>Email: </strong>${email}</p>
        <p><strong>Country: </strong>${country}</p>
        <p><strong>State: </strong>${state || "not provided"}</p>
        <p><strong>Phone Number: </strong>${phone}</p>
        <p><strong>Age: </strong>${age || "not provided"}</p>
        <p><strong>Gender: </strong>${gender || "not specified"}</p>
        <p><strong>Additional Info: </strong>${additionalInfo || "none"}</p>
    `,
  };

  try {
    // get hCaptcha token from the request body
    const token = req.body["h-captcha-response"];

    // check if token exists
    if (!token) {
      return res.status(400).sendFile(path.join(rootDir, "pages/no-token.html"));
    }

    // verify hCaptcha token
    const captchaResponse = await hcaptcha.verify(process.env.HCAPTCHA_SECRET,token);

    // check verification result
    if (!captchaResponse.success) {
      return res.status(403).sendFile(path.join(rootDir, "pages/failure.html"));
    }

    // if captcha is valid send email
    await transporter.sendMail(mailOptions);

    // send a success message to the client side
    return res.status(200).sendFile(path.join(rootDir, "pages/success.html"));

  } catch (err) {
    // handle unexpected errors safely
    console.error("hCaptcha or email error:", err);
    return res
      .status(500)
      .sendFile(path.join(rootDir, "pages/failure.html"));
    }
  };

module.exports = {
  homePage,
  aboutPage,
  enquireProductPage,
  submitEnquiryFormPage,
};
