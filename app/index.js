/**
 * A visual that demos drawing paths using a fourier series.
 * 
 * Author:  Anshul Kharbanda
 * Created: 9 - 10 - 2020
 */
import './style/main.scss'
import elon from './assets/images/elon.jpg'

// Get app
let app = document.getElementById('app')
app.innerHTML = '<h1 id="title">Eyyyyy</h1>'
    + `<img id="elon" src="${elon}">`
    + '<button id="destupid">Make it less Stupid</button>'

// Destupid button
document.getElementById('destupid').addEventListener('click', function() {
    document.getElementById('title').innerText = 'It\'s Elon!'
    document.getElementById('elon').style.display = 'block'
    document.getElementById('destupid').style.display = 'none'
})