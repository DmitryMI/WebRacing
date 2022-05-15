class DrawableShape extends Drawable
{
    constructor(location, rotation, scale, points, style, width, sorting_priority = 0)
    {
        super(sorting_priority)
        this.location = location
        this.rotation = rotation
        this.scale = scale

        this.points = points
        this.style = style
        this.width = width
    }

    render(ctx)
    {
        let translated_points = []
        for(let i = 0; i < this.points.length; i++)
        {
            let translated_point = Vector2D.addv(this.points[i], this.location)
            translated_points.push(translated_point)
        }
        
        ctx.translate(this.location.x, this.location.y)
        ctx.rotate(this.rotation)
        ctx.translate(-this.location.x, -this.location.y)

        draw_shape(ctx, translated_points, this.style, this.width)
        
        ctx.translate(this.location.x, this.location.y)
        ctx.rotate(-this.rotation)
        ctx.translate(-this.location.x, -this.location.y)
    }
}