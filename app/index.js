/**
 * A visual that demos drawing paths using a fourier series.
 * 
 * Author:  Anshul Kharbanda
 * Created: 9 - 10 - 2020
 */
import './style/main.scss'
import { FourierSeries } from './fourier/series';
import { FourierOutputContext } from './fourier-output';

// Draw Context
let fctx = new FourierOutputContext('fourout')

// Fourier initial
let fourier = FourierSeries.random(6, 1.0)
let path = fourier.getPath()
let state = fourier.getInitialState()

// Draw frame on every animation frame
function drawFrame() {
    fctx.clear()
    fctx.drawPath(path)
    fctx.drawLines(state)
    fctx.drawCircles(state)
    state = state.update()
    requestAnimationFrame(drawFrame)
}
requestAnimationFrame(drawFrame)