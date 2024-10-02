// Função para embaralhar o array usando o algoritmo Fisher-Yates
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Índice aleatório entre 0 e i
    [array[i], array[j]] = [array[j], array[i]]; // Troca os elementos
  }
  return array;
}

document.querySelector('#randomizer-button').addEventListener('click', () => {
  let attackerPlayers = [];
  let defendersPlayers = [];
  let randomizedPlayers = [];

  // Pegar o input.value (os nomes escritos no textarea)
  const players = document.querySelector('#randomizer-area').value.split('\n');

  // Embaralhar os jogadores
  randomizedPlayers = shuffle(players);

  // Distribuir alternadamente entre attackers e defenders
  randomizedPlayers.forEach((player, i) => {
    if (i % 2 === 0) {
      attackerPlayers.push(player);
    } else {
      defendersPlayers.push(player);
    }
  });

  updatePlayerNames(attackerPlayers, defendersPlayers);

  if (attackerPlayers.length !== 0 && defendersPlayers.length !== 0) {
    document.querySelector('#confirm-btn').addEventListener('click', () => {
      document.querySelector('#randomizer-container').style.display = 'none'
      document.querySelector('#picksAndBans-container').style.display = 'flex'
      document.querySelector('#confirm-btn').style.display = 'none'
    })
  }
});


document.querySelector('#home-btn').addEventListener('click', () => {
  window.location.reload()
})

function updateBodyBackgroundPick(map) {
  const mapName = map.getAttribute('data-map')
  document.body.style.background = `url(img/${mapName}.webp)`
}

function updateBodyBackgroundBan(map) {
  const mapName = map.getAttribute('data-map')
  document.body.style.background = `linear-gradient(rgba(17, 17, 17, 0.8), rgba(20, 20, 20, 1)), url(img/${mapName}.webp)`
}

const banPickPhase = document.querySelector('#banPick-phase')

let isSubmitted = false

function updateBanPickPhaseMd3(clickCount) {

  if (isSubmitted) {
    banPickPhase.innerHTML = 'Mapas escolhidos'
    return
  }

  if (clickCount < 2) {
    banPickPhase.innerHTML = 'Fase de banimento'
  }
  else if (clickCount < 4) {
    banPickPhase.innerHTML = 'Fase de escolha'
  }
  else if (clickCount < 6) {
    banPickPhase.innerHTML = 'Fase de banimento'
  }
  else if (clickCount === 6) {
    banPickPhase.innerHTML = 'Escolha o último mapa disponivel'
  }
  else if (clickCount === 7) {
    banPickPhase.innerHTML = 'Último mapa'
  }
}

function updateBanPickPhaseMd5(clickCount) {

  if (isSubmitted) {
    banPickPhase.innerHTML = 'Mapas escolhidos'
    return
  }

  if (clickCount < 2) {
    banPickPhase.innerHTML = 'Fase de banimento'
  }
  else if (clickCount < 6) {
    banPickPhase.innerHTML = 'Fase de escolha'
  }
  else if (clickCount === 6) {
    banPickPhase.innerHTML = 'Escolha o último mapa disponivel'
  }
  else if (clickCount === 7) {
    banPickPhase.innerHTML = 'Último mapa'
  }
}

function handleMapClickMd3(map, clickCount) {
  const img = map.querySelector('img')
  img.style.filter = 'brightness(0.3)'

  if (clickCount <= 2) {
    map.classList.add('ban')
    updateBodyBackgroundBan(map)
  }
  else if (clickCount <= 4) {
    map.classList.add('pick')
    updateBodyBackgroundPick(map)
  }
  else if (clickCount <= 6) {
    map.classList.add('ban')
    updateBodyBackgroundBan(map)
  }
  else if (clickCount <= 7) {
    map.classList.add('pick')
    updateBodyBackgroundPick(map)
  }
}

function handleMapClickMd5(map, clickCount) {
  const img = map.querySelector('img')
  img.style.filter = 'brightness(0.3)'

  if (clickCount <= 2) {
    map.classList.add('ban')
    updateBodyBackgroundBan(map)
  }
  else if (clickCount <= 7) {
    map.classList.add('pick')
    updateBodyBackgroundPick(map)
  }
}

function deselectMap(map) {
  const img = map.querySelector('img')

  if (map.classList.contains('ban')) {
    map.classList.remove('ban');
  } else if (map.classList.contains('pick')) {
    map.classList.remove('pick');
  }

  img.style.filter = 'none';
}

const maps = document.querySelectorAll('[data-map]')
let clickCount = 0

document.querySelector('#md3').addEventListener('click', () => {
  updateBanPickPhaseMd3(clickCount)
  maps.forEach(map => {
    map.addEventListener('click', () => {
      if (map.classList.contains('ban') || map.classList.contains('pick')) {
        clickCount--
        deselectMap(map)
      } else {
        clickCount++
        handleMapClickMd3(map, clickCount);
      }

      updateBanPickPhaseMd3(clickCount)

      if (clickCount === 7) {
        document.querySelector('.submit-btn').addEventListener('click', () => {
          isSubmitted = true
          banPickPhase.innerHTML = 'Mapas escolhidos'

          document.querySelectorAll('.ban').forEach(bannedMap => {
            bannedMap.style.display = 'none'
            document.querySelectorAll('.pick img').forEach(pickedMap => {
              pickedMap.style.width = '220px'
              pickedMap.style.height = '160px'
            })
          })
        })
      }
    }
    )
  })
})

document.querySelector('#md5').addEventListener('click', () => {
  updateBanPickPhaseMd5(clickCount)
  maps.forEach(map => {
    map.addEventListener('click', () => {

      if (map.classList.contains('ban') || map.classList.contains('pick')) {
        clickCount--
        deselectMap(map)

      } else {
        clickCount++
        handleMapClickMd5(map, clickCount);
      }

      updateBanPickPhaseMd5(clickCount)

      if (clickCount === 7) {
        document.querySelector('.submit-btn').addEventListener('click', () => {
          isSubmitted = true
          banPickPhase.innerHTML = 'Mapas escolhidos'
          document.querySelectorAll('.ban').forEach(bannedMap => {
            bannedMap.style.display = 'none'
            document.querySelectorAll('.pick img').forEach(pickedMap => {
              pickedMap.style.width = '220px'
              pickedMap.style.height = '160px'
            })
          })
        })
      }
    }
    )
  })
})

// Função para atualizar os nomes na tabela de attackers e defenders
function updatePlayerNames(attackerPlayers, defendersPlayers) {
  const playerAttack = document.querySelectorAll('.player-attack')
  const playerDefender = document.querySelectorAll('.player-defense')

  playerAttack.forEach(player => {
    const playerIndex = player.dataset.player;
    player.innerHTML = attackerPlayers[playerIndex] || ''
  });

  playerDefender.forEach(player => {
    const playerIndex = player.dataset.player;
    player.innerHTML = defendersPlayers[playerIndex] || ''
  });
}
