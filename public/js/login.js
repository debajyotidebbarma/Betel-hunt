/*eslint-disable*/
import axios from "axios";
import { showAlert } from "./alert";

export const login = async (name, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/login",
      data: {
        name,
        password,
      },
    });
    if (res.data.status === "success") {
      showAlert("success", "Logged in successfully");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "/logout",
    });
    if (res.data.status === "success") {
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

export const searchPin = async (name, email, pincode) => {
  try {
    console.log("entered");
    const res = await axios({
      method: "POST",
      url: "/search",
      data: {
        name,
        email,
        pincode,
      },
    });
    if (res.data.status === "success") {
      window.setTimeout(() => {
        location.assign("/searchResult");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
