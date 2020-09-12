/**
 * A visual that demos drawing paths using a fourier series.
 * 
 * Author:  Anshul Kharbanda
 * Created: 9 - 10 - 2020
 */
import { FourierSeries } from '../series';

export function buildRandomFourier(n, fscale) {
    // Build a random fourier series of n elements
    console.group('Random Fourier Series')
    const fourier = new FourierSeries()
    for (let i = 1; i < n; i++) {
        fourier.add({
            s: fscale * Math.random() / i, // Scale
            o: Math.random()*Math.PI*2 // Offset    
        })
    }
    console.log(fourier)
    console.groupEnd()
    return fourier
}