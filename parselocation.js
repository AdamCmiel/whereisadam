var http = require('https')

function handleResults(results) {
    var locality
    var country

    results.forEach(r => r.address_components.forEach(c => {
        if (~c.types.indexOf('locality')) {
            locality = c.long_name || c.short_name
        }

        if (~c.types.indexOf('country')) {
            country = c.long_name || c.short_name
        }
    }))

    console.log(locality, ',', country)
}

//recieve as a string
function handleResponse(response) {
    handleResults(JSON.parse(response).results)
}

function fetchLocation(inBuffer) {

    var { latitude, longitude } = JSON.parse(inBuffer)
    var url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=true`

    http.get(url, (response) => {
        var buffer = ''
        response.on('data', (chunk) => buffer += chunk)
        response.on('end', () => handleResponse(buffer))
    }).on('error', (err) => {
        throw err
    })

}

var inBuffer = ''
process.stdin.on('data', (chunk) => inBuffer += chunk )
process.stdin.on('end', () => fetchLocation(inBuffer))

