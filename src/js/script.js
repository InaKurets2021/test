const form = document.querySelector(".form");
const firstNameInput = document.querySelector(".js-firstname-input");
const lastNameInput = document.querySelector(".js-lastname-input");
const emailInput = document.querySelector(".js-email-input");
const passwordInput = document.querySelector(".js-password-input");
const confirmPasswordInput = document.querySelector(
  ".js-confirmpassword-input"
);
const jsButton = document.querySelector('.js-btn')
const inputs = document.querySelectorAll('.form__input');

const REG_EXP_PASSWORD = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
const REG_EXP_EMAIL = /^([a-z0-9-]+.)[a-z0-9-]+@[a-z0-9-]+(.[a-z0-9_-]+).[a-z]{2,6}$/;


jsButton.addEventListener('animationend', () => {
  jsButton.classList.remove('error-btn')
})

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

  if (!firstNameValue) {
    error(firstNameInput, "First Name can't be blank");
  } else {
    success(firstNameInput);
  }
  if (!lastNameValue) {
    error(lastNameInput, "Last Name can't be blank");
  } else {
    success(lastNameInput);
  }
  if (!emailValue) {
    error(emailInput, "Email can't be blank");
  } else if (!REG_EXP_EMAIL.test(emailValue)) {
    error(emailInput, "Enter the correct email");
  } else {
    success(emailInput);
  }

  if (!passwordValue) {
    error(passwordInput, "Password can't be blank ");
  } else if (!REG_EXP_PASSWORD.test(passwordValue)) {
    error(passwordInput, "Enter the correct password");
  } else if (passwordValue !== confirmPasswordValue) {
    error(passwordInput, "Password doesnt match");
  } else {
    success(passwordInput);
  }
  if (!confirmPasswordValue) {
    error(confirmPasswordInput, "Confirm Password can't be blank");
  } else if (!REG_EXP_PASSWORD.test(confirmPasswordValue)) {
    error(confirmPasswordInput, "Enter the correct confirm password");
  } else if (confirmPasswordValue !== passwordValue) {
    error(confirmPasswordInput, "Password doesnt match");
  } else {
    success(confirmPasswordInput);
  }
};
const successRenderHtml = (data) => {
  const html = `
    <div class="success-block">
        <div></div>
        <div class="success-block__info">
          <h2 class="success-block__title">${data.title}</h2>
          <div class="success-block__subtitle">${data.text}</div>
        </div>
        <p class="success-block__text">Have an account? <a class="success-block__link" href="https://inakurets2021.github.io/test/">Login</a></p>
      </div>
    </div> 
  `;
  document.querySelector('.form-container__content').innerHTML = html;
}
form.addEventListener("submit", (event) => {
  event.preventDefault();
  validate();

  if (firstNameInput.classList.contains('error') ||
    lastNameInput.classList.contains('error') ||
    emailInput.classList.contains('error') ||
    passwordInput.classList.contains('error') ||
    confirmPasswordInput.classList.contains('error')
  ) {
    jsButton.classList.add('error-btn');
    fetch('server-error.json').then(res => {
      return res.json();
    }).then(data => alert(data.error))
  } else {
    fetch('server-ok.json').then(res => {
      return res.json();
    }).then(data => {
      successRenderHtml(data);
    })
    inputs.forEach(el => el.value = '')
  }
});


