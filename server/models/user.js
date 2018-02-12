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
            type: sequelize.ARRAY(sequelize.TEXT),
            defaultValue: [],
        },
    });

    User.associate = models => {
        User.belongsToMany(models.UserMatches, {
            through: 'UserMatches',
            as: 'Users',
            foreignKey: 'userId',
        });
    };

    return User;
};
