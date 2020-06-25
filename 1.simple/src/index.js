import './style.css';

const div = document.createElement('div');
div.classList.add('red');

div.textContent = 'Hello kitty';

document.body.appendChild(div);

console.log('hello kitty');