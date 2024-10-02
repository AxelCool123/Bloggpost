const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'swedish_outlaw',
    password: "passwd",
    database: 'bloggpost'
});

connection.connect(err => {
    if (err) throw err;
    console.log('Connected to the database');
});

app.get('/', (req, res) => {
    connection.query('SELECT * FROM posts', (err, results) => {
        if (err) throw err;
        res.render('index', { posts: results });
    });
});

app.get('/edit', (req, res) => {
    res.render('edit');
});

app.post('/edit', (req, res) => {
    const { title, content } = req.body;
    const query = 'INSERT INTO posts (title, content) VALUES (?, ?)';
    
    connection.query(query, [title, content], (err) => {
        if (err) throw err;
        console.log(req.body);
        res.redirect('/');
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
