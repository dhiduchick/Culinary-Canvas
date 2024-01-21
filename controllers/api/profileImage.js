const router = require('express').Router();
const { profile } = require('../../models');

router.post('/profile', async (req,res) => {
    try{
        const culinarydbData = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            birthday: req.body.birthday,
            bio: req.body.bio,
        })

        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).json(culinarydbData)
        });
    
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;