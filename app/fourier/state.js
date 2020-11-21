/**
 * A visual that demos drawing paths using a fourier series.
 * 
 * Author:  Anshul Kharbanda
 * Created: 9 - 10 - 2020
 */
import { Vector } from '../vector/vector';
import { FourierStateElement } from './state-element';

/**
 * Current state of the fourier series
 */
export class FourierState {
    /**
     * Create initial fourier state
     * 
     * @param {FourierSeries} fourier input fourier series
     * @param {float} dth             input change of theta
     */
    static initial(fourier, dth=0.005) {
        return new FourierState(
            fourier.map(({ s, o }, n) => 
                FourierStateElement.initial(s, o, n, dth))
        )
    }

    /**
     * Construct a FourierState with given elements
     * 
     * @param {Array} elements array of fourier elements
     */
    constructor(elements) {
        this.elements = elements
    }

    /**
     * Return updated fourier state
     */
    update() {
        return new FourierState(
            this.elements.map(elem => elem.update()))
    }

    /**
     * Return output point
     */
    output() {
        return this.elements
            .map(elem => elem.vector)
            .reduce((vA, vB) => vA.plus(vB), Vector.ZERO)
    }
}
