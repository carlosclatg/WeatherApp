/**
 * Abstraction of business logic.
 */

require('dotenv').config();

const logic = {
    url : `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${process.env.REACT_APP_APIKEY}`,
    url2 : `https://crossorigin.me/https://api.darksky.net/forecast/${process.env.REACT_APP_APIKEY}`,

    /**
     * Logs in the user by its credentials.
     * 
     * @param {string} latitude 
     * @param {string} longitude 
     */
    getHourlyWeather(latitude, longitude) {
        if (typeof latitude !== 'number') throw TypeError(latitude + ' is not a number')
        if (typeof longitude !== 'number') throw TypeError(longitude + ' is not a number')
        
        return fetch(`${this.url}/${latitude},${longitude}?units=ca&daily`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },
        })
        .then(response => {
            return response.json()}
        )
        .catch(err => null)
    }
}

export default logic