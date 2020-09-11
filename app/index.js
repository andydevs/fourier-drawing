/**
 * A visual that demos drawing paths using a fourier series.
 * 
 * Author:  Anshul Kharbanda
 * Created: 9 - 10 - 2020
 */
import './style/main.scss'
import { Vector } from './vector/vector';
import { FourierSeries } from './fourier/series';

// Get draw context
const fout = document.getElementById('fourout')
const fctx = fout.getContext('2d')
const width = fout.width
const height = fout.height
const scale = 50

// Correction things
const ORIGIN = new Vector(width/2, height/2)
const sCorrect = a => a.times(scale)
const aCorrect = a => a.plus(ORIGIN)
const rCorrect = a => a.round()
const correct = a => rCorrect(aCorrect(sCorrect(a)))

function drawPath(path) {
    fctx.lineWidth = '3'
    fctx.strokeStyle = '#045'
    fctx.beginPath()
    let r = correct(path[0])
    fctx.moveTo(r.x, r.y)
    for (let i = 1; i < path.length; i++) {
        r = correct(path[i])
        fctx.lineTo(r.x, r.y)
    }
    fctx.stroke()
}

function drawLines(fourierState) {
    // Initialize context and path
    let s = ORIGIN
    fctx.lineWidth = '1'
    fctx.strokeStyle = '#fa0'
    fctx.beginPath()
    fctx.moveTo(s.x, s.y)

    // Draw lines along path
    fourierState.elements.forEach(({ vector }) => {
        s = s.plus(sCorrect(vector))
        fctx.lineTo(s.x, s.y)
    })

    // Stroke
    fctx.stroke()
}

function drawCircles(fourierState) {
    // Initialize context and path
    let s = ORIGIN
    fctx.lineWidth = '0.5'
    fctx.strokeStyle = '#555'

    // Draw circles along path
    fourierState.elements.forEach(element => {
        fctx.beginPath()
        fctx.arc(s.x, s.y, element.scale*scale, 0, 2*Math.PI)
        fctx.stroke()
        s = s.plus(sCorrect(element.vector))
    })
}

// ------------------------------- MAIN -------------------------------

// Fourier initial
let fourier = FourierSeries.random(6, 1.0)
let path = fourier.getPath()
let state = fourier.getInitialState()

// Draw frame on every animation frame
function drawFrame() {
    fctx.clearRect(0, 0, width, height)
    drawPath(path)
    drawLines(state)
    drawCircles(state)
    state = state.update()
    requestAnimationFrame(drawFrame)
}
requestAnimationFrame(drawFrame)