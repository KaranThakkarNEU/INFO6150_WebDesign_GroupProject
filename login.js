// Regex
const emailIdRegex = new RegExp("^[a-zA-Z0-9._]+@northeastern.edu$");
const passwordRegex = new RegExp(
  "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\\W)(?!.* ).{8,}"
);

let isEmail = false;
let isPassword = false;

function validateLoginForm(fieldName) {
  var emailIdVal = document.getElementById("email").value;
  var passwordVal = document.getElementById("password").value;

  switch (fieldName) {
    case "email":
      if (!emailIdVal) {
        isEmail = false;
        setErrorMsg("email", "Please enter email id");
      } else if (!emailIdVal.match(emailIdRegex)) {
        isEmail = false;
        setErrorMsg(
          "email",
          "Enter valid email address ending with @northeastern.edu"
        );
      } else if (emailIdVal.length > 50 || emailIdVal.length < 17) {
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
      if (!passwordVal) {
        isPassword = false;
        setErrorMsg("password", "Please enter password");
      } else if (!passwordVal.match(passwordRegex)) {
        isPassword = false;
        setErrorMsg(
          "password",
          "Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
        );
      } else {
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
  if (!isEmail || !isPassword) {
    alert("Please enter fill all the fields correctly");
  }
}
