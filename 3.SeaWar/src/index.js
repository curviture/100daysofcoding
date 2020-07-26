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
    renderBoard(player) {
        let d = new DomMan();
        let boardCont = d.createElm('div');
        boardCont.id = player.player;
        d.appendToParent(boardCont, document.querySelector('.game-container'));
        boardCont.classList.add('board-container');
        for(let row of player.board) {
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
        this.grid = new Array(10).fill(new Array(10).fill(''));
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
game.render()
