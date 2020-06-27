import './style.css';
import 'typed.js';
import Typed from 'typed.js';

const div = document.createElement('div');
div.classList.add('red');

div.textContent = 'Hello kitty';

document.body.appendChild(div);

//this part of script is about using typed js

const typedOpt = {
    loop: true,
    loopCount: Infinity
}

const typedStrings = [
    'Gevorg',
    "Georgiy",
    'Jorgen',
    'Gaggo'
]

typedOpt.strings = typedStrings;

const typedElm = document.getElementById('names');

let typed = new Typed(typedElm, typedOpt);


