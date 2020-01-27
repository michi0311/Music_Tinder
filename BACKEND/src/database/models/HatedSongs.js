/* * * * * * * * * * * * * * *
 * Created By Michael Marolt *
 * * * * * * * * * * * * * * */
"use strict"
module.exports = (sequelize, DataTypes) => {
    const HatedSongs = sequelize.define('hatedSong', {
        songID: {
            type: DataTypes.INTEGER(12),
            primaryKey: true,
            references: {
                model: sequelize.models.Song,
                key: "id"
            }
        },
        userID: {
            type: DataTypes.INTEGER(12),
            primaryKey: true,
            references: {
                model: sequelize.models.User,
                key: "id"
            }
        }

    },{
        timestamps: false,
        freezeTableName: true
    });
    return HatedSongs;
}
