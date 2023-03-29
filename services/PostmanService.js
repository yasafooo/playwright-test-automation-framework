const testConfig = require('../test.config');
const apiPath = require('./Path');

module.exports = function () {
    let PostManService = {};

    PostManService.getPostManStatus = async function (request) {
        let path = testConfig().applicationDevApi + apiPath().SUCCESS_STATUS ;
        const response = await request.post(path,{});
        return response;
    };

    return PostManService;
};