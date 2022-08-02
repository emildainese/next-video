import db from '../models/index.mjs';

const seedCategory = async () => {
  await db.Category.bulkCreate([
    {
      name: 'Film & Animations',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Authos & Vehicles',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Pets & Animals',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Travel & Events',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Gaming',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Entertainment',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'News & Politics',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Howto & Style',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Education',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Science & Tecnology',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Noprofits & Activism',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
};

seedCategory();
