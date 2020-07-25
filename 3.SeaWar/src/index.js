class SeaWars {
    constructor(player1, player2) {
        this.p1 = new Player('p1', player1);
        this.p2 = new Player('p2', player2);
        this.playersTurn = this.p1;
    }
    swapPlayer() {
        this.playersTurn = this.playersTurn == this.p1 ? this.p2 : this.p1;
    }
}

class Player {
    constructor(player, name="player") {
        let d = new DomMan();
        this.player = player;
        this.name = name;
        this.board = d.createElm('div');
        this.board.id = player;
        d.appendToParent(this.board, document.body);
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
console.log(game);