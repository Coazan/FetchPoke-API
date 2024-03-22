function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

document.addEventListener('DOMContentLoaded', () =>{
    const random=getRandomInt(1, 151);
    fetchData(random);
});

const fetchData = async(id) => {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data= await res.json();
        const pokemon = {
            img : data.sprites.other.dream_world.front_default,
            nombre: data.name,
            id: data.id,
            xp: data.base_experience,
            hp: data.stats[0].base_stat,
            ataque: data.stats[1].base_stat,
            defensa: data.stats[2].base_stat
        };
        pintarCard(pokemon);
    } catch (error) {
        console.log(error);
    }
}

const pintarCard = (pokemon) => {
    const flex = document.querySelector('.flex');
    const template = document.querySelector('#template-card').content;
    const clone = template.cloneNode(true);
    const fragment = document.createDocumentFragment();
    clone.querySelector('.card-body-img').setAttribute('src', pokemon.img);
    clone.querySelector('.card-body-title   ').innerHTML = `${pokemon.nombre} <span> Nº pokedex: ${pokemon.id}</span>`;
    clone.querySelector('.card-body-text   ').innerHTML = `exp. base: ${pokemon.xp}`;
    clone.querySelector('.card-body-text   ').innerHTML = `exp. base: ${pokemon.xp}`;
    clone.querySelector('.attack   ').innerHTML = `${pokemon.ataque}`;
    clone.querySelector('.hp   ').innerHTML = `${pokemon.hp}`;
    clone.querySelector('.defense   ').innerHTML = `${pokemon.defensa}`;
    fragment.appendChild(clone);
    flex.appendChild(fragment);
}