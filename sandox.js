var axios = require("axios").default;

var options = {
    method: 'GET',
    url: 'http://localhost:3010/api/private',
    headers: { authorization: 'Bearer YOUR_ACCESS_TOKEN' }
};

axios.request(options).then(function (response) {
    console.log(response.data);
}).catch(function (error) {
    console.error(error);
});