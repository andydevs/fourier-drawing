/**
 * A visual that demos drawing paths using a fourier series.
 * 
 * Author:  Anshul Kharbanda
 * Created: 9 - 10 - 2020
 */
import { Vector } from './vector'

/**
 * Rotation matrix
 */
export class RotationMatrix {
    /**
     * Construct rotation matrix
     * 
     * @param {number} n   rotational frequency of matrix
     * @param {number} dth input angle change
     */
    constructor(n, dth=0.05) {
        let arc = 2*Math.PI*n*dth
        let sarc = Math.sin(arc)
        let carc = Math.cos(arc)
        this.xx = carc
        this.xy = -sarc
        this.yx = sarc
        this.yy = carc
    }

    /**
     * Transformed vector
     * 
     * @param {Vector} vector input vector to transform
     */
    transform(vector) {
        return new Vector(
            this.xx*vector.x + this.xy*vector.y,
            this.yx*vector.x + this.yy*vector.y
        )
    }
}