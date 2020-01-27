/* * * * * * * * * * * * * * *
 * Created By Michael Marolt *
 * * * * * * * * * * * * * * */
"use strict"
module.exports = (sequelize, DataTypes) => {
    const UserMatch = sequelize.define('UserMatch', {
        Userid: {
            type: DataTypes.INTEGER(12),
            allowNull: false,
            primaryKey: true,
            references: {
                model: sequelize.models.User,
                key: "id"
            }
        },
        Userid2: {
            type: DataTypes.INTEGER(12),
            allowNull: false,
            primaryKey: true,
            references: {
                model: sequelize.models.User,
                key: "id"
            }
        },
        isMatch: {
            type: DataTypes.BOOLEAN()
        },
        Songid: {
            type: DataTypes.INTEGER(12),
            allowNull: false,
            references: {
                model: sequelize.models.Song,
                key: "id"
            }
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