const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { insertRandomJoke, getAllJokes } = require('./database')

const app = express();
app.use(cors());
const PORT = 3000;

//Get-Route
app.get('/jokes', (req, res) => {
    getAllJokes((jokes) => {
        res.json(jokes);
    });
});

// Get Jokes from API and Saving in DB
async function fetchingAndSavingRandomJokes(count = 10) {
    for (let i = 0; i < count; i++) {
        try {
            const res = await axios.get('https://official-joke-api.appspot.com/random_joke');
            insertRandomJoke(res.data);    
            console.log('Joke saved in DB');

        } catch (err) {
            console.error(`Failed ${i}`, err.message);
        }
    }
}

app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`)
    await fetchingAndSavingRandomJokes();
});