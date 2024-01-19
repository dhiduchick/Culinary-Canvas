
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Set up Handlebars.js as the view engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML form
app.get('/', (req, res) => {
    res.render('form');
});

// Handle form submission
app.post('/userprofile', (req, res) => {
    const { title, author, ingredients, steps } = req.body;
    const imageFile = req.files ? req.files.image.name : 'Not selected'; // Assuming you are using file upload middleware

    // Render the userprofile.handlebars template with the submitted data
    res.render('userprofile', { title, author, ingredients, steps, imageFile });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});