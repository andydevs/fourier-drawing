/**
 * A visual that demos drawing paths using a fourier series.
 * 
 * Author:  Anshul Kharbanda
 * Created: 9 - 10 - 2020
 */
import { Vector } from '../vector/vector';
import { RotationMatrix } from '../vector/rotation';

/**
 * Element of fourier state
 */
export class FourierStateElement {
    /**
     * Initial FourierStateElement
     * 
     * @param {number} scale     scale of fourier vector
     * @param {number} offset    offset angle
     * @param {number} frequency rotational frequency
     * @param {number} dth       angle change per frame 
     */
    static initial(scale, offset, frequency, dth=0.005) {
        return new FourierStateElement(
            scale, offset, frequency,
            Vector.scaleOffset(scale, offset),
            new RotationMatrix(frequency, dth)
        )
    }

    /**
     * Construct fourier state element with vector
     * 
     * @param {number}         scale     scale of fourier vector
     * @param {number}         offset    offset angle
     * @param {number}         frequency rotational frequency
     * @param {Vector}         vector    current vector 
     * @param {RotationMatrix} rotation  current rotation matrix 
     */
    constructor(scale, offset, frequency, vector, rotation) {
        this.scale = scale
        this.offset = offset
        this.frequency = frequency
        this.vector = vector
        this.rotation = rotation
    }

    /**
     * Return updated fourier state element
     */
    update() {
        return new FourierStateElement(
            this.scale,
            this.offset,
            this.frequency,
            this.rotation.transform(this.vector),
            this.rotation
        )
    }
}