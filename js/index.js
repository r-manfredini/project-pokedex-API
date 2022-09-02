const cardContainer = document.querySelector('.card-container')
const btnMore = document.querySelector('#btnMore')
const btnIcon = document.querySelector('#btnIcon')
const input = document.querySelector('.input')
const leftContainer = document.querySelector('.left-container')
const rightContainer = document.querySelector('.right-container')
const cardList = document.querySelector('.card-list')
const itemSelected = document.querySelector('.item-selected')
const listTypesPokemon = document.querySelector('.list-types-pokemon')
const cardCountContainer = document.querySelector('.card-count-container')
const preloader = document.querySelector('.lds-ellipsis')
const pokeNumbers = document.querySelector('.poke-numbers')
let offset = 0
let limit = 9

function scrollTop() {
  const scrollUp = document.querySelector('#scroll-up')
  if (scrollY >= 560) {
    scrollUp.classList.add('show-scroll')
  } else {
    scrollUp.classList.remove('show-scroll')
  }
}
window.addEventListener('scroll', scrollTop)

function fetchPokemon(url) {
  preloader.style.display = 'block'
  fetch(url)
    .then((res) => {
      return res.json()
    })
    .then((allPokemons) => {
      getPokemon(allPokemons)

      numbersCount(allPokemons.count)
    })
    .catch((err) => {
      return err
    })
}

function getPokemon(allPokemons) {
  allPokemons.results.map((pokemon) => {
    fetch(pokemon.url)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        displayPokemon(data)
      })
      .catch((err) => {
        return err
      })
  })
}

function displayPokemon(data) {
  const pokemon = {
    id: data.id,
    name: data.name,
    type: data.types.map((typeInfo) => {
      return typeInfo.type.name
    }),
    image: data.sprites.other.dream_world.front_default,
  }

  cardContainer.innerHTML += `<div class="card-pokemon ${pokemon.type[0]}">
                                  <div class="card-pokemon-img">
                                    <img src="${pokemon.image}" alt="${
    pokemon.name
  }">
                                  </div>
                                  <div class="card-pokemon-info">
                                    <span class="card-pokemon-id">#${pokemon.id
                                      .toString()
                                      .padStart(3, '0')}
                                    </span>
                                    <span class="card-pokemon-name">${
                                      pokemon.name
                                    }</span>
                                    <span class="card-pokemon-type">${pokemon.type.join(
                                      ' | ',
                                    )}<span>
                              </div>`

  preloader.style.display = 'none'
}

function searchPokemon() {
  document.querySelector('.card-container').innerHTML = ''
  btnMore.style.display = 'none'
  const inputValue = input.value.toLowerCase()
  preloader.style.display = 'block'

  cardCountContainer.style.display = 'none'
  listTypesPokemon.classList.remove('list-active')

  fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      displayPokemon(data)
    })
    .catch(() => {
      preloader.style.display = 'none'
      return (cardContainer.innerHTML = `<div class="erro-poke">
        <div>
         <img src="./images/icon-poke-red.png" alt="Zero Pokemon">
        </div>
        <span>Nenhum Pokémon corresponde à sua pesquisa! </span>
       </div>`)
    })

  document.querySelector('.input').value = ''
}

btnIcon.addEventListener('click', searchPokemon)

// =-------------= CARD LIST =------------
// "______________________________________________"
function pokemonTypes() {
  const cardList = document.querySelector('.card-list')
  fetch('https://pokeapi.co/api/v2/type/')
    .then((res) => {
      return res.json()
    })
    .then((types) => {
      types.results.forEach((type) => {
        fetch(type.url)
          .then((res) => {
            return res.json()
          })
          .then((data) => {
            if (data.pokemon != '') {
              cardList.innerHTML += `<li>
          <a href="#bookmark" class="card-btn btn-${data.name}" code-type="${data.id}" >
            <div class="icon"><img src="../images/${data.name}.png" alt="" /></div>
            <span class="btn-span">${data.name}</span>
          </a>
        </li>`

              let allButtons = document.querySelector('.card-buttons-pokemon')
              let currentButton = allButtons.querySelectorAll('.card-btn')
              const type = document.querySelector('.type')

              for (var i = 0; i < currentButton.length; i++) {
                currentButton[i].addEventListener('click', function () {
                  document.querySelector('.card-container').innerHTML = ''
                  cardCountContainer.style.display = 'flex'

                  let current = document.getElementsByClassName('active')
                  current[0].className = current[0].className.replace(
                    'active',
                    '',
                  )
                  this.className += ' active '
                  type.innerHTML = current[0].textContent
                  getTypesPokemon(current[0])
                })
              }
            }
          })
      })
    })
    .catch((err) => {
      return err
    })
}
pokemonTypes()

