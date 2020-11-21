/**
 * A visual that demos drawing paths using a fourier series.
 * 
 * Author:  Anshul Kharbanda
 * Created: 9 - 10 - 2020
 */

/**
 * Fourier builder for square wave
 * 
 * @param {number} k      integer frequency of fourier element
 * @param {number} zscale scale of fourier element
 */
const squareWave = (k, zscale) => ({
    s: (k % 2) * zscale / k, // Scale
    o: 0 // Offset
})

/**
 * Fourier builder for sawtooth wave
 * 
 * @param {number} k      integer frequency of fourier element
 * @param {number} zscale scale of fourier element
 */
const sawtoothWave = (k, zscale) => ({
    s: zscale / k, // Scale
    o: 0 // Offset
})

/**
 * Fourier builder for triangle wave
 * 
 * @param {number} k      integer frequency of fourier element
 * @param {number} zscale scale of fourier element
 */
const triangleWave = (k, zscale) => {
    let scale = zscale / (k * k)
    let direction
    if (k % 4 === 1) direction = scale
    else if (k % 4 === 3) direction = -scale
    else direction = 0
    return { s: direction, o: 0 }
}

/**
 * Fourier builder for just a random wave
 * 
 * @param {number} k      integer frequency of fourier element
 * @param {number} zscale scale of fourier element
 */
export const random = (k, zscale) => ({
    s: zscale / k * Math.random(), // Scale
    o: 2 * Math.PI * Math.random() // Offset
})

// Fourier builders selector object
export const builders = {
    'wave-square': squareWave,
    'wave-sawtooth': sawtoothWave,
    'wave-triangle': triangleWave,
    'random': random
}