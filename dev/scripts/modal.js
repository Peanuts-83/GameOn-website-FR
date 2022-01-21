function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");

// launch modal
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
function launchModal() {
  modalbg.style.display = "block";
}

// close modal
closeBtn.addEventListener("click", closeModal);
function closeModal() {
  modalbg.style.display = "none";
}

// Form validation
function validate() {
  let accept = document.getElementById('checkbox1').value;
  if (!accept) {
    alert('woops')
    return false;
  }

}