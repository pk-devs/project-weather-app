const apiKey = "6feddfb8b72ac42e5e50ba927921a1ab"
const apiUrl = "http://api.openweathermap.org/geo/1.0/direct"
const weatherToday = document.getElementById("weatherToday")
const weatherForecast = document.getElementById("weatherForecast")



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
    }).then((response) => {
        
        const place = response.name 
        const temperature = response.main.temp.toFixed(1)
        const feelsLike = response.main.feels_like.toFixed(1)
        const description = response.weather[0].description
        
        const currentTime = new Date() 
        const time = `${currentTime.getHours()}:${currentTime.getMinutes()}`
        
        // I cannot get the time to show correctly for sunrise and sunset- what have I done wrong and what do I have to do? I searched Google but did not find answers, how should I think when troubleshooting something similar?

        const sunriseRawTime = response.sys.sunrise
        const sunsetRawTime = response.sys.sunset
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
        <h2>${place} </h2>
        <p> Time: ${time} </p>
        <br>
        <h1>${temperature} ° Celcius</h1> 
        <p>but feels like ${feelsLike} ° celcius</p>
        <br>
        <p>${description}</p>
        <br>
        <p>Sunrise: ${sunriseTime}</p>
        <p>Sunset: ${sunsetTime} </p>
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
        console.log(forecastForFiveDays)
        
        const collectedFiveDaysForecast = response.list.reduce((result, currentData) => {
        const date = new Date(currentData.dt * 1000)
        if(date <= forecastForFiveDays) {
                
        const reducedForecast = date.toISOString().split("T")[0]
        if (!result[reducedForecast]) {
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
                    let temperature = ""
                    let feels_like = ""
                    let description = ""
                    
                    if(Array.isArray(forecastedDays)) {
                        const groupMiddayForecast = forecastedDays.find((item) => item.dt_txt.includes("12:00:00")) // I cannot use find method to single out the midday reports in order to display them in the app, how should I do this?
                        console.log(forecastedDays)
                        
                        if(groupMiddayForecast) {
                            const temperature = groupMiddayForecast.main.temp.toFixed(1)
                            const feels_like = groupMiddayForecast.main.feels_like.toFixed(1)
                            const description = groupMiddayForecast.main.weather[0].description
                        }
                    }
                    
                    weatherForecast.innerHTML = ""
                    weatherForecast.innerHTML += 
                    `
                    <h1> Temp: ${temperature} </h1>
                    <h1> Feels like: ${feels_like} </h1>
                    <h1> Description ${description} </h1>
                    `
                }
            }
        
    })
    .catch((error ) => {
        console.error("Error", error)
    })

}


showForecast()