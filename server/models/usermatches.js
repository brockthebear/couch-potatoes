/**
 * The definition for the UserMatches model.
 *
 * @module server/models/usermatches
 */

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
    //     UserMatches.hasMany(models.User);
    // };

    return UserMatches;
};
