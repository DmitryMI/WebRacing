class DrawableShape extends Drawable
{
    constructor(points, style, width)
    {
        super()
        this.points = points
        this.style = style
        this.width = width
    }

    draw(ctx, position, rotation, scale)
    {
        let translated_points = []
        for(let i = 0; i < this.points.length; i++)
        {
            let translated_point = Vector2D.addv(this.points[i], position)
            translated_points.push(translated_point)
        }
        
        ctx.translate(position.x, position.y)
        ctx.rotate(rotation)
        ctx.translate(-position.x, -position.y)

        draw_shape(ctx, translated_points, this.style, this.width)
        
        ctx.translate(position.x, position.y)
        ctx.rotate(-rotation)
        ctx.translate(-position.x, -position.y)
    }
}