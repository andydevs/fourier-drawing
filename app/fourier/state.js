/**
 * A visual that demos drawing paths using a fourier series.
 * 
 * Author:  Anshul Kharbanda
 * Created: 9 - 10 - 2020
 */
import { Vector } from '../vector/vector';
import { FourierStateElement } from './state-element';

export class FourierState {
    static initial(fourier, dth=0.005) {
        return new FourierState(
            fourier.map(({ s, o }, n) => 
                FourierStateElement.initial(s, o, n, dth))
        )
    }

    constructor(elements) {
        this.elements = elements
    }

    update() {
        return new FourierState(
            this.elements.map(elem => elem.update()))
    }

    output() {
        return this.elements
            .map(elem => elem.vector)
            .reduce((vA, vB) => vA.plus(vB), Vector.ZERO)
    }
}
