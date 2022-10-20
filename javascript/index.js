function search() {
  var countrycode = document.getElementById("locationSearch").value;
  if (countrycode.length > 3) {
    getCurrentWeather(countrycode);
    getTomorrowWeather(countrycode);
    getNextWeather(countrycode);
  }
}
document
  .getElementById("locationSearch")
  .addEventListener("keyup", function () {
    search();
  });
let weekdays = new Array(7);
weekdays[0] = "Sunday";
weekdays[1] = "Monday";
weekdays[2] = "Tuesday";
weekdays[3] = "Wednesday";
weekdays[4] = "Thursday";
weekdays[5] = "Friday";
weekdays[6] = "Saturday";
let months = new Array(12);
months[0] = "January";
months[1] = "February";
months[2] = "March";
months[3] = "April";
months[4] = "May";
months[5] = "June";
months[6] = "July";
months[7] = "August";
months[8] = "September";
months[9] = "October";
months[10] = "November";
months[11] = "December";
let a = new Date();
function todayName() {
  let a = new Date();
  let dayName = weekdays[a.getDay()];
  document.getElementById("todayDay").innerHTML = dayName;
}
todayName();
function todayMonth() {
  let date = new Date();
  let dayNo = date.getDate();
  let b = new Date();
  let monthName = months[b.getMonth()];
  document.getElementById("todayDate").innerHTML = `${dayNo}${monthName}`;
}
todayMonth();
function tomorrowName() {
  let a = new Date();
  let dayName = weekdays[a.getDay() + 1];
  document.getElementById("tomorrowDay").innerHTML = dayName;
}
tomorrowName();
function nextDay() {
  let a = new Date();
  let dayName = weekdays[a.getDay() + 2];
  document.getElementById("nextDay").innerHTML = dayName;
}
nextDay();

async function getCurrentWeather(countrycode) {
  // Variables //
  let date = new Date();
  let currentHour = date.getHours();
  // Variables //

  // API Fetch //
  let res = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=202fd13ae4c54761ba4135302221910&q=${countrycode}`
  );
  let finalres = await res.json();
  // API Fetch //

  //Location Name //
  let locationName = finalres.location.name;
  document.getElementById("location").innerHTML = locationName;
  //Location Name //

  //Degree Temp //
  let degree = Math.round(finalres.current.temp_c);
  document.getElementById("num").innerHTML = degree;
  //Degree Temp

  //Weather Icon //

  let icon = finalres.current.condition.icon;
  document.getElementById("wIcon").setAttribute("src", `https:${icon}`);
  //Weather Icon //

  //Weather Status //
  let status = finalres.current.condition.text;
  document.getElementById("status").innerHTML = status;
  if(status =="Partly cloudy"){
    document.getElementById("today").style.backgroundImage= "url(images/partly-cloud-gif.gif)"
    document.getElementById("status").style.color="black"
    document.getElementById("today").style.color="black"
    document.getElementById("degree").style.color="black"
  }else if(status=="Overcast"){
    document.getElementById("today").style.backgroundImage= "url(images/overcast-gif.gif)"
    document.getElementById("status").style.color="white"
    document.getElementById("today").style.color="white"
    document.getElementById("degree").style.color="white"
  }else if(status=="Sunny"){
    document.getElementById("today").style.backgroundImage= "url(images/sunny-gif.gif)"
    document.getElementById("status").style.color="white"
    document.getElementById("today").style.color="white"
    document.getElementById("degree").style.color="white"
  }else if(status=="Fog"){
    document.getElementById("today").style.backgroundImage= "url(images/fog-gif.gif)"
    document.getElementById("status").style.color="black"
    document.getElementById("today").style.color="black"
    document.getElementById("degree").style.color="black"

  }
  else if(status=="Clear"){
    document.getElementById("today").style.backgroundImage= "url(images/clear-gif.gif)"
    document.getElementById("status").style.color="black"
    document.getElementById("today").style.color="black"
    document.getElementById("degree").style.color="black"
  }else if(status=="Light snow"){
    document.getElementById("today").style.backgroundImage= "url(images/snow-gif.gif)"
  }else if(status== "Light rain" || status== "Moderate rain" || status== "Patchy rain possible" || status =="Light rain shower"|| status =="Heavy rain" || status=="Moderate or heavy rain shower"){
    document.getElementById("today").style.backgroundImage= "url(images/rain-gif.gif)"
    document.getElementById("status").style.color="white"
    document.getElementById("today").style.color="white"
    document.getElementById("degree").style.color="white"
  }
    //Weather Status //


  let forecast = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=202fd13ae4c54761ba4135302221910&q=${countrycode}&days=7`
  );
  let forecastData = await forecast.json();
  let rain =
    forecastData.forecast.forecastday[0].hour[currentHour].chance_of_rain;
  document.getElementById("rainPer").innerHTML = `${rain}%`;
  let windSpeed =
    forecastData.forecast.forecastday[0].hour[currentHour].wind_kph;
  document.getElementById("windSpeed").innerHTML = `${windSpeed}km/h`;
  let windDir = forecastData.current.wind_dir;

  function windDirection() {
    switch (windDir) {
      case "NW":
        document.getElementById("windDir").innerHTML = "North West";
        break;
      case "N":
        document.getElementById("windDir").innerHTML = "North";
        break;
      case "NE":
        document.getElementById("windDir").innerHTML = "North East";
        break;
      case "W":
        document.getElementById("windDir").innerHTML = "West";
        break;
      case "E":
        document.getElementById("windDir").innerHTML = "East";
        break;
      case "SW":
        document.getElementById("windDir").innerHTML = "South West";
        break;
      case "SE":
        document.getElementById("windDir").innerHTML = "South East";
        break;
      case "S":
        document.getElementById("windDir").innerHTML = "South";
        break;
    }
  }
  windDirection();
}
getCurrentWeather("cairo");

