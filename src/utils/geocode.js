const resquest = require("request");

const geoCode = (location, callback) => {
    url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + location + ".json?country=in&limit=1&proximity=ip&types=place%2Cpostcode%2Caddress&language=en&access_token=pk.eyJ1IjoidmlzaGFsY29yZWEiLCJhIjoiY2w0YXhrMjQwMDRlbzNycWVrOGljbXhrciJ9._WkrhQ-YdIAZn4fA-47q0g";
    resquest({ url, json: true }, (error, {body}) => {
        if (error) {
            callback("Geo coding service are unavailable !", undefined);
        } else if (body.message) {
            callback("No proper data added", undefined);
        } else if (body.features.length == 0) {
            callback("No data found", undefined);
        } else {
            let map = {
                latitiude: '',
                longitude: '',
                location :''
            };

            map.latitiude = body.features[0].center[1];
            map.longitude = body.features[0].center[0];
            map.location = body.features[0].place_name;
            callback(undefined, map);
        }
    })
}

module.exports = geoCode;

