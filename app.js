const routes = require('./routes.js');
const express = require('express');
const app = express();

// **** IMPORTS AND CONFIG ****
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const router = express.Router();
const rootPath = path.join(__dirname, 'public');
app.set('view engine', 'pug')

// **** PORT ****
const PORT = process.env.PORT || 3000;

// **** MIDDLEWARES ****
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
app.use(express.static(rootPath));

// **** ROUTES ****
for (const route of routes) {
    if (route.method === 'get') {
        router.get(route.path, (req, res) => {
            res.render(route.file, {embed: req.query.embed ?? false, title: route.title, description: route.description});
        })
    } else {
        router.post(route.path, (req, res) => {
            res.render(route.file, {title: route.title, description: route.description});
        })
    }
}

// **** START SERVER ****
app.listen(PORT, (err) => {
    if (err)
        return console.error('Error starting server:', err);

    console.log(`Server is running on http://localhost:${PORT}`);
})