const resquest = require("request");

const forecast = (lat, long, callback) => {
    url = "http://api.weatherstack.com/current?access_key=5969b83f7c038166f53268e945f624fe&query=" + lat + "," + long;
    resquest({ url, json: true }, (error, response) => {
        if (error) {
            callback("No able to connnect the server!", undefined);
        } else if (!response.body.current) {
            callback("No data found", undefined);
        } else {
            const temp = { feelslike, temperature } = response.body.current;
            callback(undefined, temp);
        }
    })
}
module.exports = forecast;