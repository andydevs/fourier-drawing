/**
 * Use this template for building basic static websites
 * 
 * Author:  [Your Name Here]
 * Created: [Date of Creation]
 */
import './style/main.scss'

// Elements
var button = document.getElementById('destupid')
var elon = document.getElementById('elon')
var title = document.getElementById('title')

// Add listener
button.addEventListener('click', function(event) {
    elon.style = 'display: block;'
    title.innerHTML = 'It\'s Elon!'
    button.disabled = true
})