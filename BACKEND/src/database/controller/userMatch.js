/* * * * * * * * * * * * * * *
 * Created By Michael Marolt *
 * * * * * * * * * * * * * * */
const userMatch = require('../models/index').UserMatch;

module.exports = {
    async like (req,res) {
        try {
            const userId = req.user.id;
            const otherUserId = req.params.id;
            let match = false;
            const alreadyMatched = await  userMatch.findOne({where:{Userid: otherUserId, Userid2: userId}})
            if (alreadyMatched) {
                match = true;
                alreadyMatched.isMatch = true;
                await userMatch.update({isMatch: true},{where:{Userid: otherUserId, Userid2: userId}})
            }
            const newLike = await userMatch.create({
                Userid: userId,
                Userid2: otherUserId,
                isMatch: match
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
}