class Vector2D
{
    constructor(x, y)
    {
        this.x = x
        this.y = y
    }   

    get size_sqr()
    {
        return this.x * this.x + this.y * this.y
    }

    get length_sqr()
    {
        return this.size_sqr
    }

    get size()
    {
        return Math.sqrt(this.size_sqr)
    }

    get length()
    {
        return this.size
    }

    get rotation_angle()
    {
        return Math.atan2(this.y, this.x)
    }

    static addv(veca, vecb)
    {
        let x = veca.x + vecb.x
        let y = veca.y + vecb.y
        return new Vector2D(x, y) 
    }

    static addf(veca, value)
    {
        let x = veca.x + value
        let y = veca.y + value
        return new Vector2D(x, y) 
    }

    static multv(veca, vecb)
    {
        let x = veca.x * vecb.x
        let y = veca.y * vecb.y
        return new Vector2D(x, y) 
    }

    static multf(vec, value)
    {
        let x = vec.x * value
        let y = vec.y * value
        return new Vector2D(x, y)
    }

    static divf(vector, value)
    {
        let x = vector.x / value
        let y = vector.y / value
        return new Vector2D(x, y)
    }

    static divv(veca, vecb)
    {
        let x = veca.x / vecb.x
        let y = veca.y / vecb.y
        return new Vector2D(x, y)
    }

    static subf(vec, f)
    {
        let x = vec.x - f
        let y = vec.y - f
        return new Vector2D(x, y)
    }

    static subv(a, b)
    {
        let x = a.x - b.x
        let y = a.y - b.y
        return new Vector2D(x, y)
    }

    static dot(a, b)
    {
        let sum = a.x * b.x + a.y * b.y
        return sum
    }

    static get_unit_vector_from_rotation(rotation)
    {
        let vec = Vector2D.right()
        vec.rotate(rotation)
        return vec
    }

    normalize()
    {
        let length = this.size
        this.x /= length
        this.y /= length
    }

    clone()
    {
        let clone = new Vector2D(this.x, this.y)
        return clone
    }

    get_normalized()
    {
        return this.clone().normalize()
    }

    rotate(angle_rad)
    {
        let cos = Math.cos(angle_rad)
        let sin = Math.sin(angle_rad)
        let x = this.x * cos - this.y * sin
        let y = this.x * sin + this.y * cos

        this.x = x
        this.y = y
    }

    rotate_around(angle_rad, point)
    {
        let x = this.x - point.x
        let y = this.y - point.y
        let cos = Math.cos(angle_rad)
        let sin = Math.sin(angle_rad)
        let nx = cos * x - sin * y
        let ny = sin * x + cos * y

        this.x = nx + point.x
        this.y = ny + point.y
    }    

    static angle_between_vectors(a, b)
    {
        let xa = a.x
        let ya = a.y
        let xb = b.x
        let yb = b.y

        top = xa * xb + ya * yb
        aSq = xa * xa + ya * ya
        bSq = xb * xb + yb * yb
        aSqrt = Math.sqrt(aSq)
        bSqrt = Math.sqrt(bSq)
        abSqrt = aSqrt * bSqrt

        div = top / abSqrt
        result = Math.acos(div)

        return result
    }    

    static zero()
    {
        return new Vector2D(0, 0)
    }

    static up()
    {
        return new Vector2D(0, 1)
    }

    static down()
    {
        return new Vector2D(0, -1)
    }

    static right()
    {
        return new Vector2D(1, 0)
    }

    static identity()
    {
        return new Vector2D(1, 1)
    }

    static random_unit_box()
    {
        let x = 2 * Math.random() - 1
        let y = 2 * Math.random() - 1
        return new Vector2D(x, y)
    }

    static random_box(left, top, right, bottom)
    {
        let x = random_range(left, right)
        let y = random_range(bottom, top)
        return new Vector2D(x, y)
    }

    static random_unit_circle()
    {
       let unit = new Vector2D(1, 0)
       let angle = Math.random() * 2 * Math.PI
       unit.rotate(angle)
       return unit
    }
}