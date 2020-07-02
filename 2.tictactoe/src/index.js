let tictactoe = {
    field : '',
    players: ['p1','p2'],
    playersTurn: 'p1',
    init : function() {
      this.field = new Array(9).fill("*").join('');
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
  init: function(info, children) {
    this.info = info;
    this.children = children || [];
  },
}

let decisionTree = Object.create(node);

decisionTree.init = function(field, player, isHead, score) {
  this.field = field;
  this.score = score;
  this.player = player
  this.isHead = this.isHead || isHead
}

decisionTree.setChildren = function() {
  let count = 0;
  while(count < this.field.length) {
    if(this.field[count] == "*") {
      let newField = field;
      newField[count] = this.player == "p1" ? 'p2' : 'p1';
      let newDecisionNode = Object.create(decisionTree);
      newDecisionNode.init(newField, newField[count], false, undefined)
      this.children.push(newDecisionNode)
    }
  }
}

let gamePlay = {
  init: function(players) {
    this.fieldAtTurns = [],
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
  evalMove: function(field,move,playerToMove) {
    let newField = field;
    newField[move] = playerToMove; 
    if(isWon(field)) {
      return 1
    }
    return 0
  },
  buildDecisionNode: function(parentNode) {
    let moves = parentNode.children.map(item => item.move);
    let currentPlayer = parentNode.info.player
    for(let i = 0; i < moves.length; i++) {
      let decision = Object.create(node);
      let newField = field;
      newField[moves[i]] = currentPlayer;
      decision.info = {field: newField,player: currentPlayer,move: move};
      let children = this.possibleMoves(newField);
      for(let child of children) {
        let newNode = Object.create(node);
        node.info.currentPlayer = currentPlayer == 'p1'? 'p2' : 'p1';
      }
    }
  }
}