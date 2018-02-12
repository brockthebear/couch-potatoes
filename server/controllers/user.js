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
        }).then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User with ID: " + req.params.user_id + " does not exist.",
                });
            }
            return res.status(200).send(user);
        }).catch(error => res.status(400).send(error));
    },

    update(req, res) {
        return User.findById(req.params.user_id, {
            include: [{
                model: Match,
            }],
        })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User with ID: " + req.params.user_id + " could not be found.",
                });
            }
            const { first_name, last_name, email, password, settings, matches } = req.body;

            return user.update({
                first_name: !!first_name ? first_name : user.first_name,
                last_name: !!last_name ? last_name : user.last_name,
                email: !!email ? email : user.email,
                password: !!password ? password : user.password,
                settings: !!settings ? JSON.parse(settings) : JSON.parse(user.settings),
                matches: !!matches ? matches : user.matches,
            })
            .then(() => res.status(200).send(user))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    },
};
