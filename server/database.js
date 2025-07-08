const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./jokes.db');


//Creating DB
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS jokes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        setup TEXT,
        punchline TEXT
        )
        `);
});

//Insert Random Joke in DB
function insertRandomJoke(joke) {
    db.run(
        `INSERT INTO jokes(setup, punchline) VALUES (?,?)`,
        [joke.setup, joke.punchline],
        (err) => {
            if(err) {
                console.error('FAILED INSERT: ', err.message);
            }
        }
    );
}

//Get-Method for fetching all Jokes from DB
function getAllJokes(callback) {
    db.all('SELECT * FROM jokes', (err, rows) => {
        if(err) {
            console.err(err);
            callback([]);
        } else {
            callback(rows);
        }
    });
}

function deleteAllJokes(callback) {
    db.run('DELETE FROM jokes', (err) => {

    })
}
module.exports = {
    db,
    insertRandomJoke,
    getAllJokes,
    deleteAllJokes,
};

