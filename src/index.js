import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = 8080;

app.set('views', 'src/views')
app.set('view engine', 'pug');

import { getPeopleCount, getPerson } from './fetchPeople.js';
let peopleCount = 80;
(async function() {
    peopleCount = await getPeopleCount();
})();

app.get('/', async (req, res) => {
    const rndId = Math.floor(Math.random() * (peopleCount - 1)) + 1;

    const person = await getPerson(rndId);

    return res.render('person', person);
});

app.listen(PORT, () => console.log(`App running on port ${PORT}`));