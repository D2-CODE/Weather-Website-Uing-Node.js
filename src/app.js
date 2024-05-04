const express = require('express')
const path = require('path');
const hbs = require('hbs');
const forcast = require('./utils/forcast')
const geocode = require('./utils/geocode');
// const { error } = require('console');
const port = process.env.PORT || 3000;
const app = express()

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and viwes location
app.set('view engine', 'hbs');
app.set('views', viewspath)
hbs.registerPartials(partialspath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath))



app.get('/', (req, res) => {
    res.render('index', {
        title: `Weather`,
        name: `Dharmesh`
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: `About Us`,
        description: "This is about us page"
    })
})


app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: `Address must be provided`
        })
    }
    geocode(req.query.address, (err, { lat, long, name } = {}) => {
        if (err) {
            return res.send({
                error: `Error ${err}`
            })
        } else {

            // let lat = data.lat;
            // let long = data.long;
            //calling weather forcast api //used destructuring method to sort code
            forcast(lat, long, (error, { temp_c, condition, wind_kph, humidity } = {}) => {
                if (error) {
                    return res.send({
                        error: `Error ${error}`
                    })
                } else {
                    // console.log("data: ", forcastdata);
                    // console.log(`This is ${name} city. the temprature is here ${temp_c} celcius and it is ${condition.text} day. today wind speed is ${wind_kph} kph. Humidity is ${humidity}`);
                    return res.send({
                        address: `${req.query.address}`,
                        name: `${name}`,
                        temperature: `${temp_c}°C`,
                        condition: `${condition.text}`,
                        wind: `${wind_kph} km/h`,
                        humidity: `${humidity}%`

                    })
                }

            })
        }
    });

    // res.send({
    //     data: []
    // })
})



app.get('/help', (req, res) => {
    res.render('help', {
        title: `Help`,
        name: `dharmesh`
    })
})

app.get('/help/*', (req, res) => {
    // res.send('Artical not Found!')
    res.render('404', {
        error: `Sorry! Artical not found.`,
        title: `Error 404 `
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        error: `Sorry! Page not found.`,
        title: `Error 404 `
    })
})

app.listen(port, (err) => {
    if (err) {
        console.log('error: ', err);
    } else {
        console.log("connected to server");
    }
});