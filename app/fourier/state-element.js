/**
 * A visual that demos drawing paths using a fourier series.
 * 
 * Author:  Anshul Kharbanda
 * Created: 9 - 10 - 2020
 */
import { Vector } from '../vector/vector';
import { RotationMatrix } from '../vector/rotation';

export class FourierStateElement {
    static initial(scale, offset, frequency, dth=0.005) {
        return new FourierStateElement(
            scale, offset, frequency,
            Vector.scaleOffset(scale, offset),
            new RotationMatrix(frequency, dth)
        )
    }

    constructor(scale, offset, frequency, vector, rotation) {
        this.scale = scale
        this.offset = offset
        this.frequency = frequency
        this.vector = vector
        this.rotation = rotation
    }

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