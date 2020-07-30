import './style.css';

class SeaWars {
    constructor(player1, player2) {
        this.p1 = new Player('p1', player1);
        this.p2 = new Player('p2', player2);
        this.createBoard();
        this.playersTurn = this.p1;
    }
    nextPlayer() {
        this.playersTurn = this.playersTurn == this.p1 ? this.p2 : this.p1;
    }
    createBoard(size = {height: 10, width: 10}) {
        let {height, width} = size;
        this.p1.board = new Board({height, width})
        this.p2.board = new Board({height, width})
    }
    generateShips(player) {
        player.board.populate();
    }
    render() {
        const d = new DomMan();
        const gameCont = document.querySelector('.game-container');
        gameCont.addEventListener('click', () => {
            console.log('container has been clicked');
            this.render()
        }) 
        d.clearNode(gameCont);;
        gameCont.classList.add('game-container');

        const p1Cont = this.p1.render();
        const boardP1 = this.p1.board.render();
        d.appendToParent(boardP1, p1Cont);
        d.appendToParent(p1Cont, gameCont);

        const btn = d.createElm('button');
        btn.addEventListener('click', () => {
            this.generateShips(this.p1);
            this.render();
        });
        btn.textContent = 'Populate';
        btn.id = 'populate';
        d.appendToParent(btn, p1Cont);

        const p2Cont = this.p2.render();
        const boardP2 = this.p2.board.render();
        d.appendToParent(boardP2, p2Cont);        
        d.appendToParent(p2Cont, gameCont);

        d.appendToParent(gameCont, document.body);

    }
}

class Player {
    constructor(player, name="player") {
        let d = new DomMan();
        this.player = player;
        this.name = name;

    }
    render() {
        const d = new DomMan();
        let cont = d.createElm('div');
        cont.classList.add('player-container');
        cont.id = this.player;
        return cont
    }
}

