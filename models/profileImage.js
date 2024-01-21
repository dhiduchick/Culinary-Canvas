const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ProfileImage extends Model {}

ProfileImage.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      multimedia_url: {
        type: DataTypes.STRING,
        validate: {
          isUrl: true,
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'image',
    }
  );
  
  module.exports = ProfileImage;