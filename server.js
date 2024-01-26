//Import required modules and packages
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const { strict } = require('assert');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//Create an Express applicaiton
const app = express();
//Set the port to 3001
const PORT = process.env.PORT || 3001;

// Create the Handlebars.js engine object with custom helper functions
const hbs = exphbs.create({ helpers });

//Configure session settings
const sess = {
  secret: `process.env.SS_SECRET`, //Secret key for session management
  cookie: {
    maxAge: 300000, //Session timeoit in millisecons (5 minutes)
    httpOnly: true, //The cookie is only accessiblr by the server
    secure: false, //Disable secure cookies for development
    sameSite: 'strict', //Cookies are sent only in a firsr-party context
  },
  resave: false, //Dont save session if unmodified 
  saveUninitialized: true, //Save new sessions
  store: new SequelizeStore({
    db: sequelize //Use sequelize to store sessions in the database
  })
};
//Use the configured session middleware 
app.use(session(sess));

// Inform Express.js which template engine we're using
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//Parse incoming JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

//Use the defined routes
app.use(routes);

//Sync the Srquelise models with the database and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
