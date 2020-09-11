/**
 * A visual that demos drawing paths using a fourier series.
 * 
 * Author:  Anshul Kharbanda
 * Created: 9 - 10 - 2020
 */

export class RotationMatrix {
    constructor(n, dth=0.05) {
        let arc = n*dth
        let sarc = Math.sin(arc)
        let carc = Math.cos(arc)
        this.xx = carc
        this.xy = -sarc
        this.yx = sarc
        this.yy = carc
    }

    transform(vector) {
        return new Vector(
            this.xx*vector.x + this.xy*vector.y,
            this.yx*vector.x + this.yy*vector.y
        )
    }
}

export class Vector {
    static scaleOffset(s, o) {
        return new Vector(s*Math.cos(o), s*Math.sin(o))
    }

    constructor(x, y) {
        this.x = x
        this.y = y
    }

    plus(other) {
        return new Vector(this.x + other.x, this.y + other.y)
    }

    times(scalar) {
        return new Vector(this.x * scalar, this.y * scalar)
    }

    round() {
        return new Vector(
            Math.round(this.x),
            Math.round(this.y)
        )
    }
}
Vector.ZERO = new Vector(0, 0)