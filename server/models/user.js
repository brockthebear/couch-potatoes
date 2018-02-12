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
            allowNull: true,
        },
        matches: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            defaultValue: [],
        },
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
