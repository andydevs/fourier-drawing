/**
 * A visual that demos drawing paths using a fourier series.
 * 
 * Author:  Anshul Kharbanda
 * Created: 9 - 10 - 2020
 */
import { Vector, RotationMatrix } from './vector';

export class FourierStateElement {
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

export class FourierState {
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

export class FourierSeries {
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
        console.log(r)
        path.push(r)
        console.groupEnd()

        console.groupCollapsed('Path')
        for (let th = dth; th < 2*Math.PI; th += dth) {
            // Transform vectors
            state = state.update()

            // Get point from vector
            r = state.output()
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