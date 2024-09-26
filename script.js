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
});

// Função para atualizar os nomes na tabela de attackers e defenders
function updatePlayerNames(attackerPlayers, defendersPlayers) {
  const playerAttack = document.querySelectorAll('.player-attack');
  const playerDefender = document.querySelectorAll('.player-defense');

  playerAttack.forEach(player => {
    const playerIndex = player.dataset.player;
    player.innerHTML = attackerPlayers[playerIndex] || ''; // Para lidar com menos de 5 jogadores
  });

  playerDefender.forEach(player => {
    const playerIndex = player.dataset.player;
    player.innerHTML = defendersPlayers[playerIndex] || ''; // Para lidar com menos de 5 jogadores
  });
}
