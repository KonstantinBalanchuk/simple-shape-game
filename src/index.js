import app from './js/app.js';
import './styles/index.css';


if (document.querySelector('#app').getElementsByTagName('canvas').item(0)) {
  document.querySelector('#app').removeChild(document.querySelector('#app').getElementsByTagName('canvas').item(0));
}
document.querySelector('#app').appendChild(app.view);
