const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class recipe extends Model { }

recipe.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ingredients:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        steps:
        {
            type: DataTypes.STRING,
            allowNull:false
        },

    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'recipe',
    }
)

module.exports =recipe;