/**
 * This defines the routes for our application.
 *
 * @module server/routes
 */

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
    app.put('/api/users/:user_id/_edit', userController.edit);
    app.delete('/api/users/:user_id/_delete', userController.destroy);

    // api/match/
    app.post('/api/match/:user_id/_create', matchController.create);
    app.put('/api/match/:user_id/:recipient_id/_edit', matchController.update);
    app.delete('/api/match/:user_id/_delete', matchController.destroy);
};
