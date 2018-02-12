module.exports = (sequelize, DataTypes) => {
      const UserMatches = sequelize.define('UserMatches', {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        matched_user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    // UserMatches.associate = models => {
    //     UserMatches.
    // }

    return UserMatches;
};
