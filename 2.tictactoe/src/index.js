import './style.css';

//helper function to replace string nth character

function replacenth(str, index, char) {
  return str.replace(/./g, (c, i) => index == i ? char : c)
}

//rendering gamefield into window

function render(field) {
  let fieldDiv = document.getElementById('game__field');
  fieldDiv.innerHTML = '';
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
    let g = Object.create(gamePlay);
    g.init(t.field,t.playersTurn,true,undefined);
    let i = g.makeDecision(10);
    if(t.playersTurn == 'p2') {
      t.field = replacenth(t.field, i, 'o')
      render(t.field)
    } else {
      t.field = replacenth(t.field, i, 'x')      
      render(t.field)      
    }
    t.playersTurn = t.playersTurn == 'p1' ? 'p2' : 'p1';

  };


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

decisionTree.init = function(field, player, score, parent) {
  this.field = field;
  this.score = score;
  this.player = player
  this.moves = [];
  this.parent = parent;
}

decisionTree.setMoves = function() {
  let count = 0;
  while(count < this.field.length) {
    if(this.field[count] == "*") {
      let newField = this.field;
      newField = replacenth(newField, count, this.player == "p1" ? 'x' : 'o');
      let newDecisionNode = Object.create(decisionTree);
      let p = this.player == "p1" ? 'p2' : 'p1';
      newDecisionNode.init(newField, p, undefined, this,)
      this.moves.push(newDecisionNode)
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
    this.decisionTree.init(field,playersTurn,true,undefined,null);
    this.depth = [];
  },

  mining: function(index) {
    let arr = this.depth[index];
    for(let i = 0; i < arr.length; i++) {
      let moves = arr[i].moves;
      let min = moves.reduce((minScore, item) => item.score < minScore ? item.score : minScore, 1);
      arr[i].score = min
    }
  },

  maxing: function(index) {
    let arr = this.depth[index];
    for(let i = 0; i < arr.length; i++) {
      let moves = arr[i].moves;
      let max = moves.reduce((maxScore, item) => item.score > maxScore ? item.score : maxScore, -1);
      arr[i].score = max
    }
  },

  makeDecision: function(m) {
    this.buildDepth(m);
    if(this.depth.length == 1) {
      return this.depth[0][0].field.indexOf('*');
    }
    for(let i = this.depth.length - 2; i >= 0; i--) {
      if(this.depth[i][0].player == 'p2') {
        console.log('maxing')
        this.mining(i)
      } else {
        console.log('mining')        
        this.maxing(i)
      }
    }


    let index = null;
    let modified = '';

    if(this.playersTurn == 'p1') {
      let max = this.depth[0][0].moves.reduce((maxScore, item) => item.score > maxScore ? item.score : maxScore, -1);
      let choices = this.depth[0][0].moves.filter(item => item.score == max);
      index = Math.floor(Math.random() * choices.length);
      modified = choices[index].field
    }

    if(this.playersTurn == 'p2') {
      let min = this.depth[0][0].moves.reduce((minScore, item) => item.score < minScore ? item.score : minScore, 1);
      let choices = this.depth[0][0].moves.filter(item => item.score == min);
      index = Math.floor(Math.random() * choices.length);
      modified = choices[index].field      
    }
    let origin = this.depth[0][0].field;
    for(let i = 0; i < origin.length; i++) {
      if(modified[i] != origin[i]) {
        console.log(i);
        return i
      }
    }
  },

  buildDepth: function(d) {
    console.time('a')
    //building depth array which
    //each index of array correspondens of all possible solutions for 
    //that depth


    //initializing array
    //creating first depth which represents current field
    this.depth[0] = [this.decisionTree];
    this.depth[0][0].score = evalMove(this.depth[0][0].field)
    // console.log('d',this.depth[0],this.depth[0].length);
    let iter = 0;
    do {
      let tmpDepth = []
      for(let i = 0; i < this.depth[this.depth.length - 1].length; i++) {
        let currentItem = this.depth[this.depth.length - 1][i];
        if(currentItem.score == 0) {
          currentItem.setMoves();
          for(let move of currentItem.moves) {
            let score = evalMove(move.field);
            move.score = (move.player == 'p1' ? -1 : 1) * score
            move.score = move.score == -0 ? 0 : move.score
          }
          tmpDepth = tmpDepth.concat(currentItem.moves)
        }
      }
      if(tmpDepth != 0)
        this.depth.push(tmpDepth);
      iter++
      // console.log(this.depth[this.depth.length - 1])
    } while(this.depth.length < d && this.depth[this.depth.length - 1].length != 0 && iter < 2*d) //depth array length should be no bigger then what is declared
    console.log('ddd',this.depth)
    console.timeEnd('a');
  },

  rebuildDepthTree: function(modifiedLevelIndex) {
    let l = modifiedLevelIndex;
    if(l == this.depth.length - 1) {      
      return false
    }
    while(l < this.depth.length - 1) {
      let tmp = [];
      for(let i = 0; i < this.depth[l].length && this.depth[l - 1].length > 0; i++) {
        this.depth[l][i].setMoves();
        tmp = this.depth[l][i].moves.slice();
        tmp.forEach(item => {
          item.score = evalMove(item.field)
        })

      }
      l++
      this.depth[l] = tmp.slice();
    }
    console.log('rb',this.depth[modifiedLevelIndex]);
  }
}

//starting game

let t = Object.create(tictactoe);
t.init();


render(t.field);