async function getTomorrowWeather(countrycode) {
  let forecast = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=202fd13ae4c54761ba4135302221910&q=${countrycode}&days=7`
  );
  let forecastData = await forecast.json();
  let tomorrowIcon = forecastData.forecast.forecastday[1].day.condition.icon;
  document
    .getElementById("tomorrowIcon")
    .setAttribute("src", `https:${tomorrowIcon}`);
  let max = forecastData.forecast.forecastday[1].day.maxtemp_c;
  document.getElementById("max").innerHTML = max;
  let min = forecastData.forecast.forecastday[1].day.mintemp_c;
  document.getElementById("min").innerHTML = min;
  let tomorrowStatus = forecastData.forecast.forecastday[1].day.condition.text;
  document.getElementById("tomorrowStatus").innerHTML = tomorrowStatus;
  if(tomorrowStatus =="Partly cloudy"){
    document.getElementById("tomorrow").style.backgroundImage= "url(images/partly-cloud-gif.gif)"
    document.getElementById("tomorrowStatus").style.color="black"
    document.getElementById("tomorrow").style.color="black"
    document.getElementById("tomorrow-degrees").style.color="black"
  }else if(tomorrowStatus=="Overcast"){
    document.getElementById("tomorrow").style.backgroundImage= "url(images/overcast-gif.gif)"
    document.getElementById("tomorrowStatus").style.color="white"
    document.getElementById("tomorrow").style.color="white"
    document.getElementById("tomorrow-degrees").style.color="white"
  }else if(tomorrowStatus=="Sunny"){
    document.getElementById("tomorrow").style.backgroundImage= "url(images/sunny-gif.gif)"
    document.getElementById("tomorrowStatus").style.color="white"
    document.getElementById("tomorrow").style.color="white"
    document.getElementById("tomorrow-degrees").style.color="white"
  }else if(tomorrowStatus=="Fog"){
    document.getElementById("tomorrow").style.backgroundImage= "url(images/fog-gif.gif)"
    document.getElementById("tomorrowStatus").style.color="black"
    document.getElementById("tomorrow").style.color="black"
    document.getElementById("tomorrow-degrees").style.color="black"

  }
  else if(tomorrowStatus=="Clear"){
    document.getElementById("tomorrow").style.backgroundImage= "url(images/clear-gif.gif)"
    document.getElementById("tomorrowStatus").style.color="black"
    document.getElementById("tomorrow").style.color="black"
    document.getElementById("tomorrow-degrees").style.color="black"
  }else if(tomorrowStatus=="Light snow"){
    document.getElementById("tomorrow").style.backgroundImage= "url(images/snow-gif.gif)"
  }else if(tomorrowStatus== "Light rain" ||tomorrowStatus== "Moderate rain" || tomorrowStatus== "Patchy rain possible" ||tomorrowStatus =="Light rain shower" || tomorrowStatus =="Heavy rain" || tomorrowStatus=="Moderate or heavy rain shower"){
    document.getElementById("tomorrow").style.backgroundImage= "url(images/rain-gif.gif)"
    document.getElementById("tomorrowStatus").style.color="white"
    document.getElementById("tomorrow").style.color="white"
    document.getElementById("tomorrow-degrees").style.color="white"
  }
}

getTomorrowWeather("cairo");

async function getNextWeather(countrycode) {
  let forecast = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=202fd13ae4c54761ba4135302221910&q=${countrycode}&days=7`
  );
  let forecastData = await forecast.json();
  let nextIcon = forecastData.forecast.forecastday[2].day.condition.icon;
  document.getElementById("nextIcon").setAttribute("src", `https:${nextIcon}`);
  let max = forecastData.forecast.forecastday[2].day.maxtemp_c;
  document.getElementById("next-max").innerHTML = max;
  let min = forecastData.forecast.forecastday[2].day.mintemp_c;
  document.getElementById("next-min").innerHTML = min;
  let nextStatus = forecastData.forecast.forecastday[2].day.condition.text;
  document.getElementById("nextStatus").innerHTML = nextStatus;
  if(nextStatus =="Partly cloudy"){
    document.getElementById("next").style.backgroundImage= "url(images/partly-cloud-gif.gif)"
    document.getElementById("nextStatus").style.color="black"
    document.getElementById("next").style.color="black"
    document.getElementById("next-degrees").style.color="black"
  }else if(nextStatus=="Overcast"){
    document.getElementById("next").style.backgroundImage= "url(images/overcast-gif.gif)"
    document.getElementById("nextStatus").style.color="white"
    document.getElementById("next").style.color="white"
    document.getElementById("next-degrees").style.color="white"
  }else if(nextStatus=="Sunny"){
    document.getElementById("next").style.backgroundImage= "url(images/sunny-gif.gif)"
    document.getElementById("nextStatus").style.color="white"
    document.getElementById("next").style.color="white"
    document.getElementById("next-degrees").style.color="white"
  }else if(nextStatus=="Fog"){
    document.getElementById("next").style.backgroundImage= "url(images/fog-gif.gif)"
    document.getElementById("nextStatus").style.color="black"
    document.getElementById("next").style.color="black"
    document.getElementById("next-degrees").style.color="black"

  }
  else if(nextStatus=="Clear"){
    document.getElementById("next").style.backgroundImage= "url(images/clear-gif.gif)"
    document.getElementById("nextStatus").style.color="black"
    document.getElementById("next").style.color="black"
    document.getElementById("next-degrees").style.color="black"
  }else if(nextStatus=="Light snow"){
    document.getElementById("next").style.backgroundImage= "url(images/snow-gif.gif)"
  }else if(nextStatus== "Light rain" ||nextStatus== "Moderate rain" || nextStatus== "Patchy rain possible" ||nextStatus =="Light rain shower" ||nextStatus =="Heavy rain" || nextStatus=="Moderate or heavy rain shower"){
    document.getElementById("next").style.backgroundImage= "url(images/rain-gif.gif)"
    document.getElementById("nextStatus").style.color="white"
    document.getElementById("next").style.color="white"
    document.getElementById("next-degrees").style.color="white"
  }
}
getNextWeather("cairo");
