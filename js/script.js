const form=document.querySelector(".form"),firstNameInput=document.querySelector(".js-firstname-input"),lastNameInput=document.querySelector(".js-lastname-input"),emailInput=document.querySelector(".js-email-input"),passwordInput=document.querySelector(".js-password-input"),confirmPasswordInput=document.querySelector(".js-confirmpassword-input"),jsButton=document.querySelector(".js-btn"),inputs=document.querySelectorAll(".form__input"),REG_EXP_PASSWORD=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/,REG_EXP_EMAIL=/^([a-z0-9-]+.)[a-z0-9-]+@[a-z0-9-]+(.[a-z0-9_-]+).[a-z]{2,6}$/;jsButton.addEventListener("animationend",(()=>{jsButton.classList.remove("error-btn")}));const error=(t,e)=>{t.classList.add("error"),t.parentNode.nextElementSibling.textContent=e,t.nextElementSibling.style.opacity="0"},success=t=>{t.classList.remove("error"),t.parentNode.nextElementSibling.textContent="",t.nextElementSibling.style.opacity="1"},validate=()=>{const t=firstNameInput.value.trim(),e=lastNameInput.value.trim(),s=emailInput.value.trim(),r=passwordInput.value.trim(),n=confirmPasswordInput.value.trim();t?success(firstNameInput):error(firstNameInput,"First Name can't be blank"),e?success(lastNameInput):error(lastNameInput,"Last Name can't be blank"),s?REG_EXP_EMAIL.test(s)?success(emailInput):error(emailInput,"Enter the correct email"):error(emailInput,"Email can't be blank"),r?REG_EXP_PASSWORD.test(r)?r!==n?error(passwordInput,"Password doesnt match"):success(passwordInput):error(passwordInput,"Enter the correct password"):error(passwordInput,"Password can't be blank "),n?REG_EXP_PASSWORD.test(n)?n!==r?error(confirmPasswordInput,"Password doesnt match"):success(confirmPasswordInput):error(confirmPasswordInput,"Enter the correct confirm password"):error(confirmPasswordInput,"Confirm Password can't be blank")},successRenderHtml=t=>{const e=`\n    <div class="success-block">\n        <div></div>\n        <div class="success-block__info">\n          <h2 class="success-block__title">${t.title}</h2>\n          <div class="success-block__subtitle">${t.text}</div>\n        </div>\n        <p class="success-block__text">Have an account? <a class="success-block__link" href="/">Login</a></p>\n      </div>\n    </div> \n  `;document.querySelector(".form-container__content").innerHTML=e};form.addEventListener("submit",(t=>{t.preventDefault(),validate(),firstNameInput.classList.contains("error")||lastNameInput.classList.contains("error")||emailInput.classList.contains("error")||passwordInput.classList.contains("error")||confirmPasswordInput.classList.contains("error")?(jsButton.classList.add("error-btn"),fetch("server-error.json").then((t=>t.json())).then((t=>alert(t.error)))):(fetch("server-ok.json").then((t=>t.json())).then((t=>{successRenderHtml(t)})),inputs.forEach((t=>t.value="")))}));