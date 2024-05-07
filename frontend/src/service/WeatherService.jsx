import axios from 'axios';

const weatherUrl = 'https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude=current,minutely,alerts&units=metric&appid=af5bc54554256098e826040995a7c6d6';

const currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&exclude=daily,hourly,minutely,alerts&units=metric&appid=af5bc54554256098e826040995a7c6d6';

// const rainfallUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?lat=19.07&lon=72.87&key=d0b261110ccd4192b531b6b6c387018c&days=7'

// const airQuality = 'http://api.airvisual.com/v2/nearest_city?key=c4777a3e-379f-40e1-af12-1a3a5bf9d4ab';

const apikey = '41d7ff5dcdb486cb17c5e5294e699eda'
const weatherBitApiKey = 'c806d4592faf45f7a4f96b1633e6939f'

export class WeatherService {

    
    // getWeather(locationData) {
    //     return axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${locationData.lat}&lon=${locationData.lon}&exclude=current,minutely,alerts&units=metric&appid=${apikey}`)
    //     .then(res => res.data)
    //     .catch(err => console.log(err))
    // }

    async getDailyWeather(locationData) {
        
        return axios.get(`http://api.openweathermap.org/data/2.5/forecast/daily?lat=${locationData.lat}&lon=${locationData.lon}&units=metric&cnt=16&appid=${apikey}`)
        .then(res => res.data.list)
        .catch(err => console.log(err))
    }

    async getHourlyWeather(locationData) {
        return axios.get(`https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${locationData.lat}&lon=${locationData.lon}&units=metric&appid=${apikey}`)
        .then(res => res.data.list)
        .catch(err => console.log(err))
    }

    async getAirQuality(locationData) {
        return axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${locationData.lat}&lon=${locationData.lon}&appid=${apikey}`)
        .then(res => res.data.list)
    }

    async getCurrentWeather(locationData) {
        return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${locationData.lat}&lon=${locationData.lon}&units=metric&appid=${apikey}`)
        .then(res => res.data);
    }

    async getDailyRainfall(locationData) {
        return axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${locationData.lat}&lon=${locationData.lon}&key=${weatherBitApiKey}`)
        .then(res => res.data.data);
    }

    async getCurrentRainfall(locationData) {
        return axios.get(`https://api.weatherbit.io/v2.0/current?lat=${locationData.lat}&lon=${locationData.lon}&key=${weatherBitApiKey}`)
        .then(res => res.data.data);
    }

    async getCurrentAirQuality(locationData) {
        return axios.get(`https://api.weatherbit.io/v2.0/current/airquality?lat=${locationData.lat}&lon=${locationData.lon}&key=${weatherBitApiKey}`)
        .then(res => res.data.data);
    }

}