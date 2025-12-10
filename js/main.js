var userName = document.getElementById("name");
var userPhone = document.getElementById("num");
var userEmail = document.getElementById("email");
var userAddress = document.getElementById("address");
var userType = document.getElementById("type");
var userNotes = document.getElementById("notes");
var searchContact = document.getElementById("search");
var userFavourite = document.getElementById("fav-check");
var userEmergency = document.getElementById("emerg-check");

var allContact = document.getElementById("contact-card");
var contactList = [];

var favContacts = document.getElementById("fav-contact");
var favouriteList = [];

var emergContacts = document.getElementById("emerg-contacts");
var emergencyList = [];

if (localStorage.getItem("Contact") !== null) {
  contactList = JSON.parse(localStorage.getItem("Contact"));
  displayContact();
}

if (localStorage.getItem("Favourite") !== null) {
  favouriteList = JSON.parse(localStorage.getItem("Favourite"));
  displayFavourite();
}

if (localStorage.getItem("Emergency") !== null) {
  emergencyList = JSON.parse(localStorage.getItem("Emergency"));
  displayEmergency();
}

if (emergencyList.length == 0) {
  emergContacts.innerHTML = `<p class="my-5 text-center fs-14 opacity-75">No Emergency yet</p>`;
}

if (favouriteList.length == 0) {
  favContacts.innerHTML = `<p class="my-5 text-center fs-14 opacity-75">No Favourite yet</p>`;
}

// ####################################
// Add function
// ####################################
function addContact() {
  if (nameValidation() & phoneValidation() & emailValidation()) {
    // object
    var contact = {
      contactName: userName.value,
      contactPhone: userPhone.value,
      contactEmail: userEmail.value,
      contactAddress: userAddress.value,
      contactType: userType.value,
      contactNote: userNotes.value,
      contactFav: userFavourite.checked,
      contactEmerg: userEmergency.checked,
    };

    console.log(contactList);

    // push
    if (contact.contactFav) {
      favouriteList.push(contact);
    }

    if (contact.contactEmerg) {
      emergencyList.push(contact);
    }

    contactList.push(contact);

    // local storage
    localStorage.setItem("Contact", JSON.stringify(contactList));
    localStorage.setItem("Favourite", JSON.stringify(favouriteList));
    localStorage.setItem("Emergency", JSON.stringify(emergencyList));

    // clearing
    clearInput();

    // displaying
    displayContact();
    displayFavourite();
    displayEmergency();

    Swal.fire({
      icon: "success",
      title: "Contact Added",
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Your contact inputs is not valid",
      text: "Please fix your inputs!",
    });
  }
}

// ####################################
// Clearing function
// ####################################
function clearInput() {
  userName.value = "";
  userPhone.value = "";
  userEmail.value = "";
  userAddress.value = "";
  userType.value = "";
  userNotes.value = "";
  userFavourite.checked = false;
  userEmergency.checked = false;
  userName.classList.remove("is-valid");
  userEmail.classList.remove("is-valid");
  userPhone.classList.remove("is-valid");
}

