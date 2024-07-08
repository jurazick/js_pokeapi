const url = "https://pokeapi.co/api/v2/pokemon/"
const card = document.getElementById("card")
const btn = document.getElementById("btn")


function getData(){
    let id = Math.floor(Math.random()*1026)+1
    console.log(id)
    const finalUrl = url + id
    fetch(finalUrl)
    .then(r => r.json())
    .then(data => {
        generateCard(data)
    })
}

function generateCard(data){
    console.log(data)
    let name = data.name[0].toUpperCase() + data.name.slice(1)
    let hp = data.stats[0].base_stat
    let attack = data.stats[1].base_stat
    let defense = data.stats[2].base_stat
    let speed = data.stats[5].base_stat
    let themeColor = typeColor[data.types[0].type.name]
    let imgSrc

    if(data.sprites.other.dream_world.front_default) {
        imgSrc = data.sprites.other.dream_world.front_default
    }
    else{
        imgSrc = data.sprites.other["official-artwork"].front_default
    }


    card.innerHTML = `
        <p class="hp">
            <span>HP</span>
            ${hp}
        </p>
        <img src="${imgSrc}">
        <h2 class="name">${name}</h2>
        <div class="types">
        </div>
        <div class="stats">
            <div>
                <h3>${attack}</h3>
                <p>Attack</p>
            </div>
            <div>
                <h3>${defense}</h3>
                <p>Defense</p>
            </div>
            <div>
                <h3>${speed}</h3>
                <p>Speed</p>
            </div>
        </div>
    `
    appendTypes(data.types)
    setColor(themeColor)
}

function appendTypes(array){
    array.forEach(slot => {
        let span = document.createElement("span")
        span.textContent = slot.type.name
        document.querySelector(".types").appendChild(span)
    })
}


function setColor(color) {
    card.style.background = `radial-gradient(circle at 50% 0%,
    ${color} 36%,white 36%)`
    card.querySelectorAll(".types span").forEach(span => {
        span.style.backgroundColor = typeColor[span.textContent]
    })
}

window.onload = getData()


const typeColor = {
    normal: '#A8A77A',
	fire: '#EE8130',
	water: '#6390F0',
	electric: '#F7D02C',
	grass: '#7AC74C',
	ice: '#96D9D6',
	fighting: '#C22E28',
	poison: '#A33EA1',
	ground: '#E2BF65',
	flying: '#A98FF3',
	psychic: '#F95587',
	bug: '#A6B91A',
	rock: '#B6A136',
	ghost: '#735797',
	dragon: '#6F35FC',
	dark: '#705746',
	steel: '#B7B7CE',
	fairy: '#D685AD',
  };