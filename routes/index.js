var express = require('express');
var router = express.Router();
var jwtTokenSecret = 'ENGAGE_6383_5587_RSNS';
var jwt = require('jwt-simple');
var moment = require('moment');
var request = require('request');
require('request-debug')(request, function(type, data, r) {
    console.log('Request Debug: ', data.body);
});
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});
router.post('/auth', function(req, res, next) {
    var expires = moment().add('days', 7).valueOf();
    var token = jwt.encode({
        iss: 'nshah',
        exp: expires
    }, jwtTokenSecret);
    res.json({
        token: token,
        expires: expires,
        user: 'nshah'
    });
});
router.get('/licallback', function(req, res) {
    console.log('licallback code ', req.query.code);
    console.log('licallback state ', req.query.state);
    var form_data = {
        'grant_type': 'authorization_code',
        'code': req.query.code,
        'redirect_uri': 'http://ingrid-radio.codio.io:3000/licallback',
        'client_id': '78n1x0yelczbl3',
        'client_secret': 'yhbi3lVuSrk1PcVL'
    };
    request.post('https://www.linkedin.com/uas/oauth2/accessToken', {
        form: form_data
    }, function(error, response, body) {
        if(!error && response.statusCode == 200) {
            console.log('Success! ');
            var options = {
                url: 'https://api.linkedin.com/v1/people/~:(id,first-name,last-name,email-address,picture-url,picture-urls::(original))?format=json',
                headers: {
                    'Authorization': 'Bearer ' + JSON.parse(response.body).access_token
                }
            }
            request(options, function(error, response, body) {
                if(!error && response.statusCode == 200) {
                    res.json(response.body);
                }
            })
        } else {
            console.log('Error');
            res.json(response);
        }
    });
});
module.exports = router;