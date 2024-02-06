//Code help from Lada
const { OAuth2Client } = require('google-auth-library');
const router = require('express').Router();
const { jwtDecode } = require('jwt-decode');
const { User } = require('../models');


const url = process.env.NODE_ENV === 'production' ? 'https://evening-reef-48573-57db96f3f837.herokuapp.com' : 'http://localhost:3001'

const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${url}/oauth2/redirect/google`
);

//Creates route to google
router.get('/login/federated/google', (req, res) => {
  res.redirect(
    oAuth2Client.generateAuthUrl({
      // access_type: 'offline',
      scope: 'openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
    })
  );
});

router.get('/oauth2/redirect/google', async (req, res) => {
  const qs = new URL(req.url, url).searchParams;
  const code = qs.get('code');
  console.log(`Code is ${code}`);

  // Now that we have the code, use that to acquire tokens.
  const r = await oAuth2Client.getToken(code);
  // Make sure to set the credentials on the OAuth2 client.
  oAuth2Client.setCredentials(r.tokens);
  console.info(r.tokens);

  const decodedIdToken = jwtDecode(r.tokens.id_token);

  console.log(`Email: ${decodedIdToken.email}`)
  console.log(`Name: ${decodedIdToken.name}`)

  try {
    // Check if the user exists in the database based on their email
    let userData = await User.findOne({ where: { email: decodedIdToken.email } });

    // If the user exists, log them in
    if (!userData) {
      // If the user does not exist, create a new user with the provided email
      userData = await User.create({ email: decodedIdToken.email, name: decodedIdToken.name });
    }
    // req.session.save(() => {
    //   req.session.user_id = userData.id;
    //   req.session.logged_in = true;

//      res.setHeader('Authentication', `Bearer ${r.tokens.id_token}`)
      res.redirect(`/login?id_token=${r.tokens.id_token}`);
//    });
    
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;