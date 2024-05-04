const request = require('request')


const option = {
    method: 'GET',
    url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/countries/IN/regions/GJ/places',
    json: true,
    qs: {
        types: 'CITY',
        minPopulation: '72142',
        limit: '10'
    },
    headers: {
        'X-RapidAPI-Key': '80f9f2dbc8mshaae3a69f74afc4fp1c4b4ajsn37a6e225da57',
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
    }
};

const cityarry = []


const geocode = (add, cb) => {
    request(option, function (error, response, body) {
        // console.log(body);
        if (error) {
            cb('unable to connect with api', undefined);
        } else if (body.data.length === 0) {
            cb('no data available for this query', undefined);
        } else {
            body.data.forEach((city) => {
                const geodata = {
                    name: city.name,
                    lat: city.latitude,
                    long: city.longitude
                }
                cityarry.push(geodata);
            })
            const data = cityarry.find((item) => item.name === add);
            if (data) {
                cb(undefined, data);
            } else {
                const ch = new Array()
                ch.length = 0
                cityarry.forEach((item) => {
                    ch.push(item.name)
                })
                cb(`City not found try to  Enter Ahmedabad , Amreli , Anand`, undefined);

            }
        }
    });

}


module.exports = geocode