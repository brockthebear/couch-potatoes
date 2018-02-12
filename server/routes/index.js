const userController = require('../controllers').user;
const matchController = require('../controllers').match;

module.exports = app => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the user api.',
    }));

    app.post('/api/user', userController.create);
    app.get('/api/users', userController.list);

    app.post('/api/match/:user_id/_create', matchController.create);
};
