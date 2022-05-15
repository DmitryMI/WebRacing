class DrawableImage extends Drawable
{
    constructor(image, location, rotation, scale, sorting_priority = 0)
    {
        super(sorting_priority)
        this.image = image
        this.location = location
        this.rotation = rotation
        this.scale = scale
    }

    render(ctx)
    {
        super.render(ctx)

        let x = this.location.x
        let y = this.location.y
        let xShifted = x - this.image.width / 2
        let yShifted = y - this.image.height / 2
        ctx.drawImage(this.image, xShifted, yShifted)
    }
}