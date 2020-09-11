/**
 * A visual that demos drawing paths using a fourier series.
 * 
 * Author:  Anshul Kharbanda
 * Created: 9 - 10 - 2020
 */
import { FourierState } from './state';

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
        console.group('FourierSeries.getPath')
        
        // Create vectors and rotation matrices
        console.group('Initial State')
        let state = FourierState.initial(this.components)
        console.log(state)
        console.groupEnd()
        
        // Path
        console.groupCollapsed('Path')
        let r, path = []
        for (let th = 0; th < 2*Math.PI; th += dth) {
            // Get point from vector
            r = state.output()
            console.log(r)
            path.push(r)
            
            // Transform vectors
            state = state.update()
        }
        console.groupEnd()

        // Return path
        console.groupEnd()
        return path
    }

    getInitialState(dth=0.005) {
        return FourierState.initial(this.components, dth)
    }
}