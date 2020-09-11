/**
 * A visual that demos drawing paths using a fourier series.
 * 
 * Author:  Anshul Kharbanda
 * Created: 9 - 10 - 2020
 */
import './style/main.scss'

// Get draw context
const fout = document.getElementById('fourout')
const width = fout.width
const height = fout.height
const fctx = fout.getContext('2d')
const scale = 50
const dth = 0.01

/**
 * Approximately draw vector function onto canvas
 * 
 * @param {float -> { x: float, y: float }} func the function to draw
 * @param {CanvasRenderingContext2D} ctx canvas context to draw to
 * @param {int} width width of canvas element
 * @param {int} height height of canvas element
 * @param {float} scale output scaling
 * @param {float} dth increment of theta in each step (default 0.01)
 */
function drawFunction(func) {
    // Correction and scaling function
    let corrected = r => ({ x: r.x + width/2, y: r.y + height/2 })
    let scaled = r => ({ x: scale * r.x, y: scale * r.y })

    // Initial
    let r = func(0)
    r = scaled(r)
    r = corrected(r)

    // Initialize context
    fctx.lineWidth = '1'
    fctx.strokeStyle = '#ffffff'
    fctx.beginPath()
    fctx.moveTo(r.x, r.y)

    // Draw loop
    for (let th = dth; th < 2*Math.PI; th += dth) {
        // Current value
        r = func(th)
        r = scaled(r)
        r = corrected(r)

        // Draw line to current value
        fctx.lineTo(r.x, r.y)
    }

    // Draw the line
    fctx.stroke()
}

/**
 * Draws a single circle
 * 
 * @param {float} th function input parameter
 */
function circle(th) {
    return { x: Math.cos(th), y: Math.sin(th) } 
}

drawFunction(circle)