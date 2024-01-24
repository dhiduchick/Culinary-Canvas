const router = require('express').Router();
const { users } = require('../../models');


router.post('/', async (req,res) => {
    try {
        const userData = await users.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        })
    } catch (err) {
        res.status(400).json(err);
        console.log(err);
    }
});


router.post('/login', async (req,res) => {
    try {
        const userData = await users.findOne({where: {email: req.body.email} });
        if(!userData){
            res.status(400)
            .json({message: 'Incorrect email'});
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);
        
        if(!validPassword){
            res.status(400)
            .json({message: "Incorrect password"});
            return;
        }
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.json({user: userData, message: "Welcome! You are logged in!"})
        })

    } catch (err) {
        res.status(400).json(err)
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

  module.exports = router;