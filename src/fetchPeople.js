import fetch from "node-fetch";
export async function getPeopleCount() {
    const res = await fetch('https://swapi.dev/api/people');
    return (await res.json()).count;
};

export async function getPerson(id) {
    const res = await fetch('https://swapi.dev/api/people/' + id);
    const person = await res.json();

    const filmRes = await fetch('https://swapi.dev/api/films');
    const films = (await filmRes.json()).results;

    person.films = person.films.map(url => {
        return films.find(film => film.url === url).title || null
    });

    const homeworldRes = await fetch(person.homeworld);
    person.homeworld = (await homeworldRes.json()).name;

    if (person.species && person.species[0]) {
        console.log(person.species[0]);
        const speciesRes = await fetch(person.species[0]);
        person.species = (await speciesRes.json()).name;
    } else person.species = 'Human';

    return person;
};