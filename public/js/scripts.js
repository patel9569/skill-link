// Load the footer dynamically in all pages
document.addEventListener("DOMContentLoaded", function () {
    fetch("footer.html")
      .then((response) => response.text())
      .then((data) => {
        document.body.insertAdjacentHTML("beforeend", data);
      })
      .catch((error) => console.error("Error loading footer:", error));
  });
  
  // Load the header dynamically in all pages
  


//   username 

let userlink = document.getElementById("userlink");
let signoutlink = document.getElementById("signoutlink");
let header = document.getElementById("hh");

var currentuser = null;

function getUsername() {
  let keepLoggedIn = localStorage.getItem("keepLoggedIn");

  if (keepLoggedIn === "yes") {
    currentuser = JSON.parse(localStorage.getItem("user"));
  } else {
    currentuser = JSON.parse(sessionStorage.getItem("user"));
  }
}

function Signout() {
  sessionStorage.removeItem("user");
  localStorage.removeItem("user");
  localStorage.removeItem("keepLoggedIn");
  window.location = "index.html";
}

window.onload = function () {
  getUsername();
  if (currentuser === null) {
    userlink.innerText = "Create New Account";
    userlink.classList.replace("nav-link", "btn");
    userlink.classList.add("btn-primary");
    userlink.href = "register.html";

    signoutlink.innerText = "Login";
    signoutlink.classList.replace("nav-link", "btn");
    signoutlink.classList.add("btn-success");
    signoutlink.href = "login.html";
  } else {
    // Corrected the variable name from currentUser to currentuser
    userlink.innerText = currentuser.username;
    // header.innerText = "Welcome " + currentuser.username;
    userlink.classList.replace("btn", "nav-link");
    userlink.href = "#";

    signoutlink.innerText = "Sign Out";
    signoutlink.classList.replace("btn", "nav-link");
    signoutlink.href = "javascript:Signout()";
  }
};
