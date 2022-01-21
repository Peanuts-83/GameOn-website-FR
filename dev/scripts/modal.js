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
const submitBtn = document.querySelector('.btn-submit');



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
//pattern="^([a-zA-Z0-9]+)@([a-zA-Z0-9]+)\.([a-zA-Z0-9]{2,})$"
function validate() {
  let myForm = document.forms["reserve"];
  let first = myForm["prénom"];
  let last = myForm["nom"];
  let email = myForm["email"];
  const birthdate = myForm["birthdate"];
  const quantity = myForm["quantity"];
  const locations = myForm["location"];
  const accept = myForm["accept"];
  const news = myForm["news"];


  // validation inputs texte
  // required: {string} && string.length >= 2
  const regex1 = new RegExp('^[a-z]{2,}', 'gi');
  let texts = [first, last];

  for (let text of texts) {
    if (!regex1.test(text.value)) {
      setComment(text);
    } else {
      unsetComment(text);
    }
  }

  // validation email
  // required: {string} && /^([a-z0-9]+)@([a-z0-9]+)\.([a-z]{2,})$/gi
  const regex2 = new RegExp('^([a-z0-9]+)@([a-z0-9]+)\.([a-z]{2,})$', 'gi');
  let emailVal = email.value;
  console.log(regex2.test(email.value))

  if (!regex2.test(emailVal)) {
    setComment(email);
  } else {
    unsetComment(email);
  }

  // Gestion des comments d'erreur
  function setComment(target) {
    console.log(target)
    // remove old comment
    if (target.parentElement.lastChild.className == 'comment') {
      target.parentElement.lastChild.remove();
    }

    console.log('TYPE', target.attributes.type.value);
    // new comment
    let comment = document.createElement("div");
    switch (target.attributes.type.value) {
      case 'text':
        comment.innerText = `${target.name} invalide (2 caractères minimum)`;
        break;
      case 'email':
        comment.innerText = `${target.name} invalide (format requis 'mail@domain.xx')`;
        break;
      case 'date':
        comment.innerText = `${target.name} invalide (format requis jj/mm/aaaa)`;
        break;
      case 'number':
        comment.innerText = `${target.name} invalide (chiffre entre 0 et 99 requis)`;
        break;
      default:
        comment.innerText = `saisie invalide`;
        break;
    }
    comment.className  = 'comment';
    target.parentElement.appendChild(comment);
  }

  function unsetComment(target) {
    // remove old comment
    if (target.parentElement.lastChild.className == 'comment') {
      target.parentElement.lastChild.remove();
    }
  }

  return false;
}