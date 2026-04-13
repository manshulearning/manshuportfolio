const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();

    await User.create({
        name: 'Admin User',
        email: 'admin@manshulearning.com',
        password: 'manaswin@1103',
        role: 'admin',
    });

    console.log('Data Imported - Admin User Created');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();
