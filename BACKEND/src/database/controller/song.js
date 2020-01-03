/* * * * * * * * * * * * * * *
 * Created By Michael Marolt *
 * * * * * * * * * * * * * * */
const song = require('../models/index').Song;
const validator = require("validator");

module.exports = {
    async create (req,res) {
        try {
            if (validator.isEmpty(req.body.songName || "")) {
                return res.status(400).send({ error: "No Song Name provided" })
            } else if (validator.isEmpty(req.body.URL || "")) {
                return res.status(400).send({ error: "No URL provided" })
            } else if (validator.isEmpty(req.body.iTunesID || "")) {
                return res.status(400).send({ error: "No iTunes ID provided" })
            }

            const songCollection = await song.create({
                songName: req.body.songName,
                URL: req.body.URL,
                iTunesID: req.body.iTunesID
            })


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

    async getAllSongs (req,res) {
        try {
            const songCollection = await song.findAll({})
            res.status(200).send(songCollection)
        } catch (e) {
            console.log(e);
            res.status(500).send(e)
        }
    },
    
    async getSongById (req,res) {
        try {
            const songCollection = await song.findByPk(parseInt(req.params.id));
            if (songCollection) {
                res.status(200).send({ user: songCollection });
            } else {
                res.status(404).send({ error: "Song not found" });
            }

        } catch (e) {
            console.log(e);
            res.status(500).send(e)
        }
    },

    async deleteSong (req,res) {
        try {
            const _id = req.params.id;
            const songCollection = await song.findByPk(parseInt(req.params.id));

            if (songColelction) {
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
}