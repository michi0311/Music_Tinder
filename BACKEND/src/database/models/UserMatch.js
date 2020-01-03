/* * * * * * * * * * * * * * *
 * Created By Michael Marolt *
 * * * * * * * * * * * * * * */
"use strict"
module.exports = (sequelize, DataTypes) => {
    const UserMatch = sequelize.define('UserMatch', {
        Userid: {
            type: DataTypes.INTEGER(12),
            allowNull: false,
            primaryKey: true
        },
        Userid2: {
            type: DataTypes.INTEGER(12),
            allowNull: false,
            primaryKey: true
        },
        isMatch: {
            type: DataTypes.BOOLEAN()
        }
    },{
        timestamps: false,
        freezeTableName: true
    })

    UserMatch.associate = function(models) {
        UserMatch.hasMany(models.User, {
            foreignKey: 'id',
            sourceKey: 'Userid',
            onDelete: 'CASCADE'
        }),
        UserMatch.hasMany(models.User, {
            foreignKey: 'id',
            sourceKey: 'Userid2',
            onDelete: 'CASCADE'
        })
    }

    return UserMatch;
}