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

// -------------------------------- VECTOR ---------------------------------

class RotationMatrix {
    constructor(n, dth=0.05) {
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

class FourierStateElement {
    static initial(scale, offset, frequency, dth=0.005) {
        return new FourierStateElement(
            scale, offset, frequency,
            Vector.scaleOffset(scale, offset),
            new RotationMatrix(frequency, dth)
        )
    }

    constructor(scale, offset, frequency, vector, rotation) {
        this.scale = scale
        this.offset = offset
        this.frequency = frequency
        this.vector = vector
        this.rotation = rotation
    }

    update() {
        return new FourierStateElement(
            this.scale,
            this.offset,
            this.frequency,
            this.rotation.transform(this.vector),
            this.rotation
        )
    }
}

class FourierState {
    static initial(fourier, dth=0.005) {
        return new FourierState(
            fourier.map(({ s, o }, n) => 
                FourierStateElement.initial(s, o, n, dth))
        )
    }

    constructor(elements) {
        this.elements = elements
    }

    update() {
        return new FourierState(
            this.elements.map(elem => elem.update()))
    }

    output() {
        return this.elements
            .map(elem => elem.vector)
            .reduce((vA, vB) => vA.plus(vB), Vector.ZERO)
    }
}

class FourierSeries {
    static random(n, fscale) {
        // Build a random fourier series of n elements
        console.group('Fourier Series')
        const fourier = [{ s: 0, o: 0 }]
        for (let i = 0; i < n; i++) {
            fourier.push({
                s: fscale * Math.random() * n / (i + 1), // Scale
                o: Math.random()*Math.PI*2 // Offset    
            })
        }
        console.log(fourier)
        console.groupEnd()
        return new FourierSeries(fourier)
    }

    constructor(components) {
        this.components = components
    }

    getPath(dth=0.005) {
        console.group('getFourierPath')

        // Create path
        let path = []

        // Create vectors and rotation matrices
        let state = FourierState.initial(this.components)

        // Initialize path
        console.group('Initial')
        let r = state.output()
        r = correct(r)
        console.log(r)
        path.push(r)
        console.groupEnd()

        console.groupCollapsed('Path')
        for (let th = dth; th < 2*Math.PI; th += dth) {
            // Transform vectors
            state = state.update()

            // Get point from vector
            r = state.output()
            r = correct(r)
            console.log(r)
            path.push(r)
        }
        console.groupEnd()
        console.groupEnd()
        return path
    }

    getInitialState(dth=0.005) {
        return FourierState.initial(this.components, dth)
    }
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