const request = require('request')


const forcast = (lat, long, cb) => {
    const options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/current.json',
        json: true,
        // qs: { q: '23.021944444,72.579722222' },
        qs: { q: `${lat},${long}` },
        headers: {
            'X-RapidAPI-Key': '80f9f2dbc8mshaae3a69f74afc4fp1c4b4ajsn37a6e225da57',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    request(options, function (error, response, body) {
        if (error) {
            // console.log("Error in getting the weather forecast");
            cb('Unable to get weather data', undefined);
        } else {
            // console.log(response.body);
            cb(undefined, body.current);
        }
    });
}

module.exports = forcast