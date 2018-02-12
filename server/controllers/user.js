const User = require('../models').User;

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
};
