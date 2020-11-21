/**
 * A visual that demos drawing paths using a fourier series.
 * 
 * Author:  Anshul Kharbanda
 * Created: 9 - 10 - 2020
 */
import { Vector } from './vector/vector'
import { animationFrameScheduler, of, Subscription } from 'rxjs';
import { observeOn, repeat } from 'rxjs/operators';

// Animation loop observable
const animationLoop$ = of(0).pipe(
    observeOn(animationFrameScheduler),
    repeat()
)

/**
 * Window to draw fourier system to
 */
export class FourierOutputContext {
    /**
     * Initialize object
     * 
     * @param {string} id    element id to attach
     * @param {number} scale zoom scale output of fourier system
     */
    constructor(id, scale=50) {
        this.canvas = document.getElementById(id)
        this.ctx = this.canvas.getContext('2d')
        this.width = this.canvas.width
        this.height = this.canvas.height
        this.scale = scale
        this.current = Subscription.EMPTY
    }

    /**
     * Center point of draw context
     */
    getOrigin() {
        return new Vector(this.width/2, this.height/2)
    }

    /**
     * Scale input point to fourier 
     * draw context output scale
     * 
     * @param {Vector} r input point
     */
    sCorrect(r) {
        return r.times(this.scale)
    }

    /**
     * Shift and scale input point to 
     * fourier draw context output scale
     * 
     * @param {Vector} r input point
     */
    correct(r) {
        let b = r
        b = this.sCorrect(b)
        b = b.plus(this.getOrigin())
        b = b.round()
        return b
    }

    /**
     * Clear output context
     */
    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height)
    }

    /**
     * Draw fourier path onto context
     * 
     * @param {Array} path array of point objects
     */
    drawPath(path) {
        this.ctx.lineWidth = '3'
        this.ctx.strokeStyle = '#045'
        this.ctx.beginPath()
        let r = this.correct(path[0])
        this.ctx.moveTo(r.x, r.y)
        for (let i = 1; i < path.length; i++) {
            r = this.correct(path[i])
            this.ctx.lineTo(r.x, r.y)
        }
        this.ctx.stroke()
    }

    /**
     * Draw lines onto draw context
     * 
     * @param {FourierState} fourierState fourier state
     */
    drawLines(fourierState) {
        // Initialize context
        this.ctx.lineWidth = '1'
        this.ctx.strokeStyle = '#fa0'

        // Initialize path
        let s = this.getOrigin()
        this.ctx.beginPath()
        this.ctx.moveTo(s.x, s.y)
    
        // Draw lines along path
        fourierState.elements.forEach(({ vector }) => {
            s = s.plus(this.sCorrect(vector))
            this.ctx.lineTo(s.x, s.y)
        })
    
        // Stroke
        this.ctx.stroke()
    }
    
    /**
     * Draw circles onto draw context
     * 
     * @param {FourierState} fourierState fourier state
     */
    drawCircles(fourierState) {
        // Initialize context
        this.ctx.lineWidth = '0.5'
        this.ctx.strokeStyle = '#555'
        
        // Draw circles along path
        let s = this.getOrigin()
        fourierState.elements.forEach(element => {
            this.ctx.beginPath()
            this.ctx.arc(s.x, s.y, Math.abs(element.scale)*this.scale, 0, 2*Math.PI)
            this.ctx.stroke()
            s = s.plus(this.sCorrect(element.vector))
        })
    }

    /**
     * Start animation loop
     * 
     * @param {FourierSeries} fourier fourier series
     * @param {float} dth theta update every frame (speed)
     */
    renderAnimation(fourier, dth=0.001) {
        this.current.unsubscribe()
        const path = fourier.getPath(dth)
        let state = fourier.getInitialState(dth)
        this.current = animationLoop$.subscribe(() => {
            this.clear()
            this.drawPath(path)
            this.drawLines(state)
            this.drawCircles(state)
            state = state.update()
        })
    }
}