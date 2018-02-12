/**
 * The definition for the User model.
 *
 * @module server/models/user
 */

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        settings: {
            type: DataTypes.JSON,
            defaultValue: {
                "netflix": false,
                "amazon": false,
            },
        },
        // matches: {
        //     type: DataTypes.ARRAY(DataTypes.INTEGER),
        //     defaultValue: [],
        // },
    });

    User.associate = models => {
        User.hasMany(models.Match, {
            foreignKey: 'user_id',
        });
        // User.belongsTo(models.UserMatches, {
        //     through: 'UserMatches',
        //     as: 'user',
        //     foreignKey: 'userId',
        // });
    };

    return User;
};