class Board {
    constructor(props) {
        this.height = props.height;
        this.width = props.width;
        this.grid = [];
        for(let i = 0; i < this.height; i++) {
            this.grid[i] = [];
            for(let j = 0; j < this.width; j++) {
                this.grid[i].push('');
            }
        }
    }
    hitDetection(event) {
        console.log(event.offsetX);
    }
    checkForSpace(y,x) {
        let underRule = true
        underRule = this.grid[y][x] == '' ? true : false;
        underRule = underRule && (x == 0 || this.grid[y][x - 1] == '');
        underRule = underRule && (x == 9 || this.grid[y][x + 1] == '');
        underRule = underRule && (y == 0 || this.grid[y - 1][x] == '');
        underRule = underRule && (y == 9 || this.grid[y + 1][x] == '');
        underRule = underRule && ((y == 0 || x == 0) || this.grid[y - 1][x - 1] == '');
        underRule = underRule && ((y == 9 || x == 9) || this.grid[y + 1][x + 1] == '');
        underRule = underRule && ((y == 0 || x == 9) || this.grid[y - 1][x + 1] == '');
        underRule = underRule && ((y == 9 || x == 0) || this.grid[y + 1][x - 1] == '');        
        return underRule
    }
    resetgrid() {
        this.grid = [];
        for(let i = 0; i < this.height; i++) {
            this.grid[i] = [];
            for(let j = 0; j < this.width; j++) {
                this.grid[i].push('');
            }
        }        
    }
    populate() {
        this.resetgrid();
        for(let i = 0; i < 4; i++) {
            let underRule = false;
            while(!underRule) {
                let rX = Math.floor(Math.random() * this.width);
                let rY = Math.floor(Math.random() * this.height);
                underRule = this.checkForSpace(rY,rX);
                this.grid[rY][rX] = underRule ? 'o' : this.grid[rY][rX];
            }
        }
        for(let i = 0; i < 3; i++) {
            let underRule = false;
            while(!underRule) {
                let rX = Math.floor(Math.random() * this.width);
                let rY = Math.floor(Math.random() * this.height);
                if(rY < 9) {
                    underRule = this.checkForSpace(rY,rX) && this.checkForSpace(rY + 1,rX)
                    this.grid[rY][rX] = underRule ? 'o' : this.grid[rY][rX];
                    this.grid[rY + 1][rX] = underRule ? 'o' : this.grid[rY + 1][rX];
                }
            }
        }
        for(let i = 0; i < 2; i++) {
            let underRule = false;
            let iter = 0;
            while(!underRule && iter < 100) {
                let rX = Math.floor(Math.random() * this.width);
                let rY = Math.floor(Math.random() * this.height);
                if(rY < 8) {
                    underRule = this.checkForSpace(rY,rX) && this.checkForSpace(rY + 1,rX) && this.checkForSpace(rY + 2,rX);
                    this.grid[rY][rX] = underRule ? 'o' : this.grid[rY][rX];
                    this.grid[rY + 1][rX] = underRule ? 'o' : this.grid[rY + 1][rX];
                    this.grid[rY + 2][rX] = underRule ? 'o' : this.grid[rY + 2][rX];                    
                }
                iter++
            }
            if(iter >= 100) i = 0;
        }
        for(let i = 0; i < 1; i++) {
            let underRule = false;
            let iter = 0;            
            while(!underRule && iter < 100) {
                let rX = Math.floor(Math.random() * this.width);
                let rY = Math.floor(Math.random() * this.height);
                if(rY < 7) {
                    underRule = this.checkForSpace(rY,rX) && this.checkForSpace(rY + 1,rX) && this.checkForSpace(rY + 2,rX) && this.checkForSpace(rY + 3,rX);
                    this.grid[rY][rX] = underRule ? 'o' : this.grid[rY][rX];
                    this.grid[rY + 1][rX] = underRule ? 'o' : this.grid[rY + 1][rX];
                    this.grid[rY + 2][rX] = underRule ? 'o' : this.grid[rY + 2][rX];
                    this.grid[rY + 3][rX] = underRule ? 'o' : this.grid[rY + 3][rX];
                }
                iter++
            }
            if(iter >= 100) i = 0;
        }            
    }
    render() {
        let d = new DomMan();
        let gridCont = d.createElm('div');
        // gridCont.addEventListener('mouseover', (event) => {
        //     event.preventDelegation()
        //     this.hitDetection(event)
        // })
        gridCont.classList.add('grid-container')
        for(let row of this.grid) {
            for(let cell of row) {
                let gridCell = d.createElm('div');
                gridCell.classList.add('grid-cell');
                let className = ""
                switch(cell) {
                    case "":  className = 'empty'
                        break;
                    case "o": className = 'ship'
                        break;
                    case "x": className = 'debris'
                        break;
                    case ".": className = 'missed'
                    default: "";
                }
                gridCell.classList.add(className);
                gridCell.addEventListener('click', (event) => {
                    let target = event.target;
                    if(target.parentNode.parentNode.id != 'p2') {
                        return false
                    }
                    let siblings = target.parentNode.childNodes;
                    let targetNumber;
                    siblings.forEach((item,index) => {
                        if(item == target) targetNumber = index
                    })
                    if(gameGlobal.player == 'p1') {
                        if(this.grid[Math.floor(targetNumber / 10)][targetNumber % 10] == 'o') {
                            this.grid[Math.floor(targetNumber / 10)][targetNumber % 10] = 'x';
                            gameGlobal.moveMade()
                        } else if(this.grid[Math.floor(targetNumber / 10)][targetNumber % 10] == '') {
                            this.grid[Math.floor(targetNumber / 10)][targetNumber % 10] = '.'
                            gameGlobal.moveMade()                        
                        }
                    }
                })
                d.appendToParent(gridCell, gridCont);
            }
        }
        return gridCont;
    }
}

class DomMan {
    constructor() {

    }

    createElm(el){
        let elm = document.createElement(el);
        return elm
    }
    appendToParent(child, parent) {
        parent.appendChild(child)
    }
    clearNode(elm) {
        while (elm.firstChild) {
            elm.removeChild(elm.firstChild);
        }        
    }
}

class GameGlobal {
    constructor(game) {
        this.game = game;
        this.player = game.playersTurn.player
    }
    moveMade() {
        game.nextPlayer(this.game);
        this.player = game.playersTurn.player;
        if(this.player == 'p2') {
            setTimeout(() => {
                let succesfullMove = false;
                while(!succesfullMove) {
                    let x = Math.floor(Math.random() * 10);
                    let y = Math.floor(Math.random() * 10);
                    if(this.game.p1.board.grid[y][x] == 'o') {
                        this.game.p1.board.grid[y][x] = 'x';
                        this.moveMade();
                        this.game.render();
                        succesfullMove = true;                        
                    } else if(this.game.p1.board.grid[y][x] == '') {
                        this.game.p1.board.grid[y][x] = '.';
                        this.moveMade();
                        this.game.render();
                        succesfullMove = true;
                    }
                }
            },1000)
        }
    }
}


let game = new SeaWars('kitty', 'doggo');
const gameGlobal = new GameGlobal(game);

const d = new DomMan();
const startButton = d.createElm('button');
startButton.id = 'start-button';
startButton.textContent = 'Start Game';
startButton.addEventListener('click', () => {
    game.generateShips(game.p2);
    game.render()
    
})
d.appendToParent(startButton, document.body);