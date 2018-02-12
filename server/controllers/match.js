const Match = require('../models').Match;

module.exports = {
    create(req, res) {
        console.log('params: ', req.params);
        console.log('params: ', req.body);
        return Match.create({
            user_id: req.params.user_id,
            recipient_id: req.body.recipient_id,
        })
        .then(match => res.status(201).send(match))
        .catch(error => res.status(400).send(error));
    },
};
