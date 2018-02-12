const User = require('../models').User;

module.exports = {
    create(req, res) {
        const { first_name, last_name, email, password, settings } = req.body;

        return User.create({
            first_name,
            last_name,
            email,
            password,
            settings: !!settings ? settings : [],
        })
        .then(user => res.status(201).send(user))
        .catch(error => res.status(400).send(error));
    },
};