itemSelected.addEventListener('click', () => {
  // if ((listTypesPokemon.style.display = 'none')) {
  //   listTypesPokemon.style.display = 'flex'
  // }
  listTypesPokemon.classList.toggle('list-active')
  cardCountContainer.style.display = 'flex'
})

function createListPokemon() {
  const listTypes = document.querySelector('.list-types')
  fetch('https://pokeapi.co/api/v2/type/')
    .then((res) => {
      return res.json()
    })
    .then((types) => {
      types.results.forEach((type) => {
        fetch(type.url)
          .then((res) => {
            return res.json()
          })
          .then((data) => {
            if (data.pokemon != '') {
              listTypes.innerHTML += `<li>
          <a href="#bookmark" class="poke-btn poke-${data.name}" code-type="${data.id}" >
            <div class="icon"><img src="./images/${data.name}.png" alt="" /></div>
            <span class="poke-span">${data.name}</span>
          </a>
        </li>`

              let listButtons = document.querySelector('.list-types-pokemon')
              let currentButton = listButtons.querySelectorAll('.poke-btn')

              const type = document.querySelector('.type')

              for (var i = 0; i < currentButton.length; i++) {
                currentButton[i].addEventListener('click', function () {
                  document.querySelector('.card-container').innerHTML = ''
                  // listTypesPokemon.style.display = 'none'
                  listTypesPokemon.classList.toggle('list-active')
                  // cardCountContainer.style.display = 'flex'

                  let current = document.getElementsByClassName('active')
                  current[0].className = current[0].className.replace(
                    'active',
                    '',
                  )
                  this.className += ' active '
                  type.innerHTML = current[0].textContent
                  getTypesPokemon(current[0])
                })
              }
            }
          })
      })
    })
    .catch((err) => {
      return err
    })
}
createListPokemon()

function getTypesPokemon(currentButton) {
  const codeType = currentButton.getAttribute('code-type')
  preloader.style.display = 'block'

  if (currentButton != 0) {
    fetch(`https://pokeapi.co/api/v2/type/${codeType}`)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        numbersCount(data.pokemon.length)
        data.pokemon.forEach((pokemon) => {
          fetch(pokemon.pokemon.url)
            .then((res) => {
              return res.json()
            })
            .then((data) => {
              showTypesPokemon(data)
            })
        })
      })
      .catch((err) => {
        return err
      })
  } else {
    btnMore.style.display = 'block'
    fetchPokemon(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${limit}`)
  }
}

function showTypesPokemon(data) {
  const pokemon = {
    id: data.id,
    name: data.name,
    type: data.types.map((typeInfo) => {
      return typeInfo.type.name
    }),
    image: data.sprites.other.dream_world.front_default,
  }

  if (pokemon.image != null) {
    cardContainer.innerHTML += `<div class="card-pokemon ${pokemon.type[0]}">
                                  <div class="card-pokemon-img">
                                    <img src="${pokemon.image}" alt="${
      pokemon.name
    }">
                                  </div>
                                  <div class="card-pokemon-info">
                                    <span class="card-pokemon-id">#${pokemon.id
                                      .toString()
                                      .padStart(3, '0')}
                                    </span>
                                    <span class="card-pokemon-name">${
                                      pokemon.name
                                    }</span>
                                    <span class="card-pokemon-type">${pokemon.type.join(
                                      ' | ',
                                    )}<span>
                                  </div>
                              </div>`
  }

  btnMore.style.display = 'none'
  preloader.style.display = 'none'
}

function numbersCount(count) {
  cardCountContainer.innerHTML = `<div class="card-count-img">
                              <img src="./images/icon-all.png" alt="" />
                           </div>
                           <span class="poke-numbers">${count} Pokémon</span>`
}

input.addEventListener('keypress', (e) => {
  if (e.keyCode === 13) {
    e.preventDefault()
    searchPokemon()
  }
})

btnMore.addEventListener('click', () => {
  offset += 9

  fetchPokemon(
    `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`,
  )
})

fetchPokemon(
  `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`,
)
