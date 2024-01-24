const sequelize = require('../config/connection');
const { post, users } = require('../models'); 

const postData = require('./postData.json');
const userData = require('./userData.json');

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true });

        const Users = await users.bulkCreate(userData, {
            individualHooks: true,
            returning: true,
        });

        const posts = await post.bulkCreate(postData, {
            individualHooks: true,
            returning: true,
        });

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
