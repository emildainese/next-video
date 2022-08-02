import db from '../models/index.mjs';

const seedUsers = async () => {
  await db.User.bulkCreate([
    {
      firstName: 'Emil',
      lastName: 'Dainese',
      username: 'emild',
      email: 'emildainese2@gmail.com',
      password: '$10$QVXMbwDZrGj9eJODXNphZuaB8EvP2ZLdw7vyzHTvaxHzFS0Tk1k6y',
      profilePic: 'cat-1639257196817.jpg',
      status: 'active',
      role: 'user',
      activationToken: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
};

seedUsers();
