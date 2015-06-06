var http = require('https')

var url = 'https://api.instagram.com/v1/users/1448944022/media/recent/?count=1&client_id=5502121d9d6c418e9bfbbd42091b7e86'

function handleResults(result) {
    console.log(JSON.stringify(result.location))
}

//recieve as a string
function handleResponse(response) {
    handleResults(JSON.parse(response).data[0])
}

http.get(url, (response) => {
    var buffer = ''
    response.on('data', (chunk) => buffer += chunk)
    response.on('end', () => handleResponse(buffer))
}).on('error', (err) => {
    throw err
})

