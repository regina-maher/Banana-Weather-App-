// DATE AND TIME

function formatDate(timeStamp) {
  let time = new Date(timeStamp);
  let minutes = time.getMinutes();
  let hours = time.getHours();

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let currentTime = `${hours}:${minutes}`;
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[time.getDay()];

  document.querySelector(
    "#day-time"
  ).innerHTML = `<strong>${day}</strong> ${currentTime}`;

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[time.getMonth()];
  let date = time.getDate();
  let year = time.getFullYear();
  let currentDate = `${date} ${month} ${year}`;

  document.querySelector("#date").innerHTML = `${currentDate}`;
}

// FORMAT BACKGROUND COLOUR

function changeBackground(time) {
  let hours = time.getHours();
  if (hours > 5 && hours < 7) {
    document.body.style.background =
      "linear-gradient(90.4deg, rgb(253, 240, 233) 2.2%, rgb(255, 194, 203) 96.2%)";
  }
  if (hours > 7 && hours < 10) {
    document.body.style.background =
      "linear-gradient(90.1deg, rgb(167, 220, 225) 11.2%, rgb(217, 239, 242) 88.9%)";
  }
  if (hours > 17 && hours < 20) {
    document.body.style.background =
      "linear-gradient(270.4deg, rgb(253, 240, 233) 2.2%, rgb(255, 194, 203) 96.2%)";
  }
  if (hours > 19 && hours <= 24) {
    document.body.style.background =
      "linear-gradient(270deg, #09203f 0%, #537895 100%)";
    document.querySelector("#gitHubLink").style.color = "white";
  }
  if (hours > 0 && hours <= 5) {
    document.body.style.background =
      "linear-gradient(90deg, #09203f 0%, #537895 100%)";
    document.querySelector("#gitHubLink").style.color = "white";
  }
}

changeBackground(new Date());

// WEEK FORCAST DAYS

let time = new Date();

let shortDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

let dayOne = time.getDay() + 1;
if (dayOne > 6) {
  document.querySelector("#day-one-day").innerHTML =
    shortDays[time.getDay() - 6];
} else {
  document.querySelector("#day-one-day").innerHTML =
    shortDays[time.getDay() + 1];
}

let dayTwo = time.getDay() + 2;
if (dayTwo > 6) {
  document.querySelector("#day-two-day").innerHTML =
    shortDays[time.getDay() - 5];
} else {
  document.querySelector("#day-two-day").innerHTML =
    shortDays[time.getDay() + 2];
}

let dayThree = time.getDay() + 3;
if (dayThree > 6) {
  document.querySelector("#day-three-day").innerHTML =
    shortDays[time.getDay() - 4];
} else {
  document.querySelector("#day-three-day").innerHTML =
    shortDays[time.getDay() + 3];
}

let dayFour = time.getDay() + 4;
if (dayFour > 6) {
  document.querySelector("#day-four-day").innerHTML =
    shortDays[time.getDay() - 3];
} else {
  document.querySelector("#day-four-day").innerHTML =
    shortDays[time.getDay() + 4];
}

let dayFive = time.getDay() + 5;
if (dayFive > 6) {
  document.querySelector("#day-five-day").innerHTML =
    shortDays[time.getDay() - 2];
} else {
  document.querySelector("#day-five-day").innerHTML =
    shortDays[time.getDay() + 5];
}

// SEARCH LOCATION

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-location").value;
  document.querySelector("#city").innerHTML = `${city}`;
  search(city);
}

document
  .querySelector("#search-city-form")
  .addEventListener("submit", searchCity);

// CURRENT LOCATION

function currentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let unit = `metric`;
  let apiKey = `3fb188379e6ffcf616e7cdbd010c6434`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function searchCurrentLocation() {
  navigator.geolocation.getCurrentPosition(currentPosition);
}

document
  .querySelector("#current")
  .addEventListener("click", searchCurrentLocation);

// WEATHER DATA

function showWeather(response) {
  // CITY NAME
  let city = response.data.name;
  document.querySelector("#city").innerHTML = `${city}`;

  // CURRENT FORECAST
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#forcast").innerHTML =
    response.data.weather[0].description;

  // MIN & MAX TEMPS

  document.querySelector("#min-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#max-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );

  // CONDITIONS

  document.querySelector("#humidity").innerHTML = `${Math.round(
    response.data.main.humidity
  )} %`;
  document.querySelector("#feels-like").innerHTML = `${Math.round(
    response.data.main.feels_like
  )} °C`;
  document.querySelector("#windspeed").innerHTML = `${Math.round(
    response.data.wind.speed
  )} km/h`;

  // LAST UPDATED

  formatDate(response.data.dt * 1000);

  //  SUN TIMES

  console.log(new Date(response.data.sys.sunrise).toUTCString());
  let secRiseHour = response.data.sys.sunrise;
  let dateSunRise = new Date(secRiseHour * 1000);

  let sunRiseH = dateSunRise.getHours();

  let secRiseMin = response.data.sys.sunrise;
  let minSunRise = new Date(secRiseMin * 1000);
  let sunRiseM = minSunRise.getHours();

  if (sunRiseM > 10) {
    document.querySelector("#sun-rise").innerHTML = `0${sunRiseH}:${sunRiseM}`;
  } else {
    document.querySelector("#sun-rise").innerHTML = `0${sunRiseH}:0${sunRiseM}`;
  }

  let secSetHour = response.data.sys.sunset;
  let dateSunSet = new Date(secSetHour * 1000);
  let sunSeteH = dateSunSet.getHours();

  let secSetMin = response.data.sys.sunset;
  let minSunSet = new Date(secSetMin * 1000);
  let sunSetM = minSunSet.getHours();

  if (sunSetM > 10) {
    document.querySelector("#sun-set").innerHTML = `${sunSeteH}:${sunSetM}`;
  } else {
    document.querySelector("#sun-set").innerHTML = `${sunSeteH}:0${sunSetM}`;
  }
}

// AXIOS SEARCH FUNCTION

function search(city) {
  let unit = `metric`;
  let apiKey = `3fb188379e6ffcf616e7cdbd010c6434`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}
search("Sydney");
