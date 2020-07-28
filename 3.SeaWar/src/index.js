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
    generateShips() {
        this.p1.board.populate();
        this.p2.board.populate();
    }
    renderBoard(player) {
        let d = new DomMan();
        let boardCont = d.createElm('div');
        boardCont.id = player.player;
        d.appendToParent(boardCont, document.querySelector('.game-container'));
        boardCont.classList.add('board-container');
        for(let row of player.board.grid) {
            for(let cell of row) {
                let gridCell = d.createElm('div');
                gridCell.classList.add('grid-cell')
                if(cell == "") {
                    gridCell.classList.add('empty')
                } else if(cell == "o") {
                    gridCell.classList.add('ship')
                } else {
                    gridCell.classList.add('debris')
                }
                d.appendToParent(gridCell, boardCont);
            }
        }
    }
    render() {
        let d = new DomMan();
        let gC = d.createElm('div');
        gC.classList.add('game-container');
        d.appendToParent(gC, document.body);
        this.renderBoard(this.p1)
        this.renderBoard(this.p2)        
    }
}

class Player {
    constructor(player, name="player") {
        let d = new DomMan();
        this.player = player;
        this.name = name;

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
    populate() {
        for(let i = 0; i < 4; i++) {
            let underRule = false;
            while(!underRule) {
                let rX = Math.floor(Math.random() * this.width);
                let rY = Math.floor(Math.random() * this.height);
                underRule = this.checkForSpace(rY,rX);
                console.log('1',this.checkForSpace(rY,rX),rY,rX,underRule)
                this.grid[rY][rX] = underRule ? 'o' : this.grid[rY][rX];
                console.log(this.grid[rY][rX]);
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
            while(!underRule) {
                let rX = Math.floor(Math.random() * this.width);
                let rY = Math.floor(Math.random() * this.height);
                if(rY < 8) {
                    underRule = this.checkForSpace(rY,rX) && this.checkForSpace(rY + 1,rX) && this.checkForSpace(rY + 2,rX);
                    this.grid[rY][rX] = underRule ? 'o' : this.grid[rY][rX];
                    this.grid[rY + 1][rX] = underRule ? 'o' : this.grid[rY + 1][rX];
                    this.grid[rY + 2][rX] = underRule ? 'o' : this.grid[rY + 2][rX];                    
                }
            }
        }
        for(let i = 0; i < 1; i++) {
            let underRule = false;
            while(!underRule) {
                let rX = Math.floor(Math.random() * this.width);
                let rY = Math.floor(Math.random() * this.height);
                if(rY < 7) {
                    underRule = this.checkForSpace(rY,rX) && this.checkForSpace(rY + 1,rX) && this.checkForSpace(rY + 2,rX) && this.checkForSpace(rY + 3,rX);
                    this.grid[rY][rX] = underRule ? 'o' : this.grid[rY][rX];
                    this.grid[rY + 1][rX] = underRule ? 'o' : this.grid[rY + 1][rX];
                    this.grid[rY + 2][rX] = underRule ? 'o' : this.grid[rY + 2][rX];
                    this.grid[rY + 3][rX] = underRule ? 'o' : this.grid[rY + 3][rX];
                }
            }
        }            
        console.log(this.grid);
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
}

let game = new SeaWars('kitty', 'doggo');
game.createBoard();
game.generateShips();
game.render()
