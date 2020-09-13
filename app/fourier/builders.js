/**
 * A visual that demos drawing paths using a fourier series.
 * 
 * Author:  Anshul Kharbanda
 * Created: 9 - 10 - 2020
 */

const squareWave = (k, fscale) => ({
    s: (k % 2) * fscale / k, // Scale
    o: 0 // Offset
})

export const random = (k, fscale) => ({
    s: fscale / k * Math.random(), // Scale
    o: 2 * Math.PI * Math.random() // Offset
})

export const builders = {
    'wave-square': squareWave,
    'random': random
}