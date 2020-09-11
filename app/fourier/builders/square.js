/**
 * A visual that demos drawing paths using a fourier series.
 * 
 * Author:  Anshul Kharbanda
 * Created: 9 - 10 - 2020
 */
import { FourierSeries } from '../series';

export function buildSquareFourier(n, fscale) {
    // Build a random fourier series of n elements
    console.group('Square Fourier Series')
    const fourier = new FourierSeries()
    for (let k = 1; k < (2*n + 1); k++) {
        fourier.add({
            s: (k % 2) * fscale / k, // Scale
            o: 0 // Offset
        })
    }
    console.log(fourier)
    console.groupEnd()
    return fourier
}