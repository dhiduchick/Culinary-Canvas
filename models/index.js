// const post = require('./post');
const recipe = require ('./recipe');
const users = require ('./users');
// const image = require ('./image');

// users.hasMany(post, {
//     foreignKey: 'user_id'
// });

users.hasMany(recipe, {
    foreignKey: 'user_id'
});

// recipe.hasOne(image, {
//     foreignKey: 'user_id'
// });

recipe.belongsTo(users, {
    foreignKey: 'user_id'
});

// post.belongsTo(users, {
//     foreignKey: 'user_id'
// });

// image.belongsTo(recipe, {
//     foreignKey: 'user_id'

module.exports={ image, post, recipe, users};