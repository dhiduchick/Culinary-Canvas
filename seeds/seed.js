const sequelize = require('../config/connection');
const{Post, Users} = require('../models');

const postData = require('./postData.json');
const userData = require('./userData.json');

const seedDatabase = async () => {
    await sequelize.sync({force: true});

    const users = await Users.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    const post = await Post.bulkCreate(postData, {
        individualHooks: true,
        returning: true,
    });

    process.exit(0);
}

seedDatabase();