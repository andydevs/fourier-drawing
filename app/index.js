/**
 * A visual that demos drawing paths using a fourier series.
 * 
 * Author:  Anshul Kharbanda
 * Created: 9 - 10 - 2020
 */
import './style/main.scss'

// Get draw context
let fout = document.getElementById('fourout')
let fctx = fout.getContext('2d')

// Draw a square
fctx.fillStyle = '#ff0000'
fctx.fillRect(130, 60, 40, 30)