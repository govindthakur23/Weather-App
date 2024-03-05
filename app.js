const API_key = `34ddee473de683386f7d7e83e0e4c461`
const form = document.querySelector("form")
const search = document.querySelector("#search")
const weather = document.querySelector("#weather")
const clock = document.getElementById('clock');
const dateElement = document.getElementById('date');

const getWeather = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`
    const response = await fetch(url);
    const data = await response.json()
    return showWeather(data);
}

const showWeather = async (data) => {
    console.log(data);
    if (data.cod == "404") {
        weather.innerHTML = `<h2 style=" color:white; font-style:italic; "> City Not Found </h2>`
    }
    weather.innerHTML =
        ` 

        <div style="color: white;">
            <h2 >${data.main.temp} °C</h2>
            <h3 >${data.weather[0].main}</h3>
            <h3 > ${data.name}</h3>
        </div>
        <div id="information" style="color: white;"> 
            <h3 >Temperature : ${data.main.temp} °C</h3>
            <h3>Wind Speed: ${(data.wind.speed * 3.6).toFixed(2)} km/h</h3>
            <h3>Visibility: ${data.visibility} meters</h3>
        </div>`
}


function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const amPM = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; 
    const timeString = `${hours}:${minutes}:${seconds} ${amPM}`; 
    clock.textContent = timeString;

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString(undefined, options);
    dateElement.textContent = dateString;
}

// Call updateClock function every second to keep the clock updated
setInterval(updateClock, 10);


form.addEventListener("submit", function (event) {
    getWeather(search.value)
    event.preventDefault()                                 // It stop forms Reloding 
})