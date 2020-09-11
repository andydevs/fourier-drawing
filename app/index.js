/**
 * A visual that demos drawing paths using a fourier series.
 * 
 * Author:  Anshul Kharbanda
 * Created: 9 - 10 - 2020
 */
import './style/main.scss'

// Build a random fourier series of n elements
const n = 6
const fscale = 1.1
const fourier = []
for (let i = 0; i < n; i++) {
    fourier.push({
        s: fscale*Math.random()*(n / (i + 1)), // Scale
        o: Math.random()*Math.PI*2 // Offset    
    })
}
console.group('Fourier Series')
console.log(fourier)
console.groupEnd()

// Get draw context
const fout = document.getElementById('fourout')
const width = fout.width
const height = fout.height
const fctx = fout.getContext('2d')
const scale = 50
const dth = 0.005

// Correction things
const ORIGIN = { x: width/2, y: height/2 }
const sCorrect = a => ({ x: scale*a.x, y: scale*a.y })
const aCorrect = a => ({ x: a.x + ORIGIN.x, y: a.y + ORIGIN.y })
const correct = a => aCorrect(sCorrect(a))

/**
 * Offset scaled rotating vector rotating at the 
 * given frequency, scaled by the given factor
 * and offset by given offset value
 * 
 * @param {{ s: float, o: float}} so scale and offset
 * @param {int} n integer frequency of rotation
 */
const osrv = ({ s, o }, n) => th => ({
    x: s*Math.cos(2*Math.PI*n*th + o),
    y: s*Math.sin(2*Math.PI*n*th + o)
})

/**
 * Performs vector addition on rotating vectors,
 * effectively stacking the two circles together
 * 
 * @param {{x: float, y: float}} a first vector
 * @param {{x: float, y: float}} b second vector
 */
const stack = (a, b) => th => ({
    x: a(th).x + b(th).x,
    y: a(th).y + b(th).y
})

/**
 * Approximately draw vector function onto canvas
 * 
 * @param {float -> { x: float, y: float }} func the function to draw
 */
function drawFunction(func) {
    console.group('drawFunction')

    // Initialize context and path
    let r = func(0)
    r = correct(r)
    console.group('Initial')
    console.log(r)
    console.groupEnd()
    fctx.lineWidth = '1'
    fctx.strokeStyle = '#555555'
    fctx.beginPath()
    fctx.moveTo(r.x, r.y)

    // Draw loop
    console.groupCollapsed('Path')
    for (let th = dth; th < 2*Math.PI; th += dth) {
        // Current value
        r = func(th)
        r = correct(r)
        console.log(r)

        // Draw line to current value
        fctx.lineTo(r.x, r.y)
    }
    console.groupEnd()

    // End
    fctx.stroke()
    fctx.save()
    console.groupEnd()
}

function drawLines(fourier, th=0) {
    console.group('drawLines')
    
    // Initialize context and path
    let s = ORIGIN
    fctx.lineWidth = '1'
    fctx.strokeStyle = '#ffffff'
    fctx.beginPath()
    fctx.moveTo(s.x, s.y)
    console.group('Initial Point')
    console.log(s)
    console.groupEnd()

    // Draw lines along path
    console.groupCollapsed('Path')
    let r
    for (let i = 0; i < fourier.length; i++) {
        r = osrv(fourier[i], i)(th)
        r = sCorrect(r)
        s = {
            x: s.x + r.x,
            y: s.y + r.y
        }
        console.log(s)
        fctx.lineTo(s.x, s.y)
    }
    console.groupEnd()

    // Stroke
    fctx.stroke()
    console.groupEnd()
}

let th = 0.0
let func = fourier.map(osrv).reduce(stack)
function drawFrame() {
    fctx.clearRect(0, 0, width, height)
    drawFunction(func)
    drawLines(fourier, th)
    th += dth
    requestAnimationFrame(drawFrame)
}

drawFrame()