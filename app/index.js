/**
 * A visual that demos drawing paths using a fourier series.
 * 
 * Author:  Anshul Kharbanda
 * Created: 9 - 10 - 2020
 */
import './style/main.scss'

// Get draw context
const fout = document.getElementById('fourout')
const width = fout.width
const height = fout.height
const fctx = fout.getContext('2d')
const scale = 50
const dth = 0.005

// Build a random fourier series of n elements
const n = 5
const fscale = 1.1
const fourier = [{s:0,o:0}]
for (let i = 0; i < n; i++) {
    fourier.push({
        s: fscale*Math.random()*(n / (i + 1)), // Scale
        o: Math.random()*Math.PI*2 // Offset    
    })
}
console.group('Fourier Series')
console.log(fourier)
console.groupEnd()

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
 * Performs vector addition on two vectors
 * 
 * @param {{x: float, y: float}} a first vector
 * @param {{x: float, y: float}} b second vector
 */
const vsum = (a, b) => ({
    x: a.x + b.x,
    y: a.y + b.y
})

/**
 * Rounds vector
 * 
 * @param {{x: float, y: float}} a vector to round
 */
const vround = a => ({
    x: Math.round(a.x),
    y: Math.round(a.y)
})

function getFourierPath(fourier) {
    console.group('getFourierPath')

    // Create path
    let path = []

    // Create vectors and rotation matrices
    let elements = fourier.map(({ s, o }, n) => ({
        vector: {
            x: s*Math.cos(o),
            y: s*Math.sin(o)
        },
        rotation: {
            xx: Math.cos(n*dth),
            xy: -Math.sin(n*dth),
            yx: Math.sin(n*dth),
            yy: Math.cos(n*dth)    
        }
    }))

    // Initialize path
    console.group('Initial')
    let r = elements.map(elem => elem.vector).reduce(vsum)
    r = correct(r)
    r = vround(r)
    console.log(r)
    path.push(r)
    console.groupEnd()

    console.groupCollapsed('Path')
    for (let th = dth; th < 2*Math.PI; th += dth) {
        // Transform vectors
        elements = elements.map(({ vector, rotation }) => ({
            rotation,
            vector: {
                x: rotation.xx*vector.x + rotation.xy*vector.y,
                y: rotation.yx*vector.x + rotation.yy*vector.y
            }
        }))

        // Get point from vector
        r = elements.map(elem => elem.vector).reduce(vsum)
        r = correct(r)
        r = vround(r)
        console.log(r)
        path.push(r)
    }
    console.groupEnd()
    console.groupEnd()
    return path
}

function drawPath(path) {
    fctx.lineWidth = '1'
    fctx.strokeStyle = '#00aaff'
    fctx.beginPath()
    fctx.moveTo(path[0].x, path[0].y)
    for (let i = 1; i < path.length; i++) {
        fctx.lineTo(path[i].x, path[i].y)
    }
    fctx.stroke()
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

function drawCircles(fourier, th=0) {
    console.group('drawCircles')

    // Initialize context and path
    let s = ORIGIN
    fctx.lineWidth = '1'
    fctx.strokeStyle = '#999999'
    console.group('Initial Point')
    console.log(s)
    console.groupEnd()

    // Draw circles
    console.groupCollapsed('Circles')
    let r
    for (let i = 0; i < fourier.length; i++) {
        r = osrv(fourier[i], i)(th)
        r = sCorrect(r)
        fctx.beginPath()
        fctx.arc(s.x, s.y, fourier[i].s*scale, 0, 2*Math.PI)
        fctx.stroke()
        s = {
            x: s.x + r.x,
            y: s.y + r.y
        }
        console.log(s)
    }
    console.groupEnd()
    console.groupEnd()
}

let path = getFourierPath(fourier)
let th = 0.0
function drawFrame() {
    fctx.clearRect(0, 0, width, height)
    drawPath(path)
    drawLines(fourier, th)
    drawCircles(fourier, th)
    th += dth
    if (th > 2*Math.PI) {
        th -= 2*Math.PI
    }
    requestAnimationFrame(drawFrame)
}
requestAnimationFrame(drawFrame)