class Circle
{
    constructor(center, radius)
    {
        this.center = center
        this.radius = radius
    }

    intersects(shape)
    {
        if(shape instanceof Box)
        {
            return this.intersects_box(shape)
        }
        else if (shape instanceof Circle)
        {
            return this.intersects_circle(shape)
        }

        return false;
    }

    intersects_circle(circle)
    {
        let vec = Vector2D.subv(this.center, shape.center)
        let distance_sqr = vec.length_sqr
        let instersection_distance = this.radius + shape.radius
        let instersection_distance_sqr = instersection_distance * instersection_distance

        return distance_sqr < instersection_distance_sqr
    }


    intersects_box(box)
    {
        let closest_x = clamp(this.center.x, box.left, box.right)
        let closest_y = clamp(this.center.y, box.bottom, box.top)

        let distance_x = this.center.x - closest_x
        let distance_y = this.center.y - closest_y

        let distance_sqr = (distance_x * distance_x) + (distance_y * distance_y)
        return distance_sqr < (this.radius * this.radius)
    }

    contains_point(point)
    {
        let bInRangeX = this.left <= point.x && point.x < this.right;
	    let bInRangeY = this.bottom <= point.y && point.y < this.top;
	    return bInRangeX && bInRangeY;
    }

    get_translated_circle(position, rotation, scale)
    {
        let center = Vector2D.addv(this.center, position)
        return new Circle(center, this.radius)
    }
}