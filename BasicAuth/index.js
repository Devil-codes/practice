import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

const db = new pg.Client({});

let userIsLoggedIn = false;

app.get('/', (req, res) => {
    console.log(req);
    console.log('User is logged in: ', userIsLoggedIn);
    if (userIsLoggedIn) {
        res.render('home.ejs');
    } else {
        res.redirect('/login');
    }
});

app.get('/login', (req, res) => {
    res.render('login.ejs');
});

app.get('/register', (req, res) => {
    res.render('register.ejs');
});

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    db.query('INSERT INTO users (user_name, password) VALUES ($1, $2)', [username, password], (err) => {
        if (err) {
            console.error('Error inserting user', err.stack);
            res.status(500).send('Error registering user');
        } else {
            res.redirect(200, '/login');
        }
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query('select * from users where user_name = $1 and password = $2', [username, password], (err, result) => {
        if (err) {
            console.error('Error logging in', err.stack);
            res.status(500).send('Error logging in');
        } else if (result.rows.length > 0) {
            userIsLoggedIn = true;
            res.redirect(200, '/');
        } else {
            res.status(401).send('Invalid username or password');
        }
    });
});

app.listen(port, () => {
    db.connect((err) => {
        if (err) {
            console.error('Error connecting to the database', err.stack);
        } else {
            console.log('Connected to the database');
        }
    });
    console.log(`Server is running on http://localhost:${port}`);
});
