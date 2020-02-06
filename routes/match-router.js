const router = require('express').Router();
const Matches = require('../helpers/match-model');
const authenticate = require('../auth/authenticate-middleware');


router.get('/', (req, res) => {
    Matches.getUserCompanyLikes()
    .then( matches => {
        res.status(201).json(matches)
    })
    .catch( err => {
        res.status(500).json({error: 'Failed to get company likes. Try again later'})
    })    
})

module.exports = router;
