module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        settings: DataTypes.JSON,
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            },
        },
    });

    return User;
};
