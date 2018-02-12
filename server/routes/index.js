const userController = require('../controllers').user;
const matchController = require('../controllers').match;

module.exports = app => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the user api.',
    }));

    // api/users/
    app.post('/api/users/_create', userController.create);
    app.get('/api/users/list', userController.list);
    app.get('/api/users/:user_id', userController.findOne);
    app.put('/api/users/:user_id/_update', userController.update);
    app.delete('/api/users/:user_id/_delete', userController.deleteUser);

    // api/match/
    app.post('/api/match/:user_id/_create', matchController.create);
};
