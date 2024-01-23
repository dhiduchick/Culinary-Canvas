const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const multer = require('multer');
const cloudinaryStorage = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

const app = express();
const port = 3000;

// Set up Handlebars.js as the view engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

// Configure multer with Cloudinary storage
const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'uploads', // optional, specify the folder for uploaded files
    allowedFormats: ['jpg', 'jpeg', 'png'],
    filename: function (req, file, cb) {
        cb(null, file.originalname); // use the original file name as the Cloudinary public_id
    }
});

const parser = multer({ storage: storage });

// Serve the HTML form
app.get('/', (req, res) => {
    res.render('form');
});

// Handle form submission with file upload
app.post('/userprofile', parser.single('image'), (req, res) => {
    const { title, author, ingredients, steps } = req.body;
    const imageFile = req.file ? req.file.url : 'Not selected'; // Assuming you are using multer with multer-storage-cloudinary

    // Render the userprofile.handlebars template with the submitted data
    res.render('userprofile', { title, author, ingredients, steps, imageFile });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
