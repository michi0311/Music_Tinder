/* * * * * * * * * * * * * * *
 * Created By Michael Marolt *
 * * * * * * * * * * * * * * */
"use strict"
module.exports = (sequelize, DataTypes) => {
    const Song = sequelize.define('Song', {
        id: {
            type: DataTypes.INTEGER(12),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
        },
        songName: {
            type: DataTypes.STRING(30)
        },
        URL: {
            type: DataTypes.STRING(100)
        },
        iTunesID: {
            type: DataTypes.INTEGER(12),
        },
        totalLikes: {
            type: DataTypes.INTEGER(10),
        },
        totalDislikes: {
            type: DataTypes.INTEGER(10),
        }
    },{
        timestamps: false,
        freezeTableName: true
    })

    return Song;
}