/**
 * The methods for the Match model.
 *
 * @module server/controllers/match
 */

const Match = require('../models').Match;

module.exports = {
    create(req, res) {
        return Match.create({
            user_id: req.params.user_id,
            recipient_id: req.body.recipient_id,
        })
        .then(match => res.status(201).send(match))
        .catch(error => res.status(400).send(error));
    },

    update(req, res) {
        return Match.find({
            where: {
                user_id: req.params.user_id,
                recipient_id: req.params.recipient_id,
            },
        })
        .then(match => {
            if (!match) {
                return res.status(404).send({
                    Message: 'Match could not be found.',
                });
            }

            return match
                .update(req.body, { fields: Object.keys(req.body) })
                .then(result => res.status(200).send(result))
                .catch(error => res.status(404).send(error));
        })
        .catch(error => res.status(404).send(error));
    },

    destroy(req, res) {
        return Match.find({
            where: {
                user_id: req.params.user_id,
            },
        }).then(match => {
            if (!match) {
                return res.status(404).send({
                    message: 'Matches could not be found for user: ' + req.params.user_id,
                });
            }

            return match
                .destroy()
                .then(() => res.status(200).send({
                    message: 'Matches for user ' + req.params.user_id + ' deleted successfully.',
                }))
                .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    },
};
