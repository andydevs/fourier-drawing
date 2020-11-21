/**
 * A visual that demos drawing paths using a fourier series.
 * 
 * Author:  Anshul Kharbanda
 * Created: 9 - 10 - 2020
 */

/**
 * Vector object
 */
export class Vector {
    /**
     * Create vector from scale and offset angle
     * 
     * @param {number} s scale of vector
     * @param {number} o offset angle
     */
    static scaleOffset(s, o) {
        return new Vector(s*Math.cos(o), s*Math.sin(o))
    }

    /**
     * Construct vector from x and y value
     * 
     * @param {float} x x value
     * @param {float} y y value
     */
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    /**
     * Add another vector
     * 
     * @param {Vector} other other vector to add
     */
    plus(other) {
        return new Vector(this.x + other.x, this.y + other.y)
    }

    /**
     * Scale the vector by scalar
     * 
     * @param {number} scalar scalar value to stretch the vector
     */
    times(scalar) {
        return new Vector(this.x * scalar, this.y * scalar)
    }

    /**
     * Round vector to nearest integer point
     */
    round() {
        return new Vector(
            Math.round(this.x),
            Math.round(this.y)
        )
    }
}
Vector.ZERO = new Vector(0, 0)