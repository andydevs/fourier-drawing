/**
 * A visual that demos drawing paths using a fourier series.
 * 
 * Author:  Anshul Kharbanda
 * Created: 9 - 10 - 2020
 */
import { FourierState } from './state';

export class FourierSeries {
    static buildFourier(builder, n, zscale) {
        console.group('Build Fourier')
        const fourier = new FourierSeries()
        for (let k = 1; k < n; k++) {
            fourier.add(builder(k, zscale))
        }
        console.log(fourier)
        console.groupEnd()
        return fourier
    }

    constructor(offset=false) {
        this.components = []
        if (!offset) {
            this.components.push({ s: 0, o: 0 })
        }
    }

    add(sov) {
        this.components.push(sov)
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