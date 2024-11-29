'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) { 
            User.hasMany(models.Borrow, { foreignKey: 'userId', as: 'borrows' });
        }
    }

    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
            sequelize,
            modelName: "Users",
            timestamps: true
        }
    )
    return User
}