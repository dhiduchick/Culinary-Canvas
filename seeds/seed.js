const sequelize = require('../config/connection');
const { Post, Users } = require('../models'); // Assuming your model is named User, not Users

const postData = require('./postData.json');
const userData = require('./userData.json');

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true });

        const users = await Users.bulkCreate(userData, {
            individualHooks: true,
            returning: true,
        });

        const posts = await Post.bulkCreate(postData, {
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