// ####################################
// Display function
// ####################################
function displayContact() {
  box = ``;

  for (var i = 0; i < contactList.length; i++) {
    box += `<div class="col-12 col-md-6">
    <div class="border border-2 border-secondary border-opacity-10 rounded-3">
                                 <div class="inner m-3">
                                    <div class="rounded-3">
                                        <div class="d-flex justify-content-start align-items-center">
                                            <div class="position-relative">
                                                <div
                                                    class="contact-pic p-3 rounded-4 d-flex justify-content-center align-items-center me-2">
                                                    <span class="text-white fw-bolder">
                                                    ${contactList[i].contactName
                                                      .charAt(0)
                                                      .toUpperCase()}</span>
                                                </div>
                                                <div
                                                    class="i-name rounded-circle position-absolute top-0 end-0 bg-warning d-none">
                                                    <i class="fa-solid fa-star text-white fs-10"></i>
                                                </div>
                                                <div
                                                    class="i-name rounded-circle position-absolute bottom-0 end-0 bg-danger d-none">
                                                    <i class="fa-solid fa-heartbeat text-white fs-10"></i>
                                                </div>
                                            </div>

                                            <div class="contact-info">
                                                <div class="name-num">
                                                    <h3 class="fw-bolder fs-6">${
                                                      contactList[i].contactName
                                                    }</h3>
                                                    <div
                                                        class="num d-flex justify-content-start align-items-center gap-2">
                                                        <div
                                                            class="d-flex justify-content-center p-2 rounded-3 bg-info-subtle">
                                                            <i class="fa-solid fa-phone text-primary fs-8"></i>
                                                        </div>
                                                        <span class="fs-14">${
                                                          contactList[i]
                                                            .contactPhone
                                                        }</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="other mt-3">
                                            <div class="email d-flex justify-content-start align-items-center gap-2">
                                                <div
                                                    class="d-flex justify-content-center p-2 rounded-3 bg-purple-light">
                                                    <i class="fa-solid fa-envelope fs-10 text-purple"></i>
                                                </div>
                                                <span class="fs-14">${
                                                  contactList[i].contactEmail
                                                }</span>
                                            </div>

                                            <div
                                                class="location d-flex justify-content-start align-items-center gap-2 mt-2">
                                                <div
                                                    class="d-flex justify-content-center p-2 rounded-3 bg-success-subtle">
                                                    <i class="fa-solid fa-location-dot fs-10 text-success"></i>
                                                </div>
                                                <span class="fs-14">${
                                                  contactList[i].contactAddress
                                                }</span>
                                            </div>

                                            <div class="d-flex justify-content-start align-items-center gap-3 mt-2">
                                                <span
                                                    class="bg-success-subtle text-success py-1 px-2 fs-12 rounded">${
                                                      contactList[i].contactType
                                                    }</span>
                                                <div class="bg-danger-subtle text-danger rounded fs-10 py-1 px-2 d-none">
                                                    <i class="fa-solid fa-heartbeat "></i> Emergency
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div class="bg-secondary bg-opacity-10">
                                    <div class="contact-footer p-2">
                                        <div class="d-flex justify-content-between align-items-center">
                                            <div class="d-flex justify-content-center align-items-center gap-2">
                                                <button type="submit" class="btn btn-call border-0"><i
                                                        class="fa-solid fa-phone text-success"></i></button>
                                                <button type="submit" class="btn btn-mail border-0"><i
                                                        class="fa-solid fa-envelope text-purple"></i></button>
                                            </div>

                                            <div class="right-btn">
                                                <button class="btn btn-fav-reg p-2 rounded" onclick="favBtn(${i})"><i
                                                        class="fa-regular fa-star text-secondary fs-14"></i></button>
                                                <button class="btn btn-fav-solid d-none p-2 rounded" onclick="unFavBtn(${i})"><i
                                                        class="fa-solid fa-star text-warning fs-14"></i></button>
                                                <button class="btn btn-emerg-reg p-2 rounded"><i
                                                        class="fa-regular fa-heart text-secondary fs-14" onclick="emergBtn(${i})"></i></button>
                                                <button class="btn btn-emerg-solid d-none p-2 rounded"><i
                                                        class="fa-solid fa-heartbeat text-danger fs-14" onclick="unEmergBtn(${i})"></i></button>
                                                <button class="btn btn-edit p-2 rounded"><i
                                                        class="fa-solid fa-pen text-secondary fs-14"></i></button>
                                                <button class="btn btn-del p-2 rounded" onclick="deleteContact(${i})"><i
                                                        class="fa-solid fa-trash text-secondary fs-14"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                               </div>
                               </div>`;
  }

  allContact.innerHTML = box;
}

function displayFavourite() {
  var box = ``;

  for (var i = 0; i < favouriteList.length; i++) {
    box += ` <div class="m-2">
                                <div class="inner d-flex justify-content-between align-items-center rounded bg-secondary bg-opacity-10 w-100 p-2">
                                    <div class="d-flex justify-content-start align-items-center">
                                        <div
                                            class="fav-pic px-3 py-2 rounded-2 d-flex justify-content-center align-items-center me-2">
                                            <span class="text-white fw-bolder">${contactList[
                                              i
                                            ].contactName
                                              .charAt(0)
                                              .toUpperCase()}</span>
                                        </div>
                                        <div>
                                            <h2 class="fs-6 fw-bolder m-0">${
                                              favouriteList[i].contactName
                                            }</h2>
                                            <span class="fs-14 opacity-75">${
                                              favouriteList[i].contactPhone
                                            }</span>
                                        </div>
                                    </div>
                                    <div class=""><button class="btn border-0 bg-success bg-opacity-10"><i
                                                class="fa-solid fa-phone fs-14 text-success"></i></button></div>
                                </div>
                            </div>`;
  }

  favContacts.innerHTML = box;

  if (favouriteList.length == 0) {
    favContacts.innerHTML = `<p class="my-5 text-center fs-14 opacity-75">No Favourite yet</p>`;
  }
}

