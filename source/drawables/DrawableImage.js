class DrawableImage extends Drawable
{
    constructor(image)
    {
        super()
        this.image = image
    }

    draw(ctx, x, y)
    {
        let xShifted = x - this.image.width / 2
        let yShifted = y - this.image.height / 2
        ctx.drawImage(this.image, xShifted, yShifted)
    }
}