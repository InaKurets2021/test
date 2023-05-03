const form = document.querySelector(".form");
const firstNameInput = document.querySelector(".js-firstname-input");
const lastNameInput = document.querySelector(".js-lastname-input");
const emailInput = document.querySelector(".js-email-input");
const passwordInput = document.querySelector(".js-password-input");
const confirmPasswordInput = document.querySelector(
  ".js-confirmpassword-input"
);

const REG_EXP_PASSWORD = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
const REG_EXP_EMAIL =
  /^([a-z0-9-]+.)[a-z0-9-]+@[a-z0-9-]+(.[a-z0-9_-]+).[a-z]{2,6}$/;

const error = (input, msg) => {
  input.classList.add("error");
  input.parentNode.nextElementSibling.textContent = msg;
  input.nextElementSibling.style.opacity = "0";
};
const success = (input) => {
  input.classList.remove("error");
  input.parentNode.nextElementSibling.textContent = "";
  input.nextElementSibling.style.opacity = "1";
};

const validate = () => {
  const firstNameValue = firstNameInput.value.trim();
  const lastNameValue = lastNameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();
  const confirmPasswordValue = confirmPasswordInput.value.trim();

  if (firstNameValue == "") {
    error(firstNameInput, "First Name can't be blank");
  } else {
    success(firstNameInput);
  }
  if (lastNameValue == "") {
    error(lastNameInput, "Last Name can't be blank");
  } else {
    success(lastNameInput);
  }
  if (emailValue == "") {
    error(emailInput, "Email can't be blank");
  } else if (REG_EXP_EMAIL.test(emailValue) == false) {
    error(emailInput, "Enter the correct email");
  } else {
    success(emailInput);
  }

  if (passwordValue == "") {
    error(passwordInput, "Password can't be blank ");
  } else if (REG_EXP_PASSWORD.test(passwordValue) == false) {
    error(passwordInput, "Enter the correct password");
  } else if (passwordValue !== confirmPasswordValue) {
    error(passwordInput, "Password doesnt match");
  } else {
    success(passwordInput);
  }
  if (confirmPasswordValue == "") {
    error(confirmPasswordInput, "Confirm Password can't be blank");
  } else if (REG_EXP_PASSWORD.test(confirmPasswordValue) == false) {
    error(confirmPasswordInput, "Enter the correct confirm password");
  } else if (confirmPasswordValue != passwordValue) {
    error(confirmPasswordInput, "Password doesnt match");
  } else {
    success(confirmPasswordInput);
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  validate();
});


//SVG image animation
new Vivus(
  'form-container__svg',
  {
    type: 'oneByOne',
    duration: 600,
    animTimingFunction: Vivus.EASE
  },
);