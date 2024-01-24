const router = require('express').Router();
const { users, post, image, recipe } = require('../models');

router.get('/login', (req, res) => {
    if(req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
})

router.get('signup', (req,res) => {
    if(req.sessionj.logged_in){
        res.redirect('/');
        return;
    }
    res.render('signup')
})

router.get('/create', (req,res) => {
    console.log(req.session.user_id)
    try {
        const loggedIn = req.session.logged_inres.render('createRecipe', {
            loggedIn
        })
    } catch (err) {
        res.status(400).json(err);
    }
});


// router.get('/', async (req,res) => {
//     console.log(req.session.logged_in)
//     try{
//         const recipe_cards = await users.findAll({
//             attributes: {
//                 exclude: [
//                     'email',
//                     'ingredients',
//                     'directions',

//                 ],
//             },
//             include:[{model: recipe}, {model: image}]
//         });
//         const recipes = recipe_cards.map((recipe) => recipe.get({plain:true}))

//         const loggedIn = req.session.logged_in
//         res.render('home', {
//             recipes,
//             loggedIn
//         });

//     } catch (err) {
//         console.log(err);
//         res.status(400).json(err);
//     }
// });

module.exports = router