module.exports = (sequelize, DataTypes) => {
    const Match = sequelize.define(
      "match",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        user_1: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        user_2: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        is_matched: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        match_date: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        timestamps: true,
      }
    );

    Match.associate = (models) => {
        Match.belongsTo(models.user, { foreignKey: 'user_1', as: 'userOne' });
        Match.belongsTo(models.user, { foreignKey: 'user_2', as: 'userTwo' });
      };      
  
    return Match;
  };
  