const sequelize = require('../config/connection');
const{Post, Image, Users} = require('../models');

const postData = require('./postData.json');
const imageData = require('./imageData.json');
const userData = require('./userData.json');

const seedDatabase = async () => {
    await sequelize.sync({force: true});

    const users = await Users.bulkCreate(usersData, {
        individualHooks: true,
        returning: true,
    });

    const profiles = await Profile.bulkCreate(profileData, {
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