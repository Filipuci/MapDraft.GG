let randomizedPlayers = []

function numeroAleatorio(max) {
  return Math.floor(Math.random() * max)
}

document.querySelector('#randomizer-button').addEventListener('click', () => {
  let attackerPlayers = []
  let defendersPlayers = []
  randomizedPlayers = []
  
  // Pegar o input.value(os nomes escritos no textarea)
  const players = document.querySelector('#randomizer-area').value.split('\n')
  const max = players.length

  // Sortear os nomes dos X nomes escritos
  for (let i = 0; i < players.length; i++) {
    let j = numeroAleatorio(max)
    while (randomizedPlayers.indexOf(players[j]) != -1) {
      j = numeroAleatorio(max)
    }

    randomizedPlayers.push(players[j])
  }

  // Definir quem vai estar dentro de attackersPlayers e quem vai estar dentro de defendersPlayers
  randomizedPlayers.forEach((player, i) => {
    if (i < 5) {
      attackerPlayers.push(player)
    } else {
      defendersPlayers.push(player)
    }
  })
  updatePlayerNames(attackerPlayers, defendersPlayers)
})



// Adicionar os nomes sorteador na tabela de attackers and defenders
function updatePlayerNames(attackerPlayers, defendersPlayers) {
  const playerAttack = document.querySelectorAll('.player-attack')
  const playerDefender = document.querySelectorAll('.player-defense')

  playerAttack.forEach(player => {
    const playerIndex = player.dataset.player
    player.innerHTML = attackerPlayers[playerIndex]
  })

  playerDefender.forEach(player => {
    const playerIndex = player.dataset.player
    player.innerHTML = defendersPlayers[playerIndex]
  })
}