import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs';
import pg from 'pg';

const app = express();
const PORT = process.env.PORT || 3000;

const db = new pg.Client({
    config: 'add your config here'
});

await db.connect();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    const result = await db.query('SELECT * FROM tasks ORDER BY id DESC;');
    res.locals.list = result.rows;
    res.render('index.ejs');
    // db.end();
});

app.get('/add', async (req, res) => {
    // const result = await db.query('INSERT INTO tasks (todo) VALUES ($1);', [req.query.task]);
    // res.locals.list = result.rows;
    res.render('add.ejs');
    // db.end();
});

app.post('/add', async (req, res) => {
    const { value } = req.body;
    await db.query('INSERT INTO tasks (todo) VALUES ($1);', [value]);
    const result = await db.query('SELECT * FROM tasks ORDER BY id DESC;');
    res.locals.list = result.rows;
    res.render('index.ejs');
    // db.end();
});

app.post('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await db.query('DELETE FROM tasks WHERE id = $1;', [id]);
    const result = await db.query('SELECT * FROM tasks ORDER BY id DESC;');
    res.locals.list = result.rows;
    res.render('index.ejs');
    // db.end();
});

app.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM tasks where id = $1;', [id]);
    res.locals.list = result.rows;
    res.render('edit.ejs');
    // db.end();
});

app.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;
    await db.query('Update tasks set todo = $1 where id = $2;', [value, id]);
    const result = await db.query('SELECT * FROM tasks ORDER BY id DESC;');
    res.locals.list = result.rows;
    res.render('index.ejs');
    // db.end();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
