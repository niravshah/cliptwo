var express = require('express');
var router = express.Router();
router.get('/valid', function(req, res, next) {
    if(req.user) {
        console.log('Request User!', req.user);
        res.status(200).send('Valid User');
    } else {
        res.status(403).send('Invalid User Token');
    }
});
router.get('/pipelines', function(req, res, next) {
    if(req.user) {
        res.json({
            name: 'Java Passives',
            id: 'java-passives',
            members: [{
                name: 'Joe Aldrin',
                email: 'joe.aldrin@engage.co'
            }, {
                name: 'Sam Fox',
                email: 'sam.fox@engage.co'
            }]
        });
    } else {
        res.status(403).send('Invalid User Token');
    }
});
module.exports = router;