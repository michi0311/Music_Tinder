/* * * * * * * * * * * * * * *
 * Created By Michael Marolt *
 * * * * * * * * * * * * * * */
"use strict"
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER(12),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(40),
            unique: true
        },
        password: {
            type: DataTypes.STRING(60),
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Password can\'t be empty' }
            },
        },
        birthday: {
            type: DataTypes.DATEONLY()
        },
        songDescription: {
            type: DataTypes.STRING(250)
        },
        favoriteSongid: {
            type: DataTypes.INTEGER(12),
            references: {
                model: sequelize.models.Song,
                key: "id"
            }
        },
        isVerified: {
            type: DataTypes.BOOLEAN()
        }
    },{
        timestamps: false,
        freezeTableName: true
    });
    return User;
}
