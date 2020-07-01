let tictactoe = {
    field : '',
    players: [],
    playersTurn: 0,
    init : function(players) {
      this.players = players.slice();
      this.field = new Array(9).fill("*").join('');
      this.playersTurn = 0;
    },
    printfield() {
        for(let k of this.field) {
            console.log(k)
        }
    },
    get getField() {
      return this.field
    },
}

function isWon(field) {
  let f = field;
  if(f[0] == f[1] == f[2] != "*"  || f[3] == f[4] == f[5] != "*" || f[6] == f[7] == f[8] != "*") {
    return true
  }
  if(f[0] == f[3] == f[6] != "*"  || f[1] == f[4] == f[7] != "*" || f[2] == f[5] == f[8] != "*") {
    return true
  }
  if(f[0] == f[4] == f[8] != "*"  || f[2] == f[4] == f[6] != "*" ) {
    return true
  }
  return false
}

let node = {
  init: function(value, children) {
    this.value = value;
    this.children = children.slice();
  },
  value: "",
  children: [],
}

let gamePlay = {
  init: function(players) {
    this.fieldAtTurns = [],
    this.scores = {},
    this.decisionTrees = []
    for(let player of players) {
      this.scores[player] = 0;
    }
  },
  possibleMoves: function(field) {
    let move = 0;
    let moves = []
    while(move < field.length) {
      if(field[move] == '*') {
        moves.push(move);
      }
      move++
    }
    return moves
  },
  evalMove: function(field,move) {
    let newField = field;
    newField[move] = 'p1',
    isWon()
  }
}

const tictactoeG = Object.create(tictactoe);
tictactoeG.init(['p1','p2']);

const gamePlayG = Object.create(gamePlay);
gamePlayG.init(tictactoeG.players.slice());
console.log(gamePlayG.possibleMoves(tictactoeG.field));

