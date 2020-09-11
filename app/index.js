/**
 * A visual that demos drawing paths using a fourier series.
 * 
 * Author:  Anshul Kharbanda
 * Created: 9 - 10 - 2020
 */
import './style/main.scss'

// -------------------------------- CONTEXT --------------------------------

// Get draw context
const fout = document.getElementById('fourout')
const width = fout.width
const height = fout.height
const fctx = fout.getContext('2d')
const scale = 50
const dth = 0.005

// -------------------------------- VECTOR ---------------------------------

class RotationMatrix {
    constructor(n, dth) {
        let arc = n*dth
        let sarc = Math.sin(arc)
        let carc = Math.cos(arc)
        this.xx = carc
        this.xy = -sarc
        this.yx = sarc
        this.yy = carc
    }

    transform(vector) {
        return new Vector(
            this.xx*vector.x + this.xy*vector.y,
            this.yx*vector.x + this.yy*vector.y
        )
    }
}

class Vector {
    static scaleOffset(s, o) {
        return new Vector(s*Math.cos(o), s*Math.sin(o))
    }

    constructor(x, y) {
        this.x = x
        this.y = y
    }

    plus(other) {
        return new Vector(this.x + other.x, this.y + other.y)
    }

    times(scalar) {
        return new Vector(this.x * scalar, this.y * scalar)
    }

    round() {
        return new Vector(
            Math.round(this.x),
            Math.round(this.y)
        )
    }
}
Vector.ZERO = new Vector(0, 0)

// Correction things
const ORIGIN = new Vector(width/2, height/2)
const sCorrect = a => a.times(scale)
const aCorrect = a => a.plus(ORIGIN)
const rCorrect = a => a.round()
const correct = a => rCorrect(aCorrect(sCorrect(a)))

// -------------------------------- FOURIER --------------------------------

function getFourierPath(fourier) {
    console.group('getFourierPath')

    // Create path
    let path = []

    // Create vectors and rotation matrices
    let elements = fourier.map(({ s, o }, n) => ({
        vector: Vector.scaleOffset(s, o),
        rotation: new RotationMatrix(n, dth)
    }))

    const combineElements = elements =>
        elements.map(elem => elem.vector)
            .reduce(
                (vA, vB) => vA.plus(vB),
                Vector.ZERO)

    // Initialize path
    console.group('Initial')
    let r = combineElements(elements)
    r = correct(r)
    console.log(r)
    path.push(r)
    console.groupEnd()

    console.groupCollapsed('Path')
    for (let th = dth; th < 2*Math.PI; th += dth) {
        // Transform vectors
        elements = elements.map(({ vector, rotation }) => ({
            rotation,
            vector: rotation.transform(vector)
        }))

        // Get point from vector
        r = combineElements(elements)
        r = correct(r)
        console.log(r)
        path.push(r)
    }
    console.groupEnd()
    console.groupEnd()
    return path
}

function updateFourierState(fourierState) {
    return fourierState.map(({ scale, offset, rotation, vector }) => ({
        scale, offset, rotation, vector: rotation.transform(vector)
    }))
}

// ------------------------------ DRAWING ------------------------------

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
    fourierState.forEach(({ vector }) => {
        r = sCorrect(vector)
        s = s.plus(r)
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
        s = s.plus(r)
    })
}

// ------------------------------- MAIN -------------------------------

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

// Get fourier path
let path = getFourierPath(fourier)

// Create fourier state
let state = fourier.map(({ s, o }, n) => ({
    scale: s,
    offset: o,
    vector: Vector.scaleOffset(s, o),
    rotation: new RotationMatrix(n, dth)
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