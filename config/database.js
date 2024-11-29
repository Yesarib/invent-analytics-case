const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('invent_case', 'postgres', '142536', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
})

const UserModel = require('../models/user')
const BookModel = require('../models/book')
const BorrowModel = require('../models/borrow')


const User = UserModel(sequelize, Sequelize.DataTypes);
const Book = BookModel(sequelize, Sequelize.DataTypes);
const Borrow = BorrowModel(sequelize, Sequelize.DataTypes);

User.associate && User.associate({ Borrow })
Book.associate && Book.associate({ Borrow })
Borrow.associate && Borrow.associate({ User, Book })

module.exports = { sequelize, User, Book, Borrow }