let form = document.querySelector(".form");
let container = document.querySelector(".container");
let showFormButton = document.querySelector(".showFormButton");
let editIndex = null;

showFormButton.addEventListener("click", () => {
  if (form.style.display === "none" || form.style.display === "") {
    form.style.display = "block";
  } else {
    form.style.display = "none";
  }
});

document.getElementById("upload-img").addEventListener("change", function () {
  let label = document.querySelector(".upload-area");
  let file = this.files[0];
  let imgPreview = document.getElementById("img-preview");
  let validExtensions = ["image/jpeg", "image/png"];

  if (validExtensions.includes(file.type)) {
    let reader = new FileReader();

    reader.onload = function (e) {
      imgPreview.src = e.target.result;
      label.style.padding = 0;
      label.innerHTML = "";
    };

    reader.readAsDataURL(file);
  } else {
    imgPreview.src = "";
    alert("Please upload a valid image file (JPEG or PNG).");
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let name = e.target.name.value;
  let email = e.target.email.value;
  let number = e.target.number.value;
  let dob = e.target.dob.value;
  let imageFile = e.target.image.files[0];
  let imageUrl = "";

  if (imageFile) {
    imageUrl = URL.createObjectURL(imageFile);
  } else {
    imageUrl = document.querySelector(".upload-area img").src;
  }

  let users_cards = JSON.parse(localStorage.getItem("userCard_details")) || [];

  if (editIndex !== null) {
    users_cards[editIndex] = {
      imageUrl: imageUrl,
      name: name,
      email: email,
      number: number,
      dob: dob,
    };
    editIndex = null;
  } else {
    users_cards.push({
      imageUrl: imageUrl,
      name: name,
      email: email,
      number: number,
      dob: dob,
    });
  }
  localStorage.setItem("userCard_details", JSON.stringify(users_cards));

  form.reset();

  form.style.display = "none";

  makeCards(users_cards);
});

function makeCards(users) {
  container.innerHTML = "";

  users.forEach((element, index) => {
    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <i class="fa-regular fa-pen-to-square" onclick="edit(${index})"></i> 
      <i class="fa-regular fa-trash-can" onclick="del(${index})"></i>
      <div class="img-container">
        <img src="${element.imageUrl}" alt="" />
      </div>
      <div class="card-body">
        <h2 class="full-name">Name: <span>${element.name}</span></h2>
        <p class="email">Email: <span>${element.email}</span></p>
        <p class="number">Number: <span>${element.number}</span></p>
        <p class="dob">DOB: <span>${element.dob}</span></p>
      </div>`;
    container.appendChild(card);
  });
}

function del(i) {
  let users = JSON.parse(localStorage.getItem("userCard_details")) || [];

  if (confirm("Are you sure you want to delete this item?")) {
    users.splice(i, 1);
    localStorage.setItem("userCard_details", JSON.stringify(users));
    makeCards(users);
  }
}

function edit(i) {
  let users = JSON.parse(localStorage.getItem("userCard_details")) || [];
  let user = users[i];

  form.name.value = user.name;
  form.email.value = user.email;
  form.number.value = user.number;
  form.dob.value = user.dob;

  editIndex = i;

  let label = document.querySelector(".upload-area");
  label.style.padding = 0;
  label.innerHTML = "";
  let imagePreview = document.createElement("img");
  imagePreview.src = user.imageUrl;
  label.appendChild(imagePreview);

  form.style.display = "block";
}

makeCards(JSON.parse(localStorage.getItem("userCard_details")) || []);
