module.exports = (sequelize, DataTypes) => {
    const Match = sequelize.define('Match', {
        user_id: DataTypes.INTEGER,
    });

    Match.associate = models => {
        Match.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'CASCADE',
        });
    };

    return Match;
};
