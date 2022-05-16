class PersistentDebugShape
{
    constructor(points, style, width, seconds)
    {
        this.points = points
        this.style = style
        this.width = width
        this.seconds_left = seconds
    }
}

class DebugUtils
{
    static instance = null

    constructor(ctx)
    {
        this.ctx = ctx

        this.persistent_shapes = []
    }    

    update(delta_seconds)
    {
        for(let i = 0; i < this.persistent_shapes.length; i++)
        {
            let shape = this.persistent_shapes[i]

            this.draw_debug_shape(shape.points, shape.style, shape.width, -1)

            shape.seconds_left -= delta_seconds

            if(shape.seconds_left <= 0)
            {
                this.persistent_shapes.splice(i, 1)
                i--
            }
        }
    }

    draw_debug_shape(points, style, width, persistance_seconds=-1)
    {
        if(persistance_seconds == -1)
        {
            draw_shape(this.ctx, points, style, width)
        }
        else
        {
            this.draw_debug_shape(points, style, width, -1)

            let shape = new PersistentDebugShape(points, style, width, persistance_seconds)
            this.persistent_shapes.push(shape)
        }
    }

    draw_debug_line(from, to, style, width, persistance_seconds=-1)
    {
        let points = [from, to]
        this.draw_debug_shape(points, style, width, persistance_seconds)
    }

    draw_debug_box(box, style, width, persistance_seconds=-1)
    {
        let left_top = new Vector2D(box.left, box.top)
        let right_top = new Vector2D(box.right, box.top)
        let left_bottom = new Vector2D(box.left, box.bottom)
        let right_bottom = new Vector2D(box.right, box.bottom)
        
        let points = [left_top, right_top, right_bottom, left_bottom]
        this.draw_debug_shape(points, style, width, persistance_seconds)
    }

}