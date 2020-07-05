import './style.css';

//helper function to replace string nth character

function replacenth(str, index, char) {
  return str.replace(/./g, (c, i) => index == i ? char : c)
}

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
  let {id} = event.target;
  let fieldNumber = id[id.length - 1];
  if(t.field[fieldNumber] == "*") {
    let charToReplace = t.playersTurn == 'p1' ? 'x' : 'o';
    event.target.textContent = charToReplace;
    let newField = t.field;
    newField = replacenth(newField, fieldNumber, charToReplace);
    t.field = newField;
    t.playersTurn = t.playersTurn == 'p1' ? 'p2' : 'p1';
  }
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

function isSame() {
  let a = Array.from(arguments[0]);
  return a.every(i => i == a[0]);
}

function nE() {
  let a = Array.from(arguments[0]);
  return !a.some(item => item == '*')
}

function notEqual() {
  let a = Array.from(arguments);
  return isSame(a) && nE(a)
}


function isWon(field) {
  let f = field;
  if(notEqual(f[0],f[1],f[2])  || notEqual(f[3],f[4],f[5]) || notEqual(f[6],f[7],f[8])) {
    return true
  }
  if(notEqual(f[0], f[3], f[6]) || notEqual(f[1], f[4], f[7]) || notEqual(f[2], f[5] ,f[8])) {
    return true
  }
  if(notEqual(f[0], f[4], f[8]) || notEqual(f[2], f[4], f[6])) {
    return true
  }
  return false
}

function evalMove(field) {
  if(isWon(field)) {
    return 1
  }
  return 0
};

let node = {
  init: function(info, children) {
    this.info = info;
    this.children = children || [];
  },
}

let decisionTree = Object.create(node);

decisionTree.init = function(field, player, isHead, score, parent) {
  this.field = field;
  this.score = score;
  this.player = player
  this.isHead = isHead;
  this.children = [];
  this.parent = parent
}

decisionTree.setChildren = function() {
  let count = 0;
  while(count < this.field.length) {
    if(this.field[count] == "*") {
      let newField = this.field;
      newField = replacenth(newField, count, this.player == "p1" ? 'x' : 'o');
      let newDecisionNode = Object.create(decisionTree);
      let p = this.player == "p1" ? 'p2' : 'p1'
      newDecisionNode.init(newField, p, false, undefined, this)
      this.children.push(newDecisionNode)
    }
    count++
  }
}

//gameplay is object where computer will make decision about game
//also it will evaluate game according field and players by building decision tree

let gamePlay = {
  init: function(field,playersTurn) {
    this.playersTurn = playersTurn;
    this.field = field
    this.decisionTree = Object.create(decisionTree);
    decisionTree.init(field,playersTurn,true,undefined,null);
    this.decisionTree.score = evalMove(this.field);
  },
  buildRootTree: function() {
    this.decisionTree.setChildren()
    for(let i = 0; i < this.decisionTree.children.length; i++) {

    }
  },
  buildDepth: function() {
    let depth = [];
    depth[0] = this.decisionTree.children.map(child => child)
    while(depth.length < 6) {
      depth[depth.length] = [];
      for(let i = 0; i < depth[depth.length - 2].length; i++) {
        if(depth[depth.length - 2][i].score != 1 )
          depth[depth.length - 2][i].setChildren()
        let children = depth[depth.length - 2][i].children
        children.forEach(child => child.score = evalMove(child.field));
        depth[depth.length - 1] = depth[depth.length - 1].concat(children)
      }
      let w = depth[depth.length - 1].filter(child => child.score == 1);
      w.forEach(i => console.log(i))
    }
  }
}

let t = Object.create(tictactoe);
t.init()

let g = Object.create(gamePlay);
g.init(t.field,t.playersTurn,true,undefined);
g.buildRootTree();
g.buildDepth();


render(t.field)