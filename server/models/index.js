/**
 * Establish a connection with our database.
 *
 * @module server/models
 */

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || 'development';
var config = require(`${__dirname}/../config/config.json`)[env];
var db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}


// Add all of our models to our db object.
fs.readdirSync(__dirname)
    .filter(file =>
        (file.indexOf('.') !== 0) &&
        (file !== basename) && (file.slice(-3) === '.js'))
    .forEach(file => {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

// Loop through all of the models that we just added to our db.
// If the model has an 'associate' function defined, execute the function.
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

// sequelize vs. capital S Sequelize
// Pretty sure sequelize is the stuff we define for the app,
// and "Sequelize" is the metadata stuff that the Sequelize package needs.
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
