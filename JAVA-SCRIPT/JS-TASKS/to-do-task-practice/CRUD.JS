let form = document.querySelector("form");
let disdata = document.querySelector("div");
let updateindex = null;

form.addEventListener("submit", function (s) {
  s.preventDefault();
  let name = document.querySelector("#nm").value.trim();
  let email = document.querySelector("#email").value.trim();
  let no = document.querySelector("#num").value.trim();
  let year = document.querySelector("#year").value.trim();

  //   console.log(name);
  //   console.log(email);
  //   console.log(no);
  let timelinedata = JSON.parse(localStorage.getItem("timelinedata")) || [];

  if (name === "") {
    alert("Please Enter a Name");
  }
  if (email === "") {
    alert("Please Enter a Email");
  }
  if (no === "") {
    alert("Please Enter a Number");
  }
  if (year === "") {
    alert("Please Enter a Year");
  }

  if (!Array.isArray(timelinedata)) {
    timelinedata = [];
  }
  if (updateindex !== null) {
    timelinedata[updateindex] = {
      name: name,
      email: email,
      no: no,
      year: year,
    };
    updateindex = null;
  } else {
    if (name && email && no && year) {
      timelinedata.push({
        name: name,
        email: email,
        no: no,
        year: year,
      });
    } else {
      alert("Please Fill Up All The Details");
      return;
    }
  }

  let sortdata = timelinedata.sort((a, b) => a.year - b.year);

  localStorage.setItem("timelinedata", JSON.stringify(sortdata));
  s.target.reset();

  displaydata();
});

function displaydata() {
  let timeline = document.querySelector(".timeline");
  timeline.innerHTML = "";

  let timelinedata = JSON.parse(localStorage.getItem("timelinedata")) || [];

  timelinedata.forEach((item, index) => {
    let eventHTML = `
      <div class="event">
        <p>Name: ${item.name}</p>
        <p>Email: ${item.email}</p>
        <p>Number: ${item.no}</p>
        <p>Year: ${item.year}</p>
        <i class="fa-solid fa-pen-to-square" onclick="update(${index})"></i>
        <i class="fa-solid fa-trash" onclick="del(${index})"></i>
        <hr>
      </div>
    `;
    timeline.innerHTML += eventHTML;
  });
}
displaydata();

function del(i) {
  let timelinedata = JSON.parse(localStorage.getItem("timelinedata")) || [];

  timelinedata.splice(i, 1);

  localStorage.setItem("timelinedata", JSON.stringify(timelinedata));

  displaydata();
}

function update(i) {
  let timelinedata = JSON.parse(localStorage.getItem("timelinedata")) || [];

  let final = timelinedata[i];
  console.log(final);
  form.nm.value = final.name;
  form.email.value = final.email;
  form.num.value = final.no;
  form.year.value = final.year;

  updateindex = i;

  localStorage.setItem("timelinedata", JSON.stringify(timelinedata));
}
