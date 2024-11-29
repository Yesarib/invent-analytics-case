'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Borrow extends Model {
        static associate(models) {
            Borrow.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'user',
            });

            Borrow.belongsTo(models.Book, {
                foreignKey: 'bookId',
                as: 'book',
            });
        }
    }

    Borrow.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            bookId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            score: {
                type:DataTypes.INTEGER,
            },
            status:{
                type:DataTypes.STRING,
                defaultValue:"borrowed"
            }
        }, {
        sequelize,
        modelName: "Borrows"
    }
    );
    return Borrow
}