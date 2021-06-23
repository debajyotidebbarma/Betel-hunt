/* eslint-disable */
import "@babel/polyfill";
import { login, logout, searchPin } from "./login";

// import { showAlert } from "./alert";

//DOM ELEMENTS
const loginForm = document.querySelector(".form--login");
const logOutBtn = document.querySelector(".nav__el--logout");
const searchForm = document.querySelector(".form--search");

//VALUES
//DELEGATION

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;
    login(name, password);
  });
}

if (logOutBtn) {
  logOutBtn.addEventListener("click", logout);
}

if (searchForm) {
  searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const pin = document.getElementById("pincode").value;
    searchPin(name, email, Number(pin));
  });
}
