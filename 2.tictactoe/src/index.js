import './style.css';

//rendering gamefield into window

function render(field) {
  let fieldDiv = document.getElementById('game__field');
  for(let i = 0; i < field.length; i++) {
    let square = document.createElement('div');
    square.classList.add('game__square');
    square.textContent = field[i];
    square.id = `square-${i}`;
    square.addEventListener('click', clickHandler)
    fieldDiv.appendChild(square);
  }
}

function clickHandler(event) {
  console.log(event.target.id)
}


//object for overall game
//stores information about players, gamestate
//gamestate is currentplayer, fieldstatus

let tictactoe = {
    field : '',
    players: ['p1','p2'],
    playersTurn: 'p1',
    init : function() {
      this.field = new Array(9).fill("*").join('');
      this.playersTurn = 'p1'
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

//gameplay is object where computer will make decision about game
//also it will evaluate game according field and players by building decision tree

let gamePlay = {
  init: function(field,playersTurn) {
    this.playersTurn = playersTurn;
    this.field = field
    this.decisionTree = Object.create(decisionTree);
    decisionTree.init(field,playersTurn,true,undefined);
  },
  evalMove: function(field,playerToMove) {
    if(isWon(field)) {
      return 1
    }
    return 0
  },
  buildDecisionNode: function(field) {
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

let t = Object.create(tictactoe);
t.init()
console.log(t)

let g = Object.create(gamePlay);
g.init(t.field,t.currentPlayer,true,undefined)
console.log(g)
g.init()
console.log('g',g)

render(t.field)