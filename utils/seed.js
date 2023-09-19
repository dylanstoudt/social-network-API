const connection = require('../config/connection');
const { User} = require('../models');
const { getRandomUsername } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  let userCheck = await connection.db.listCollections({ username: 'userNames' }).toArray();
  if (userCheck.length) {
    await connection.dropCollection('userNames');
  }

  const users = [];

  for (let i = 0; i < 20; i++) {
    const userName = getRandomUsername();

    users.push({
      userName,
      age: Math.floor(Math.random() * (99 - 18 + 1) + 18),
    });
  }

  await User.collection.insertMany(users);


  // loop through the saved videos, for each video we need to generate a video response and insert the video responses
  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
