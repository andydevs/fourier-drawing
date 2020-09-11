/**
 * A visual that demos drawing paths using a fourier series.
 * 
 * Author:  Anshul Kharbanda
 * Created: 9 - 10 - 2020
 */
import './style/main.scss'

// Build a random fourier series of n elements
const n = 10
const downscale = 0.5
const fourier = [...Array(10)].map((_, i) => ({
    s: downscale*Math.random()*(n / (i + 1)), // Scale
    o: Math.random()*Math.PI*2 // Offset
}))
console.log('Fourier Series:')
console.log(fourier)

// Get draw context
const fout = document.getElementById('fourout')
const width = fout.width
const height = fout.height
const fctx = fout.getContext('2d')
const scale = 50
const dth = 0.005

/**
 * Approximately draw vector function onto canvas
 * 
 * @param {float -> { x: float, y: float }} func the function to draw
 */
function drawFunction(func) {
    // Correction and scaling function
    let corrected = r => ({ x: r.x + width/2, y: r.y + height/2 })
    let scaled = r => ({ x: scale * r.x, y: scale * r.y })

    // Initial
    let r = func(0)
    r = scaled(r)
    r = corrected(r)

    // Initialize context
    fctx.lineWidth = '1'
    fctx.strokeStyle = '#ffffff'
    fctx.beginPath()
    fctx.moveTo(r.x, r.y)

    // Draw loop
    for (let th = dth; th < 2*Math.PI; th += dth) {
        // Current value
        r = func(th)
        r = scaled(r)
        r = corrected(r)

        // Draw line to current value
        fctx.lineTo(r.x, r.y)
    }

    // Draw the line
    fctx.stroke()
}

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

// Draw function
drawFunction(fourier.map(osrv).reduce(stack))