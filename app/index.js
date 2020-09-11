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

// Correction things
const ORIGIN = { x: width/2, y: height/2 }
const sCorrect = a => ({ x: scale*a.x, y: scale*a.y })
const aCorrect = a => ({ x: a.x + ORIGIN.x, y: a.y + ORIGIN.y })
const correct = a => aCorrect(sCorrect(a))

/**
 * Performs scaling of vectors
 * 
 * @param {float} s scale factor
 * @param {{x: float, y: float}} a vector
 */
const vscale = (s, a) => ({
    x: s * a.x,
    y: s * a.y
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

// Build a random fourier series of n elements
console.group('Fourier Series')
const n = 6
const fscale = 1.0
const fourier = [{ s: 0, o: 0 }]
for (let i = 0; i < n; i++) {
    fourier.push({
        s: fscale * Math.random() * n / (i + 1), // Scale
        o: Math.random()*Math.PI*2 // Offset    
    })
}
console.log(fourier)
console.groupEnd()

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
    fctx.lineWidth = '3'
    fctx.strokeStyle = '#045'
    fctx.beginPath()
    fctx.moveTo(path[0].x, path[0].y)
    for (let i = 1; i < path.length; i++) {
        fctx.lineTo(path[i].x, path[i].y)
    }
    fctx.stroke()
}

function drawLines(fourierState) {
    // Initialize context and path
    let s = ORIGIN
    fctx.lineWidth = '3'
    fctx.strokeStyle = '#0af'
    fctx.beginPath()
    fctx.moveTo(s.x, s.y)

    // Draw lines along path
    let r
    fourierState.forEach(({ vector, rotation }) => {
        r = sCorrect(vector)
        s = vsum(s, r)
        fctx.lineTo(s.x, s.y)
    })

    // Stroke
    fctx.stroke()
}

function drawCircles(fourierState) {
    // Initialize context and path
    let s = ORIGIN
    fctx.lineWidth = '1'
    fctx.strokeStyle = '#555'

    // Draw circles along path
    let r
    fourierState.forEach(element => {
        r = sCorrect(element.vector)
        fctx.beginPath()
        fctx.arc(s.x, s.y, element.scale*scale, 0, 2*Math.PI)
        fctx.stroke()
        s = vsum(s, r)
    })
}

function updateFourierState(fourierState) {
    return fourierState.map(({ scale, offset, rotation, vector }) => ({
        scale, offset, rotation,
        vector: {
            x: rotation.xx*vector.x + rotation.xy*vector.y,
            y: rotation.yx*vector.x + rotation.yy*vector.y
        }
    }))
}

// Get fourier path
let path = getFourierPath(fourier)

// Create fourier state
let state = fourier.map(({ s, o }, n) => ({
    scale: s,
    offset: o,
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

// Draw frame on every animation frame
function drawFrame() {
    fctx.clearRect(0, 0, width, height)
    drawPath(path)
    drawLines(state)
    drawCircles(state)
    state = updateFourierState(state)
    requestAnimationFrame(drawFrame)
}
requestAnimationFrame(drawFrame)