// select all product container elements
const products = document.querySelectorAll(".product");

// select all checkbox inputs inside product elements
const productsCheckbox = document.querySelectorAll(
  ".product .form-check-input"
);

// select all gender container elements
const genderOptions = document.querySelectorAll(".gender-option");

// select all checkbox inputs inside gender option elements
const genderOptionsCheckbox = document.querySelectorAll(
  ".gender-option .form-check-input"
);

// loop through each product element
products.forEach((product, index) => {
  // add a click event listener to the product container
  product.addEventListener("click", () => {
    // toggle the checkbox state when the product is clicked
    if (productsCheckbox[index].checked) {
      productsCheckbox[index].checked = false;
    } else {
      productsCheckbox[index].checked = true;
    }
  });
});

// loop through each gender option element
genderOptions.forEach((genderOption, index) => {
  // add a click event listener to the gender option container
  genderOption.addEventListener("click", () => {
    // ensure only selection (no toggle off)
    // if the checkbox is not checked, check it
    if (!genderOptionsCheckbox[index].checked) {
      genderOptionsCheckbox[index].checked = true;
    }
  });
});
