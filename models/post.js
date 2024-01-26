// const { Model, DataTypes } = require("sequelize");
// const sequelize = require("../config/connection");

// class post extends Model { }

// post.init(
//     {
//         id: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             primaryKey: true,
//             autoIncrement: true,
//         },
//         media: {
//             type: DataTypes.INTEGER,
//             allowNull: true,
//             validate: {
//                 isURL: true,
//             },
//         },
//         users_id: {
//             type: DataTypes.INTEGER,
//             references: {
//                 model: "users",
//                 key: "id",
//             },
//         },
//     },
//     {
//         sequelize,
//         timestamps: false,
//         fre3ezeTableName: true,
//         underscored: true,
//         modelName: "post",
//     }
// )

// module.exports = post;