function displayEmergency() {
  var box = ``;

  for (var i = 0; i < emergencyList.length; i++) {
    box += ` <div class="m-2">
                                <div class="inner d-flex justify-content-between align-items-center rounded bg-secondary bg-opacity-10 w-100 p-2">
                                    <div class="d-flex justify-content-start align-items-center">
                                        <div
                                            class="emerg-pic px-3 py-2 rounded-2 d-flex justify-content-center align-items-center me-2">
                                            <span class="text-white fw-bolder">${contactList[
                                              i
                                            ].contactName
                                              .charAt(0)
                                              .toUpperCase()}</span>
                                        </div>
                                        <div>
                                            <h2 class="fs-6 fw-bolder m-0">${
                                              emergencyList[i].contactName
                                            }</h2>
                                            <span class="fs-14 opacity-75">${
                                              emergencyList[i].contactPhone
                                            }</span>
                                        </div>
                                    </div>
                                    <div class=""><button class="btn bg-danger bg-opacity-10 border-0"><i
                                                class="fa-solid fa-phone fs-14 text-danger"></i></button></div>
                                </div>
                            </div>`;
  }

  emergContacts.innerHTML = box;

  if (emergencyList.length == 0) {
    emergContacts.innerHTML = `<p class="my-5 text-center fs-14 opacity-75">No Emergency yet</p>`;
  }
}

function deleteContact(index) {
  var deleted = contactList[index];
  contactList.splice(index, 1);

  favouriteList = favouriteList.filter(function (c) {
    return c.contactPhone !== deleted.contactPhone;
  });

  emergencyList = emergencyList.filter(function (c) {
    return c.contactPhone !== deleted.contactPhone;
  });

  localStorage.setItem("Contact", JSON.stringify(contactList));
  localStorage.setItem("Favourite", JSON.stringify(favouriteList));
  localStorage.setItem("Emergency", JSON.stringify(emergencyList));

  displayContact();
  displayEmergency();
  displayFavourite();
}

function favBtn(index) {
  contactList[index].contactFav = true;

  localStorage.setItem("Contact", JSON.stringify(contactList));

  // Update favouriteList
  favouriteList = contactList.filter(function (c) {
    return c.contactFav;
  });
  localStorage.setItem("Favourite", JSON.stringify(favouriteList));

  // Update display
  displayContact();
  displayFavourite();

  document.querySelector(".btn-fav-reg").classList.toggle("d-none");
  document.querySelector(".btn-fav-solid").classList.toggle("d-none");
}

function unFavBtn(index) {
  contactList[index].contactFav = false;

  localStorage.setItem("Contact", JSON.stringify(contactList));

  // Update favouriteList
  favouriteList = contactList.filter(function (c) {
    return c.contactFav;
  });
  localStorage.setItem("Favourite", JSON.stringify(favouriteList));

  // Update display
  displayContact();
  displayFavourite();

  document.querySelector(".btn-fav-reg").classList.remove("d-none");
  document.querySelector(".btn-fav-solid").classList.add("d-none");
}

function emergBtn(index) {
  contactList[index].contactEmerg = true;

  localStorage.setItem("Contact", JSON.stringify(contactList));

  // Update favouriteList
  emergencyList = contactList.filter(function (c) {
    return c.contactEmerg;
  });
  localStorage.setItem("Emergency", JSON.stringify(emergencyList));

  // Update display
  displayContact();
  displayEmergency();

  document.querySelector(".btn-emerg-reg").classList.add("d-none");
  document.querySelector(".btn-emerg-solid").classList.remove("d-none");
}

function unEmergBtn(index) {
  contactList[index].contactEmerg = false;

  localStorage.setItem("Contact", JSON.stringify(contactList));

  // Update favouriteList
  emergencyList = contactList.filter(function (c) {
    return c.contactEmerg;
  });
  localStorage.setItem("Emergency", JSON.stringify(emergencyList));

  // Update display
  displayContact();
  displayEmergency();

  document.querySelector(".btn-emerg-reg").classList.remove("d-none");
  document.querySelector(".btn-emerg-solid").classList.add("d-none");
}

