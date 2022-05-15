class DrawableImage extends Drawable
{
    constructor(image, location, rotation, width, height, sorting_priority = 0)
    {
        super(sorting_priority)
        this.image = image
        this.location = location
        this.rotation = rotation
        this.width = width
        this.height = height

        this.scale = Vector2D.identity()      
    }

    render(ctx)
    {
        super.render(ctx)

        let x = this.location.x
        let y = this.location.y       

        let xShifted = x - this.width / 2
        let yShifted = y - this.height / 2        

        ctx.drawImage(this.image, xShifted, yShifted, this.width, this.height)
    }
}