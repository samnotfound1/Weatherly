//loading page work 
let loading=document.querySelector(".loading");
let sunny=document.querySelector(".sunnyloading");
let cloud=document.querySelector(".cloudloading ");
let uncloud=document.querySelector(".loading button");


//adding event listener so that when the button is clicked the sun rotates and the cloud moves to the left and main page is displayed
uncloud.addEventListener("click",()=>{
    console.log(sunny,cloud,uncloud);
    sunny.style.animation = "rotate 2s 1 linear";
  sunny.style.transformOrigin = "50% 50%";
    cloud.style.animation="slide2 2s 1 0.3s ease-out forwards";
    setTimeout(()=>{
        loading.style.animation="fade 1s 1 ease-out forwards";
        loading.style.display="none";
    },2000);
})


// vai=riable definitions and api URL and key
let URL = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}"
let URL2 = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}"
let key = "fbb71424c29abe57875a7e53ddc8e480"
let key2 = "4d1b0d5d5e3c46feb5bbec4d961bb37a"
let city = document.querySelector(".city");
let temp = document.querySelector(".temp");
let sunrise = document.querySelector(".sunrise");
let sunset = document.querySelector(".sunset");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");
let input = document.querySelector(".search input");
let search = document.querySelector(".search button");


// hover over forecast to display graph
let forecast0 = document.querySelector(".forecast0");
let forecast1 = document.querySelector(".forecast1");
let forecast2 = document.querySelector(".forecast2");
let graph0 = document.querySelector(".graph0");
let graph1 = document.querySelector(".graph1");
let graph2 = document.querySelector(".graph2");
forecast0.addEventListener("mouseover", async (evt) => {
  evt.preventDefault();
  graph0.style.display = "block";
});
forecast0.addEventListener("mouseout", async (evt) => {
  evt.preventDefault();
  graph0.style.display = "none";
});
forecast1.addEventListener("mouseover", async (evt) => {
  evt.preventDefault();
  graph1.style.display = "block";
});
forecast1.addEventListener("mouseout", async (evt) => {
  evt.preventDefault();
  graph1.style.display = "none";
});
forecast2.addEventListener("mouseover", async (evt) => {
  evt.preventDefault();
  graph2.style.display = "block";
});
forecast2.addEventListener("mouseout", async (evt) => {
  evt.preventDefault();
  graph2.style.display = "none";
});






// add event listener to search button and change sunrise,sunset time according to the timezone and update humdity,wind,temp and city name
search.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let cityname = input.value;
  let finalURL = `${URL.replace("{city name}", cityname).replace("{API key}", key)}`;
  let response = await fetch(finalURL);
  let data = await response.json();
  console.log(data);
  city.innerText = data.name;
  temp.innerText = Math.round(data.main.temp - 273) + "°C";
  let sunriseTime = new Date(data.sys.sunrise * 1000);
  let sunsetTime = new Date(data.sys.sunset * 1000);
  sunrise.innerText = sunriseTime.toLocaleTimeString();
  sunset.innerText = sunsetTime.toLocaleTimeString();
  humidity.innerText = data.main.humidity + "%";
  wind.innerText = data.wind.speed + "km/h";
  let lat = data.coord.lat;
  let lon = data.coord.lon;
  console.log(lat, lon)
  let finalURL2 = `${URL2.replace("{lat}", lat).replace("{lon}", lon).replace("{API key}", key2)}`;
  let response2 = await fetch(finalURL2);
  let data2 = await response2.json();
  console.log(data2);




//counter points to the index in list array where the time is 00:00 of new day
  for (let i = 0; i < 3; i++) {
    let counter = 0;
    for (let j = 0; j < 8; j++) {
      if (data2.list[j].dt_txt.includes("00:00:00")) {
        break;
      }
      else {
        counter++;
      }
    }


    let date = new Date(data2.list[((i) * 8)].dt * 1000);
   

    let forecast = document.querySelector(".forecast" + i);
    let forecastDay = document.querySelector(".forecastDay" + i);
    let forecastTemp = document.querySelector(".forecastTemp" + i);
    let forecastIcon = document.querySelector(".forecastIcon" + i);
    let forecastDate = new Date(data2.list[(i + 1) * 8].dt * 1000).toLocaleDateString();
    //converting date to day
    let days = [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat","Sun"];
    forecastDay.innerText = days[date.getDay()];

    forecastTemp.innerText = Math.round(data2.list[counter + 4 + ((i) * 8)].main.temp - 273) + "°C";
    //displaying temp of 12 noon
 
    //adding icon according to the weather
    if (data2.list[counter + 4 + ((i) * 8)].weather[0].main === "Clouds") {
      forecastIcon.src = "Assets/clouds.png";
      forecastIcon.style.animation="jiggle 1s infinite";
    }
    else if (data2.list[counter + 4 + ((i) * 8)].weather[0].main === "Clear") {
      forecastIcon.src = "Assets/clear.png";
    }
    else if (data2.list[counter + 4 + ((i) * 8)].weather[0].main === "Rain") {
      forecastIcon.src = "Assets/rain.png";
    }
    else if (data2.list[counter + 4 + ((i) * 8)].weather[0].main === "Snow") {
      forecastIcon.src = "snow.png";
      forecastIcon.style.animation="Assets/jiggle 1s infinite";
    }
    console.log(data2.list[counter ].dt_txt)

    //graph for temperature and humidity for 3 days
    let ctx= document.querySelector(".graph"+i).getContext("2d");
    let chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ["00:00", "03:00", "06:00", "09:00", "12:00", "15:00", "18:00", "21:00"],
        datasets: [{
          label: 'Temperature(°C)',
          data: [Math.round(data2.list[counter + ((i) * 8)].main.temp - 273), Math.round(data2.list[counter + 1 + ((i) * 8)].main.temp - 273), Math.round(data2.list[counter + 2 + ((i) * 8)].main.temp - 273), Math.round(data2.list[counter + 3 + ((i) * 8)].main.temp - 273), Math.round(data2.list[counter + 4 + ((i) * 8)].main.temp - 273), Math.round(data2.list[counter + 5 + ((i) * 8)].main.temp - 273), Math.round(data2.list[counter + 6 + ((i) * 8)].main.temp - 273), Math.round(data2.list[counter + 7 + ((i) * 8)].main.temp - 273)],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },{
        label: 'Humidity(%)',
        data: [data2.list[counter + ((i) * 8)].main.humidity, data2.list[counter + 1 + ((i) * 8)].main.humidity, data2.list[counter + 2 + ((i) * 8)].main.humidity, data2.list[counter + 3 + ((i) * 8)].main.humidity, data2.list[counter + 4 + ((i) * 8)].main.humidity, data2.list[counter + 5 + ((i) * 8)].main.humidity, data2.list[counter + 6 + ((i) * 8)].main.humidity, data2.list[counter + 7 + ((i) * 8)].main.humidity],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
        }
      ]
      },
      
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    //seting  display to none
    let disp= document.querySelector(".graph"+i);
    disp.style.display="none";
    
  }
  input.value = "";
  input.blur();
  //change sunrise and sunset time according to the timezone
  let timezone = data.timezone;
  // console.log(timezone);
  let offset = new Date().getTimezoneOffset();
  let sunriseTimezone = new Date(data.sys.sunrise * 1000 + (timezone - offset) * 60 * 1000);
  let sunsetTimezone = new Date(data.sys.sunset * 1000 + (timezone - offset) * 60 * 1000);
  sunrise.innerText = sunriseTimezone.toLocaleTimeString();
  sunset.innerText = sunsetTimezone.toLocaleTimeString();

});



