const userController = require('../controllers').user;
const matchController = require('../controllers').match;

module.exports = app => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the user api.',
    }));

    // api/user/
    app.post('/api/users/_create', userController.create);
    app.get('/api/users/:user_id', userController.findOne);

    // api/users
    app.get('/api/users/list', userController.list);

    // api/match/
    app.post('/api/match/:user_id/_create', matchController.create);
};
