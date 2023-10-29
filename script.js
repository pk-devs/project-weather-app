const apiKey = "6feddfb8b72ac42e5e50ba927921a1ab"
const apiUrl = "http://api.openweathermap.org/geo/1.0/direct"
const showWeather = document.getElementById("show-weather")
const searchWeat = document.getElementById("searchWeat")


// Get data from API



const searchWeather = () => {
    
    let searchValue = searchInput.value 

    const url = `${apiUrl}?q=${searchValue}&limit=5&appid=${apiKey}`
    
    
    fetch(url).then((response) => {
        console.log(response)
        
    })

    // .then((weather) => {
    //    console.log (current.temp)
       
    //     if(weather.Response === "True") {
    //         // do something
    //         console.log(weather)
    //     } else {
    //         console.log ("Woops wrong")
    //     }
    // })
    
}



