const request = require('request')

const geocode = (address,callback) => {
    const webGeo = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
    const addressGeo = encodeURIComponent(address)
    const keyGeo = 'access_token=pk.eyJ1Ijoicm1ydXBwZWwiLCJhIjoiY2tvb3J2Z3NxMGM0bzJ1czE1dDlma2lkdCJ9.jh8U6N1xrtNef-KsSkacyA'
    const parm1Geo = '&limit=1'  // return 1 location
    const urlGeo = webGeo + addressGeo + '.json?' + keyGeo + parm1Geo  // don't forget .json? after address

    request({ url: urlGeo, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location service!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location.  Try another search.', undefined)
        } else {
            callback(undefined, {
                location: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            })
        }
    })

}

module.exports = geocode