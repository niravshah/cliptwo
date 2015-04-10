var jwt = require('jwt-simple');
var jwtTokenSecret = 'ENGAGE_6383_5587_RSNS';
module.exports = function(req, res, next) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['authorization'];	
	console.log('Token Found: ', token.replace('Bearer '));
    if(token) {
        try {
            var decoded = jwt.decode(token, jwtTokenSecret);
            if(decoded.exp <= Date.now()) {
                res.end('Access token has expired', 400);
            }
			req.user = decoded.user;
			return next();
        } catch(err) {
			console.log('token decode error', err);
            return next();
        }
    } else {
        next();
    }
};