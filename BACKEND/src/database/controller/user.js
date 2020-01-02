/* * * * * * * * * * * * * * *
 * Created By Michael Marolt *
 * * * * * * * * * * * * * * */
const user = require('../models/index').User;
const hashTool = require("../helpers/hashTool");
const validator = require("validator")

module.exports = {
    async create (req,res) {
        try {
            if (validator.isEmpty(req.body.name || "")) {
                return res.status(400).send({ error: "No Name provided" })
            } else if (validator.isEmpty(req.body.email || "")) {
                return res.status(400).send({ error: "No Email provided" })
            } else if (validator.isEmpty(req.body.password || "")) {
                return res.status(400).send({ error: "No Password provided" })
            } else if (!req.body.birthday) {
                return res.status(400).send({ error: "No Age provided" })
            } 

            const userCollection = await user.create({
                name: req.body.name,
                email: req.body.email,
                password: await hashTool.createHash(req.body.password),
                birthday: req.body.birthday
            });
            if (!userCollection) {
                return res.status(400).send({ error: 'User creation unsuccesfull' })
            } else {
                delete userCollection.dataValues["password"]
                res.status(200).send({ user: userCollection });
            };

        } catch (e) {
            console.log(e);
            res.status(500).send(e)
        }
    },

    async getAllUsers(req, res) {
        try {
            const userCollection = await user.findAll({});
            userCollection.forEach(element => {
                delete element.dataValues["password"];
            });
            res.status(200).json(userCollection);
        }
        catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    },

    async getUserById(req,res) {
        try {
            const userCollection = await user.findByPk(parseInt(req.params.id))
            if (userCollection) {
                delete userCollection.dataValues["password"]
                res.status(200).send({ user: userCollection });
            } else {
                res.status(404).send({ error: "User not found" });
            }

        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    },

    async changeUser (req,res) {
        try {
            // TODO only a User can update itself
            const _id = req.params.id;
            const updates = Object.keys(req.body);
            const allowedUpdates = ["name", "email", "password", "birthday", "password"];
            const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

            if (!isValidOperation) {
                return res.status(400).send({ error: "Invalid Updates" })
            }

            let userCollection = await user.findByPk(parseInt(_id));
            if (!userCollection) {
                return res.status(404).send({ msg: "User not found" });
            }

            if (req.body.password) {
                req.body.password = await hashTool.createHash(req.body.password);
            }
            
            const userReturn = await user.update(req.body, { where: { id: _id } });
            if (userReturn[0] === 0) {
                return res.status(404).send({ error: "Update failed" })
            }
            userCollection = await user.findByPk(parseInt(_id));
            delete userCollection.dataValues["password"]
            res.status(200).send({ user: userCollection })

        } catch (e) {
            console.log(e);
            res.status(500).send(e)
        }
    },

    async deleteUser (req,res) {
        try {
            const _id = req.params.id;
            const userCollection = await user.findByPk(parseInt(_id));
            // TODO only a User can delete itself


            if (userCollection) {
                userCollection.destroy();
                delete userCollection.dataValues["password"]
                res.status(200).send({
                    msg: "Succesfully deleted!",
                    user: userCollection
                });
            } else {
                res.status(404).send({ msg: "User not found" });
            }
        
        } catch (e) {
            console.log(e);
            res.status(500).send(e)
        }
    },

}