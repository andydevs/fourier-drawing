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

const sawtoothWave = (k, fscale) => ({
    s: fscale / k, // Scale
    o: 0 // Offset
})

const triangleWave = (k, fscale) => {
    let scale = fscale / (k * k)
    let direction
    if (k % 4 === 1) direction = scale
    else if (k % 4 === 3) direction = -scale
    else direction = 0
    return { s: direction, o: 0 }
}

export const random = (k, fscale) => ({
    s: fscale / k * Math.random(), // Scale
    o: 2 * Math.PI * Math.random() // Offset
})

export const builders = {
    'wave-square': squareWave,
    'wave-sawtooth': sawtoothWave,
    'wave-triangle': triangleWave,
    'random': random
}