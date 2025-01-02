let cityName = "junagadh";
const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${cityName}`;
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "c1742548b5msh758b7b081d583f2p1e3a93jsn3e27a39a2465",
    "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
  },
};
async function makeweatherapp(url, options, city) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error("Failed to fetch weather data. Please try again later.");
    }
    const result = await response.json();
    console.log(result);

    document.querySelector(".city-name").textContent = city;
    document.querySelector(".temp").textContent = result.temp + "°C";
    document.querySelector("#location").innerHTML = city;
    document.querySelector("#humidity").innerHTML = result.humidity;
    document.querySelector("#wind").innerHTML = result.wind_speed;
    document.querySelector(".cloud").innerHTML = result.cloud_pct + "%";
    document.querySelector(".feels").innerHTML = result.feels_like + " deg";
    document.querySelector(".humidity").innerHTML = result.humidity + "%";
    document.querySelector(".maxtemp").innerHTML = result.max_temp + "°C";
    document.querySelector(".mintemp").innerHTML = result.min_temp + "°C";
    document.querySelector(".sunrise").innerHTML = result.sunrise;
    document.querySelector(".sunset").innerHTML = result.sunset;
    document.querySelector(".temp2").innerHTML = result.temp + "°C";
    document.querySelector(".winddeg").innerHTML = result.wind_degrees;
    document.querySelector(".windspeed").innerHTML = result.wind_speed;
  } catch (error) {
    console.error(error);
    alert("Failed to fetch weather data. Please try again later.", error);
  }
}
makeweatherapp(url, options, cityName);

// Promise methods::::
// function makeweatherapp(url, options, city) {
//   return new Promise((resolve, reject) => {
//     fetch(url, options)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error("Failed to fetch weather data. Please try again later.");
//         }
//         return response.json();
//       })
//       .then(result => {
//         console.log(result);

//         document.querySelector(".city-name").textContent = city;
//         document.querySelector(".temp").textContent = result.temp + "°C";
//         document.querySelector("#location").innerHTML = city;
//         document.querySelector("#humidity").innerHTML = result.humidity;
//         document.querySelector("#wind").innerHTML = result.wind_speed;
//         document.querySelector(".cloud").innerHTML = result.cloud_pct + "%";
//         document.querySelector(".feels").innerHTML = result.feels_like + " deg";
//         document.querySelector(".humidity").innerHTML = result.humidity + "%";
//         document.querySelector(".maxtemp").innerHTML = result.max_temp + "°C";
//         document.querySelector(".mintemp").innerHTML = result.min_temp + "°C";
//         document.querySelector(".sunrise").innerHTML = result.sunrise;
//         document.querySelector(".sunset").innerHTML = result.sunset;
//         document.querySelector(".temp2").innerHTML = result.temp + "°C";
//         document.querySelector(".winddeg").innerHTML = result.wind_degrees;
//         document.querySelector(".windspeed").innerHTML = result.wind_speed;

//         resolve();
//       })
//       .catch(error => {
//         console.error(error);
//         alert("Failed to fetch weather data. Please try again later.", error);
//         reject(error);
//       });
//   });
// }

// makeweatherapp(url, options, cityName);

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  // document.querySelector(".weather-data").style.display = "none";
  // document.getElementById("submit").disabled = true;
  let cityName = document.querySelector("#search").value;

  const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${cityName}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "c1742548b5msh758b7b081d583f2p1e3a93jsn3e27a39a2465",
      "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
    },
  };

  makeweatherapp(url, options, cityName);
});
