const request = require('request');
const fs = require('fs')

export async function callRemoteAPI(options) {
    return new Promise(resolve => {
        request(options, function (error, response, body) {
            if (!error)
                resolve(body);
        })
    }).then(value => {
        return value
    })
}
