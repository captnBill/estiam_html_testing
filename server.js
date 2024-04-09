const express = require('express');
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./messages.db');

const app = express();
app.use(express.json());
app.use(express.static('public'));

db.run('CREATE TABLE IF NOT EXISTS messages(text TEXT)');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/messages', (req, res) => {
    db.all("SELECT text FROM messages", function(err, rows) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(rows);
        }
    });
});

app.post('/messages', (req, res) => {
    db.run(`INSERT INTO messages(text) VALUES(?)`, [req.body.message], function(err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send({ message: 'Message saved!' });
        }
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));