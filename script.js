const apiKey = "6feddfb8b72ac42e5e50ba927921a1ab"
const apiUrl = "http://api.openweathermap.org/geo/1.0/direct"
const weatherToday = document.getElementById("weatherToday")
const weatherForecast = document.getElementById("weatherForecast")
const test = document.getElementById("test")
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]



// Creating today's weather report

const displayWeather = () => {
    
    // tried with at searchbar first but the data recieved from API was not as expected.
    // let searchValue = searchInput.value 
    // const url = `${apiUrl}?q=${searchValue}&limit=5&appid=${apiKey}`
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&appid=${apiKey}`
   
    
    fetch(url).then((response) => {
        if (!response.ok) {
            throw new Error("We did not manage to recieve the data.")
        }
        return response.json()
    })
    .then((response) => {
        
        const place = response.name 
        const temperature = response.main.temp.toFixed()
        // const feelsLike = response.main.feels_like.toFixed(1) Did not need this anymore after feedback from teacher
        const description = response.weather[0].description
        const currentTime = new Date() 
        // const time = `${currentTime.getHours()}:${currentTime.getMinutes()}` Did not need this anymore after feedback from teacher
        const sunriseRawTime = response.sys.sunrise * 1000
        const sunsetRawTime = response.sys.sunset * 1000
        const sunset = new Date(sunsetRawTime) 
        const sunrise = new Date(sunriseRawTime)
        const sunriseTime = `${sunrise.getHours()}:${sunrise.getMinutes()}`
        const sunsetTime = `${sunset.getHours()}:${sunset.getMinutes()}`
        

        // const icon = ""

        // I tried to insert an icon based on the weather description but did not succeed. Would love to learn this :)
        
        // const descriptonIcon = () => {
        //     const description = response.weather[0].description
    
        //     if(description.includes("clear sky")) {
        //         icon = "https://openweathermap.org/img/wn/01d@2x.png"
        //         console.log("clear sky - works! :)")
        //     } else if (description.includes("few clouds")) {
        //         icon = "https://openweathermap.org/img/wn/02d@2x.png"
        //         console.log("few clouds - works! :)")
        //     } else if (description.includes("scattered clouds")) {
        //         icon = "https://openweathermap.org/img/wn/03d@2x.png"
        //         console.log("scattered vlora - works! :)")    
        //     } else if (description.includes("broken clouds")) {
        //         icon = "https://openweathermap.org/img/wn/04d@2x.png"
        //         console.log("broken clouds - works! :)")   
        //     } else if (description.includes("shower rain")) {
        //         icon = "https://openweathermap.org/img/wn/09d@2x.png"
        //         console.log("shower rain - works! :)") 
        //     } else if (description.includes("rain")) {
        //         icon = "https://openweathermap.org/img/wn/10d@2x.png"
        //         console.log("rain - works! :)")
        //     } else if (description.includes("thunderstorm")) {
        //         icon = "https://openweathermap.org/img/wn/11d@2x.png"
        //         console.log("thunderstorm - works! :)")
        //     } else if (description.includes("snow")) {
        //         icon = "https://openweathermap.org/img/wn/13d@2x.png"
        //         console.log("snow - works! :)")
        //     } else if (description.includes("mist")) {
        //         icon = "https://openweathermap.org/img/wn/50d@2x.png"
        //         console.log("mist - works! :)")
        //     } 
        //       return
        // }

        weatherToday.innerHTML = ""
        weatherToday.innerHTML = 
        `

        <div class="card"> 
        <h1>${temperature}<span class="celcius-c">°C</span></h1> 
        <h2>${place} </h2>
        <p>${description}</p>
        <br>
        <p>Sunrise: ${sunriseTime} Sunset: ${sunsetTime} </p>
        </div>
        `
    }).catch(error => {
        console.log("Something went wrong:", error)
    })
    
}


displayWeather()


// 5-day forecast 


const showForecast = () => {
    const url = `http://api.openweathermap.org/data/2.5/forecast?lat=59.3326&lon=18.0649&appid=${apiKey}`
    

// API request 5-days forecast, Cannot get it to work :(

    fetch(url)
    .then((response) => {
        if(!response.ok) {
            throw new Error("No connection", error)
        }
        return response.json()
    })
    .then((response)=> {
        console.log(response)
        const today = new Date()
        const forecastForFiveDays = new Date(today)  
        forecastForFiveDays.setDate(forecastForFiveDays.getDate() +5)    
        
        const collectedFiveDaysForecast = response.list.reduce((result, currentData) => {
            const date = new Date(currentData.dt * 1000)
        
        if(date <= forecastForFiveDays) {
            const reducedForecast = date.toISOString().split("T")[0] // I cannot use find method to single out the midday reports in order to display them in the app, how should I do this?
            if (!result[reducedForecast]) { // I cannot use find method to single out the midday reports in order to display them in the app, how should I do this?
                result[reducedForecast] = []
            }
            result[reducedForecast].push(currentData)
        }
        return result
            
        })
        console.log(collectedFiveDaysForecast)
            
        for(const date in collectedFiveDaysForecast) {
            if(collectedFiveDaysForecast.hasOwnProperty(date)) {
                const forecastedDays = collectedFiveDaysForecast[date]
                let temperatureMidday = ""
                let temperatureMidnight = ""
                    
                if(Array.isArray(forecastedDays)) {
                    const groupMiddayForecast = forecastedDays.find((item) => item.dt_txt.includes("12:00:00")) 
                    const groupMidnightForecast = forecastedDays.find((item) => item.dt_txt.includes("00:00:00")) 
                    console.log(groupMiddayForecast)
                    forecastedDays.find((item) => {console.log(item)}) 

                        
                if(groupMiddayForecast) {
                    temperatureMidday = groupMiddayForecast.main.temp.toFixed(1)
                    }
                if(groupMidnightForecast) {
                    temperatureMidnight = groupMidnightForecast.main.temp.toFixed(1)
                    }
                }
                    
                const currentDay = new Date().getDay() + 1;

                
                weatherForecast.innerHTML = ""
                weatherForecast.innerHTML += 
                `
                <div class="weather-forecast"> 
                <p>${weekdays[currentDay]}</p>
                <p> ${temperatureMidday}°C / ${temperatureMidnight}°C </p>
                </div>
                `
            }
        }
        
    })
    .catch((error ) => {
        console.error("Error", error)
    })

}

showForecast()





