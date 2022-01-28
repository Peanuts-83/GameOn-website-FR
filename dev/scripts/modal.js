// DOM ELEMENTS //
const main = document.querySelector("main");
const heroSection = document.querySelector(".hero-section");
const footer = document.querySelector("footer");
const modalbg = document.querySelector(".bground");
const modalContent = document.querySelector('.content');
const modalBtn = document.querySelectorAll(".modal-btn");
const closeBtn = document.querySelector(".close");
const formData = document.querySelectorAll(".formData");
const modalBody = document.querySelector('.modal-body');
const modalSubmit = document.querySelector('btn-submit');
const modalConfirm = document.querySelector('.confirm-screen');
const modalCloseConfirm = document.querySelectorAll('.close-confirm-screen');

// SHOW/HIDE NAV //
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// SHOW/HIDE BG ELEMENTS ON RESIZE WINDOW IF MODAL IS ON //
window.addEventListener('resize', showHideBackground);
function showHideBackground() {
  let w = window.innerWidth;
  if (w > 768 && modalbg.style.display == 'block') {
    heroSection.style.display = 'grid';
    footer.style.display = 'block';
    main.className = '';
  } else if (w <= 768 && modalbg.style.display == 'block') {
    heroSection.style.display = 'none';
    footer.style.display = 'none';
    main.className = 'margin-off';
  }
}

// LAUNCH MODAL //
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
function launchModal() {
  let w = window.innerWidth;
  modalbg.style.display = "block";
  modalContent.style.display = 'block';
  // if screen XS: HIDE BG ELEMENTS
  if (w <= 768) {
    heroSection.style.display = 'none';
    footer.style.display = 'none';
    main.className = 'margin-off';
  }
}

// CLOSE MODAL //
closeBtn.addEventListener("click", closeModal);
function closeModal() {
  let w = window.innerWidth;
  modalbg.style.display = "none";
  // if screen XL: SHOW BG ELEMENTS
  if (w <= 768) {
    heroSection.style.display = 'grid';
    footer.style.display = 'block';
    main.className = '';
  }
}

// SHOW CONFIRMATION MSG //
document.onload = testUrl();
function testUrl() {
  let regex = /index.html\?(.)+/;
  let string = window.location.href;

  if (regex.test(string)) {
    // hide/show modal parts
    let w = window.innerWidth;
    if (w <= 768) {
      heroSection.style.display = 'none';
      footer.style.display = 'none';
      main.className = 'margin-off';
    }
    modalbg.style.display = 'block';
    modalContent.style.display = 'none';
    modalConfirm.style.display = 'flex';

    // build Result Object & show in console.log
    let result = {};
    result.firstName = string.match(modalReg('prenom'))[0].split('=')[1].slice(0, -1);
    result.lastName = string.match(modalReg('nom'))[0].split('=')[1].slice(0, -1);
    result.email = string.match(modalReg('email'))[0].split('=')[1].slice(0, -1);
    result.birthdate = string.match(modalReg('birthdate'))[0].split('=')[1].slice(0, -1);
    result.quantity = string.match(modalReg('quantity'))[0].split('=')[1].slice(0, -1);
    result.location = string.match(modalReg('location'))[0].split('=')[1].slice(0, -1);
    result.accept = true;
    /\&news=/g.test(string) ? result.news = true : result.news = false;
    console.log(result)
  }
}

// REGEXP FOR WINDOW.LOCATION.HREF //
function modalReg(str) {
  const regexp = new RegExp(`[\?\&]${str}=([a-z\-\._+%0-9])+\&?`, 'gi');
  return regexp;
}

// CLOSE CONFIRMATION MSG //
modalCloseConfirm.forEach(btn => btn.addEventListener('click', closeConfirmation));
function closeConfirmation() {
  window.location.href = './index.html'
}



/////////////////////
// FORM VALIDATION //
function validate() {

  // DOM ELEMENTS
  const myForm = document.forms["reserve"];
  const first = myForm["prenom"];
  const last = myForm["nom"];
  const email = myForm["email"];
  const birthdate = myForm["birthdate"];
  const quantity = myForm["quantity"];
  const locations = myForm["location"];
  const accept = myForm["accept"];

  // VALIDATEUR DES DONNEES UTILISATEURS
  let validator = {
    first: false,
    last: false,
    email: false,
    birthdate: false,
    quantity: false,
    locations: false,
    accept: false
  }


  // VALIDATION STRINGS (NOM, PRÉNOM)
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

  // VALIDATION EMAIL
  // required: {string} && 'mail@domain.xx'
  const regex2 = new RegExp('[0-9a-z._%+-]+@[a-z0-9.-]+\\.[a-z]{2,64}', 'i');
  let emailVal = email.value;

  if (!regex2.test(emailVal)) {
    setComment(email);
    validator.email = false;
  } else {
    unsetComment(email);
    validator.email = true;
  }

  // VALIDATION BIRTHDATE
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

  // VALIDATION QUANTITY (NBRE DE TOURNOIS)
  // required: {number} && 0 <= x < 100
  let quantityVal = quantity.value;

  if (quantityVal < 0 || quantityVal >= 100) {
    setComment(quantity);
    validator.quantity = false;
  } else {
    unsetComment(quantity);
    validator.quantity = true;
  }

  // VALIDATION LOCATION (LIEU DE TOURNOI A VENIR)
  // required: {checked} && 1 checked
  let locationChecked = Array.from(locations).some(location => location.checked);

  if (!locationChecked) {
    setComment(locations[0]);
    validator.locations = false;
  } else {
    unsetComment(locations[0]);
    validator.locations = true;
  }

  // VALIDATION ACCEPT (CONDITIONS GALES)
  // required: {checked}
  let acceptVal = accept.checked;

  if (!acceptVal) {
    setComment(accept);
    validator.accept = false;
  } else {
    unsetComment(accept);
    validator.accept = true;
  }


  // GESTION DES MESSAGES D ERREUR

  function setComment(target) {
    // COMMENT DANS .formData
    let comment = target.parentElement;

    switch (target.attributes.type.value) {
      case 'text':
        comment.setAttribute('data-error', `Veuillez entrer 2 caractères ou plus pour le champ du ${target.name}`);
        break;
      case 'email':
        comment.setAttribute('data-error', `Un ${target.name} correct est requis (format 'mail@domain.xx')`);
        break;
      case 'date':
        comment.setAttribute('data-error', `La date de naissance est requise (format jj/mm/aaaa)`);
        break;
      case 'number':
        comment.setAttribute('data-error', `Le nombre de concours doit être un chiffre entre 0 et 99`);
        break;
      case 'radio':
        comment.setAttribute('data-error', `Veuillez choisir un concours`);
        break;
      case 'checkbox':
        comment.setAttribute('data-error', `Veuillez accepter les conditions d'utilisation`);
        break;
      default:
        comment.setAttribute('data-error', `saisie invalide`);
        break;
    }
    comment.setAttribute('data-error-visible', true);
  }

  function unsetComment(target) {
    let comment = target.parentElement;
    comment.setAttribute('data-error-visible', false);
  }



  /////////////////////////////////////////////////
  // RETURN TRUE SI TOUS LES VALIDATEURS SONT OK //
  if (Object.values(validator).every(bool => bool == true)) {
    return true;
  } else {
    return false;
  }
}