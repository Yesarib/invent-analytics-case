'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Book extends Model {
        static associate(models) {
            Book.hasMany(models.Borrow, { foreignKey: 'bookId', as: 'borrows' });
        }
    }

    Book.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        }, {
        sequelize,
        modelName: "Books"
    }
    )
    return Book
}