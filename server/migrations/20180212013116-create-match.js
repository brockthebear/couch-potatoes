module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Matches', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            onDelete: 'CASCADE',
            references: {
                model: 'User',
                key: 'id',
                as: 'matchId',
            },
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
    }),
    down: (queryInterface, Sequelize) => queryInterface.dropTable('Matches'),
};
