const User = require('./user');
const Recipe = require('./recipe');

//Defines taht a user will have many recipes
User.hasMany(Recipe, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

//Defines that recipes belong to user
Recipe.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Recipe };