function search() {
  var search = searchContact.value;

  box = ``;

  for (var i = 0; i < contactList.length; i++) {
    if (
      contactList[i].contactName.toUpperCase().includes(search.toUpperCase()) ||
      contactList[i].contactEmail.includes(search) ||
      contactList[i].contactPhone.includes(search)
    ) {
      box += `<div class="col-12 col-md-6">
    <div class="border border-2 border-secondary border-opacity-10 rounded-3">
                                 <div class="inner m-3">
                                    <div class="rounded-3">
                                        <div class="d-flex justify-content-start align-items-center">
                                            <div class="position-relative">
                                                <div
                                                    class="contact-pic p-3 rounded-4 d-flex justify-content-center align-items-center me-2">
                                                    <span class="text-white fw-bolder">
                                                    ${contactList[i].contactName
                                                      .charAt(0)
                                                      .toUpperCase()}</span>
                                                </div>
                                                <div
                                                    class="i-name rounded-circle position-absolute top-0 end-0 bg-warning d-none">
                                                    <i class="fa-solid fa-star text-white fs-10"></i>
                                                </div>
                                                <div
                                                    class="i-name rounded-circle position-absolute bottom-0 end-0 bg-danger d-none">
                                                    <i class="fa-solid fa-heartbeat text-white fs-10"></i>
                                                </div>
                                            </div>

                                            <div class="contact-info">
                                                <div class="name-num">
                                                    <h3 class="fw-bolder fs-6">${
                                                      contactList[i].contactName
                                                    }</h3>
                                                    <div
                                                        class="num d-flex justify-content-start align-items-center gap-2">
                                                        <div
                                                            class="d-flex justify-content-center p-2 rounded-3 bg-info-subtle">
                                                            <i class="fa-solid fa-phone text-primary fs-8"></i>
                                                        </div>
                                                        <span class="fs-14">${
                                                          contactList[i]
                                                            .contactPhone
                                                        }</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="other mt-3">
                                            <div class="email d-flex justify-content-start align-items-center gap-2">
                                                <div
                                                    class="d-flex justify-content-center p-2 rounded-3 bg-purple-light">
                                                    <i class="fa-solid fa-envelope fs-10 text-purple"></i>
                                                </div>
                                                <span class="fs-14">${
                                                  contactList[i].contactEmail
                                                }</span>
                                            </div>

                                            <div
                                                class="location d-flex justify-content-start align-items-center gap-2 mt-2">
                                                <div
                                                    class="d-flex justify-content-center p-2 rounded-3 bg-success-subtle">
                                                    <i class="fa-solid fa-location-dot fs-10 text-success"></i>
                                                </div>
                                                <span class="fs-14">${
                                                  contactList[i].contactAddress
                                                }</span>
                                            </div>

                                            <div class="d-flex justify-content-start align-items-center gap-3 mt-2">
                                                <span
                                                    class="bg-success-subtle text-success py-1 px-2 fs-12 rounded">${
                                                      contactList[i].contactType
                                                    }</span>
                                                <div class="bg-danger-subtle text-danger rounded fs-10 py-1 px-2 d-none">
                                                    <i class="fa-solid fa-heartbeat "></i> Emergency
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div class="bg-secondary bg-opacity-10">
                                    <div class="contact-footer p-2">
                                        <div class="d-flex justify-content-between align-items-center">
                                            <div class="d-flex justify-content-center align-items-center gap-2">
                                                <button type="submit" class="btn btn-call border-0"><i
                                                        class="fa-solid fa-phone text-success"></i></button>
                                                <button type="submit" class="btn btn-mail border-0"><i
                                                        class="fa-solid fa-envelope text-purple"></i></button>
                                            </div>

                                            <div class="right-btn">
                                                <button class="btn btn-fav-reg p-2 rounded" onclick="favBtn(${i})"><i
                                                        class="fa-regular fa-star text-secondary fs-14"></i></button>
                                                <button class="btn btn-fav-solid d-none p-2 rounded" onclick="unFavBtn(${i})"><i
                                                        class="fa-solid fa-star text-warning fs-14"></i></button>
                                                <button class="btn btn-emerg-reg p-2 rounded"><i
                                                        class="fa-regular fa-heart text-secondary fs-14" onclick="emergBtn(${i})"></i></button>
                                                <button class="btn btn-emerg-solid d-none p-2 rounded"><i
                                                        class="fa-solid fa-heartbeat text-danger fs-14" onclick="unEmergBtn(${i})"></i></button>
                                                <button class="btn btn-edit p-2 rounded"><i
                                                        class="fa-solid fa-pen text-secondary fs-14"></i></button>
                                                <button class="btn btn-del p-2 rounded" onclick="deleteContact(${i})"><i
                                                        class="fa-solid fa-trash text-secondary fs-14"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                               </div>
                               </div>`;
    }
  }

  allContact.innerHTML = box;
}

function nameValidation() {
  var namePattern = /^[A-Z][a-zA-Z]{2,15}$/;

  if (namePattern.test(userName.value)) {
    userName.classList.add("is-valid");
    userName.classList.remove("is-invalid");

    return true;
  } else {
    userName.classList.add("is-invalid");
    userName.classList.remove("is-valid");

    return false;
  }
}

function emailValidation() {
  var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (emailPattern.test(userEmail.value)) {
    userEmail.classList.add("is-valid");
    userEmail.classList.remove("is-invalid");

    return true;
  } else {
    userEmail.classList.add("is-invalid");
    userEmail.classList.remove("is-valid");

    return false;
  }
}

function phoneValidation() {
  var phonePattern = /^01[0125][0-9]{8}$/;

  if (phonePattern.test(userPhone.value)) {
    userPhone.classList.add("is-valid");
    userPhone.classList.remove("is-invalid");

    return true;
  } else {
    userPhone.classList.add("is-invalid");
    userPhone.classList.remove("is-valid");

    return false;
  }
}
