const User = require('../models').User;
const Match = require('../models').Match;

module.exports = {
    create(req, res) {
        return User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            settings: !!req.body.settings ? req.body.settings : [],
        })
        .then(user => res.status(201).send(user))
        .catch(error => res.status(400).send(error));
    },

    list(req, res) {
        return User.findAll({
            include: [{
                model: Match,
            }],
        })
        .then(users => res.status(200).send(users))
        .catch(error => res.status(400).send(error));
    },

    findOne(req, res) {
        return User.findById(req.params.user_id, {
            include: [{
                model: Match,
            }],
        })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User with ID: " + req.params.user_id + " does not exist.",
                });
            }

            return res.status(200).send(user);
        })
        .catch(error => res.status(400).send(error));
    },
};
