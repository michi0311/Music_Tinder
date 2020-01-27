/* * * * * * * * * * * * * * *
 * Created By Michael Marolt *
 * * * * * * * * * * * * * * */
const path = require("path")
const userMatch = require(path.normalize('../models/index')).UserMatch;
const user = require(path.normalize('../models/index')).User;
const song = require(path.normalize('../models/index')).Song;
const hatedSongs = require(path.normalize('../models/index')).hatedSong;

module.exports = {
    async like (req,res) {
        try {
            const userId = req.user.id;
            const otherUserId = req.params.id;
            let match = false;

            //get song id from other user
            let songId = await user.findByPk(otherUserId);
            if (!songId) {
                return res.status(400).send({error:"User not found"})
            } 
            songId = songId.dataValues.favoriteSongid;


            //TODO change error code
            //normalerweise find or create aber ich hatte keine Lust TODO: vlt ändern
            const alreadyInDb= await  userMatch.findOne({where:{Userid: userId, Userid2: otherUserId}})
            if (alreadyInDb) {
                return res.status(400).send({error: "Users have matched already"})
            }
            const alreadyMatched = await  userMatch.findOne({where:{Userid: otherUserId, Userid2: userId}})
            if (alreadyMatched) {
                match = true;
                alreadyMatched.isMatch = true;
                await userMatch.update({isMatch: true},{where:{Userid: otherUserId, Userid2: userId}})
            }
            const newLike = await userMatch.create({
                Userid: userId,
                Userid2: otherUserId,
                isMatch: match,
                Songid: songId
            })

            if (!newLike) {
                return res.status(400).send({ error: 'Like creation unsuccesfull' })
            }else {
                res.status(200).send(newLike);
            };

        } catch (e) {
            console.log(e);
            res.status(500).send(e)
        }
    },

    async hateSong (req,res) {
        try {
            const userId = req.user.id;
            const otherUserId = req.params.id;

            const otherUser = await user.findByPk(otherUserId);
            const update = {
                songID: otherUser.dataValues.favoriteSongid,
                userID: userId
            }
            const alreadyCreated = await hatedSongs.findOne({where: update})
            if (alreadyCreated) {
                return res.status(400).send({msg: "Already Created"})
            }

            const hatedSongCollection = await hatedSongs.create(update)

            if (hatedSongCollection) {
                res.status(200).send(hatedSongCollection)
            } else {
                res.status(400).send({error: "Creation unsuccessfull"})
            }
        } catch (e) {
            console.log(e);
            res.status(500).send(e)
        }
    },

    async dislike (req,res) {
        try {
            const _idFromOtherUser = req.params.id;
            const userId = req.user.id;
            const MatchCollection = await  userMatch.findOne({where:{Userid: userId, Userid2: _idFromOtherUser}})
            const otherMatch = await  userMatch.findOne({where:{Userid: _idFromOtherUser, Userid2: userId}})

            if (MatchCollection) {
                MatchCollection.destroy();
            } 
            if (otherMatch) {
                await userMatch.update({isMatch: false},{where:{Userid: _idFromOtherUser, Userid2: userId}})
            }

            res.send("ok")

        } catch (e) {
            console.log(e);
            res.status(500).send(e)
        }
    },

    async getAllMatchedUsers (req,res) {
        try {
            const matches = await userMatch.findAll({where: {Userid: req.user.id, isMatch: true}});
            let usersRet = [];
            for (const element of matches) {
                let userP = await user.findByPk(element.Userid2)    
                delete userP.dataValues.password
                usersRet.push(userP) 
            }

            if (usersRet.length == 0) {
                res.status(200).send({msg: "You better start swipping now, or you will die alone"})
            } else {
                res.status(200).send(usersRet)
            }
        } catch (e) {
            console.log(e);
            res.status(500).send(e)
        }
    },

    async getAllLikedSongs (req,res) {
        try {
            const matches = await userMatch.findAll({where: {Userid: req.user.id}});
            let songIds = [];
            matches.forEach(element => {
                if (songIds.indexOf(element.Songid) === -1) {
                    songIds.push(element.Songid)
                }
            });

            let songRet = [];
            for (const id of songIds) {
                let songP = await song.findByPk(id)    
                songRet.push(songP) 
            }

            if (songRet.length === 0) {
                res.status(200).send({msg: "Better start swipping now, you have no matching songs"})
            } else {
                res.status(200).send(songRet)
            }
        } catch (e) {
            console.log(e);
            res.status(500).send(e)
        }
    },
}