const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const webWeather = 'http://api.weatherstack.com/current?'
    const keyWeather = 'access_key=e11cdf609e52faee9c1c91d1ab9b3ef2'    
    const queryWeatherLat = latitude
    const queryWeatherLong = longitude
    const queryWeather = '&query=' + queryWeatherLat + ',' + queryWeatherLong
    const parm1Weather = '&units=F'  // return temp in F
    const urlWeather = webWeather + keyWeather + queryWeather + parm1Weather
    
    request({ url: urlWeather, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location.  Try another search.', undefined)
        } else {
            callback(undefined, 'It is currently ' + body.current.weather_descriptions + ' and ' + body.current.temperature + ' degress. There is a ' + body.current.precip + '% chance of rain.')
            // callback(undefined, {
            //     tempF: body.current.temperature,
            //     precip: body.current.precip,
            //     weather_descriptions: body.current.weather_descriptions
            
        }
    })
}

module.exports = forecast