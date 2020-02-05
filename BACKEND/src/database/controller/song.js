/* * * * * * * * * * * * * * *
 * Created By Michael Marolt *
 * * * * * * * * * * * * * * */
const song = require('../models/index').Song;
const validator = require("validator");
const https = require('https');

const {getToken} = require('apple-music-token-node');
const path = require('path');
const appleMusicKeyID = "9DR32D4Y36";
const appleMusicTemaID = "YCT84U44B3";
const certPath = path.normalize(path.resolve(__dirname + "../../../../keys/AuthKey_9DR32D4Y36.p8"));
const request = require("request");

module.exports = {
    async create(req, res) {
        console.log(req.body);
        try {
            if (validator.isEmpty(req.body.songName || "")) {
                return res.status(400).send({error: "No Song Name provided"})
            } else if (validator.isEmpty(req.body.URL || "")) {
                return res.status(400).send({error: "No URL provided"})
            } else if (validator.isEmpty(req.body.iTunesID || "")) {
                return res.status(400).send({error: "No iTunes ID provided"})
            }

            const songAllreadyAdded = await song.findOne({where: {iTunesID: req.body.iTunesID}})
            if (songAllreadyAdded) {
                return res.status(200).send({msg: "Song already added", song: songAllreadyAdded})
            }


            const songCollection = await song.create({
                songName: req.body.songName,
                artistName: req.body.artistName,
                collectionName: req.body.collectionName,
                URL: req.body.URL,
                artworkURL: req.body.artworkURL,
                iTunesID: req.body.iTunesID,
                genre: req.body.genre,
                totalLikes: 0,
                totalDislikes: 0
            });


            if (!songCollection) {
                return res.status(400).send({error: "Song creation unsuccessfull"})
            } else {
                res.status(200).send({song: songCollection})
            }
        } catch (e) {
            console.log(e);
            res.status(500).send(e)
        }
    },

    async addPlaylistToDB(req, res) {
        try {
            if (req.user.email != "michael@marolt.com") {
                return res.status(401).send("Unauthorized")
            }

            const DBsongs = await song.findAll({attributes: ["iTunesID"]})


            const SongIDs = [];
            DBsongs.forEach(ids => {
                SongIDs.push(ids.dataValues.iTunesID)
            });

            const Token = getToken(certPath, appleMusicTemaID, appleMusicKeyID);

            var options = {
                url: 'https://api.music.apple.com/v1/catalog/at/playlists/' + req.body.playlist + "/tracks?offset=" + parseInt(req.body.offset || 0),
                headers: {
                    'Authorization': 'Bearer ' + Token.token
                }
            };
            console.log(Token.token);

            request(options, async (error, response, body) => {
                if (error) {
                    return res.status(500).send("Not able to fetch playlist")
                }
                body = JSON.parse(body);
                const tracks = body.data;
                let songs = [];

                if (body.next) {
                    songs.push({next: body.next})
                }

                for (let i = 0; i < tracks.length; i++) {
                    const track = tracks[i];
                    let xsong = {
                        "id": track.id,
                        "name": track.attributes.name,
                        "URL": track.attributes.previews[0].url,
                        "genre": track.attributes.genreNames[0]
                    };
                    if (!SongIDs.includes(parseInt(track.id))) {
                        const songCollection = await song.create({
                            songName: xsong.name,
                            URL: xsong.URL,
                            iTunesID: xsong.id,
                            genre: xsong.genre,
                            totalLikes: 0,
                            totalDislikes: 0
                        });
                        songs.push(songCollection)
                    }
                }

                res.status(200).send(songs)
            })


        } catch (e) {
            console.log(e);
            res.status(500).send(e)
        }
    },

    async getAllSongs(req, res) {
        try {
            const songCollection = await song.findAll({});
            res.status(200).send(songCollection)
        } catch (e) {
            console.log(e);
            res.status(500).send(e)
        }
    },

    async getSongById(req, res) {
        try {
            const songCollection = await song.findByPk(parseInt(req.params.id));
            if (songCollection) {
                res.status(200).send({user: songCollection});
            } else {
                res.status(404).send({error: "Song not found"});
            }

        } catch (e) {
            console.log(e);
            res.status(500).send(e)
        }
    },

    async deleteSong(req, res) {
        try {
            const _id = req.params.id;
            const songCollection = await song.findByPk(parseInt(req.params.id));

            if (songCollection) {
                songCollection.destroy();
                res.status(200).send({
                    msg: "Succesfully deleted!",
                    song: songCollection
                })
            } else {
                res.status(404).send({msg: "Song not found"})
            }
        } catch (e) {
            console.log(e);
            res.status(500).send(e)
        }
    },

    getAppleSong: async function (req, res) {
        try {
            const term = req.params.term;
            const results = https.get('https://itunes.apple.com/search?term=' + term + '&limit=20&media=music');
            if (results === null){
                res.status(404).send({msg:"Empty Results"})
            }
            else
            {res.status(200).send(results)}
        } catch (e) {
            console.log(e);
            res.status(500).send(e)
        }
    }
}