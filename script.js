const randomizerArea = document.querySelector('#randomizer-area')
const randomizedPlayers = []
const attackerPlayers = []
const defendersPlayers = []








document.querySelector('#randomizer-button').addEventListener('click', () => {
  // Pegar o input.value(os nomes escritos no textarea)
  const players = randomizerArea.value.split('\n')

  function numeroAleatorio() {
    return Math.floor(Math.random() * players.length)
  }
  
  function shuffle(array) {
    for (let i = 0; i < players.length; i++) {
      let j = numeroAleatorio()
      while (randomizedPlayers.indexOf(players[j]) != -1) {
        j = numeroAleatorio()
      }
  
      randomizedPlayers.push(players[j])
    }
  }
  
  shuffle()
  
  randomizedPlayers.forEach((player, i) => {
    if (i < 5) {
      attackerPlayers.push(player)
    } else {
      defendersPlayers.push(player)
    }
  })

  console.log(attackerPlayers)
  console.log(defendersPlayers)


  // Sortear os nomes dos X nomes escritos


  // Adicionar os nomes sorteador na tabela de attackers and defenders
})
