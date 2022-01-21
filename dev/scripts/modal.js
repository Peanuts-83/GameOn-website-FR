// Show/hide nav
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
function validate() {
  const myForm = document.forms["reserve"];
  const first = myForm["prénom"];
  const last = myForm["nom"];
  const email = myForm["email"];
  const birthdate = myForm["birthdate"];
  const quantity = myForm["quantity"];
  const locations = myForm["location"];
  const accept = myForm["accept"];
  let validator = {
    first: false,
    last: false,
    email: false,
    birthdate: false,
    quantity: false,
    locations: false,
    accept: false
  }

  // validation inputs texte
  // required: {string} && string.length >= 2
  const regex1 = new RegExp('^[a-z]{2,}', 'i');
  const texts = [first, last];

  for (let text of texts) {
    if (!regex1.test(text.value)) {
      setComment(text);
      validator[text.id] = false;
    } else {
      unsetComment(text);
      validator[text.id] = true;
    }
  }

  // validation email
  // required: {string} && /^([a-z0-9]+)@([a-z0-9]+)\.([a-z]{2,})$/gi
  const regex2 = new RegExp('^([a-z0-9]+)@([a-z0-9]+)\.([a-z]{2,})$', 'i');
  let emailVal = email.value;
  console.log(regex2.test(email.value))

  if (!regex2.test(emailVal)) {
    setComment(email);
    validator.email = false;
  } else {
    unsetComment(email);
    validator.email = true;
  }

  // validation birthdate
  // required: {string} && yyyy-dd-mm
  const regex3 = new RegExp('^([0-9]{4})[\/-]{1}([0-9]{1,2})[\/-]{1}([0-9]{1,2})$');
  let birthdateVal = birthdate.value;

  if (!regex3.test(birthdateVal)) {
    setComment(birthdate);
    validator.birthdate = false;
  } else {
    unsetComment(birthdate);
    validator.birthdate = true;
  }

  // validation quantity
  // required: {number} && 0 <= x < 100
  let quantityVal = quantity.value;

  if (quantityVal < 0 || quantityVal >= 100) {
    setComment(quantity);
    validator.quantity = false;
  } else {
    unsetComment(quantity);
    validator.quantity = true;
  }

  // validation location
  // required: {only 1 checked}
  let locationChecked = Array.from(locations).some(location => location.checked);

  if (!locationChecked) {
    setComment(locations[0]);
    validator.locations = false;
  } else {
    unsetComment(locations[0]);
    validator.locations = true;
  }

  // validation accept conditions
  // required: {checked}
  let acceptVal = accept.checked;

  if (!acceptVal) {
    setComment(accept);
    validator.accept = false;
  } else {
    unsetComment(accept);
    validator.accept = true;
  }


  // Gestion des comments d'erreur
  function setComment(target) {
    console.log('FALSE VALUE', target.name, target.value)
    // remove old comment
    if (target.parentElement.lastChild.className == 'comment') {
      target.parentElement.lastChild.remove();
    }

    // new comment
    let comment = document.createElement("div");
    switch (target.attributes.type.value) {
      case 'text':
        comment.innerText = `Veuillez entrer 2 caractères ou plus pour le champ du ${target.name}`;
        break;
      case 'email':
        comment.innerText = `Un ${target.name} correct est requis (format 'mail@domain.xx')`;
        break;
      case 'date':
        comment.innerText = `La date de naissance est requise (format jj/mm/aaaa)`;
        break;
      case 'number':
        comment.innerText = `Le nombre de concours doit être un chiffre entre 0 et 99`;
        break;
      case 'radio':
        comment.innerText = `Veuillez choisir un concours`;
        break;
      case 'checkbox':
        comment.innerText = `Veuillez accepter les conditions d'utilisation`;
        break;
      default:
        comment.innerText = `saisie invalide`;
        break;
    }
    comment.className = 'comment';
    target.parentElement.appendChild(comment);
  }

  function unsetComment(target) {
    // remove old comment
    if (target.parentElement.lastChild.className == 'comment') {
      target.parentElement.lastChild.remove();
    }

  }

  // Return true si tous les validateurs ok
  return Object.values(validator).every(bool => bool == true) ? true : false;
}