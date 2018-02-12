module.exports = (sequelize, DataTypes) => {
    const Match = sequelize.define('Match', {
        user_match_id: {
            type: DataTypes.INTEGER,
        }
    });

    Match.associate = models => {
        Match.belongsTo(models.User, {
            foreignKey: 'userMatchId',
            onDelete: 'CASCADE',
        });
    };

    return Match;
};
