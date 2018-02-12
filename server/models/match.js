module.exports = (sequelize, DataTypes) => {
    const Match = sequelize.define('Match', {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        recipient_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    Match.associate = models => {
        Match.belongsToMany(models.UserMatches, {
            through: 'UserMatches',
            as: 'Matches',
            foreignKey: 'matchId',
        });
    };

    return Match;
};
