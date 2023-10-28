// Regex
const emailIdRegex = new RegExp("^[a-zA-Z0-9._]+@northeastern.edu$");
const passwordRegex = new RegExp(
  "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\\W)(?!.* ).{8,}"
);

let isEmail = false;
let isPassword = false;
var emailIdEl = "";
var passwordEl = "";
var alertPlaceholder = "";

window.addEventListener("DOMContentLoaded", (event) => {
  emailIdEl = document.getElementById("email");
  passwordEl = document.getElementById("password");

  alertPlaceholder = document.getElementById("liveAlertPlaceholder");

  if (emailIdEl && passwordEl) {
    emailIdEl.addEventListener("blur", () => {
      validateLoginForm("email");
    });
    passwordEl.addEventListener("blur", () => {
      validateLoginForm("password");
    });
  }
});

function validateLoginForm(fieldName) {
  switch (fieldName) {
    case "email":
      if (!emailIdEl.value) {
        isEmail = false;
        setErrorMsg("email", "Please enter email id");
      } else if (!emailIdEl.value.match(emailIdRegex)) {
        isEmail = false;
        setErrorMsg(
          "email",
          "Enter valid email address ending with @northeastern.edu"
        );
      } else if (emailIdEl.value.length > 50 || emailIdEl.length < 17) {
        isEmail = false;
        setErrorMsg(
          "email",
          "length should be less than 50 and greater than 17"
        );
      } else {
        isEmail = true;
        setSuccessMsg("email", "Looks good!");
      }
      break;

    case "password":
      if (!passwordEl.value) {
        isPassword = false;
        setErrorMsg("password", "Please enter password");
      } else if (!passwordEl.value.match(passwordRegex)) {
        console.log(isPassword);
        isPassword = false;
        setErrorMsg(
          "password",
          "Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
        );
      } else {
        console.log(isPassword);
        isPassword = true;
        setSuccessMsg("password", "Looks good!");
      }
      break;

    default:
      return true;
  }
}

/**
 * sets error msg below the field
 * @param {*} element
 * @param {*} message
 */
function setErrorMsg(element, message) {
  document.getElementById(`${element}-validation`).innerHTML = message;
  document.getElementById(element).classList.remove("is-valid");
  document.getElementById(element).classList.add("is-invalid");
}

/**
 * sets success msg below the field
 * @param {*} element
 * @param {*} message
 */
function setSuccessMsg(element, message) {
  document.getElementById(`${element}-validation`).innerHTML = "";
  document.getElementById(element).classList.remove("is-invalid");
  document.getElementById(element).classList.add("is-valid");
}

function login() {
  let loginBtn = document.getElementById("liveAlertBtn");
  const form = document.getElementById("loginForm").addEventListener(
    "submit",
    (event) => {
      event.preventDefault();

      loginBtn.innerHTML =
        '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';

      if (!isEmail || !isPassword) {
        appendAlert("Please fill all fields!", "danger");
        loginBtn.innerHTML = "Login";
        return false;
      } else {
        appendAlert("Login successful", "success");
        window.location.href = "index.html";
        loginBtn.innerHTML = "Login";
        return true;
      }
    },
    { once: true }
  );
}

const appendAlert = (message, type) => {
  const wrapper = document.createElement("div");
  wrapper.className = "d-flex justify-content-center login-alert";
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible fade show" role="alert">`,
    `<div>${message}</div>`,
    '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");

  alertPlaceholder.append(wrapper);

  window.setTimeout(function () {
    $(".alert")
      .fadeTo(500, 0)
      .slideUp(500, function () {
        var elementsToRemove = document.querySelectorAll(".login-alert");

        // Remove each selected element from the DOM
        for (var i = 0; i < elementsToRemove.length; i++) {
          elementsToRemove[i].remove();
        }

        alertPlaceholder = document.getElementById("liveAlertPlaceholder");
      });
  }, 3000);
};
