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
        this._alpha = 1

        this.scale = Vector2D.identity()      
        this.default_rotation = 0
    }

    get alpha()
    {
        return this._alpha
    }

    set alpha(value)
    {
        this._alpha = value
    }

    set_image_default_rotation(value)
    {
        this.default_rotation = value
    }

    render(ctx)
    {
        super.render(ctx)

        let rot = this.rotation + this.default_rotation

        let x = this.location.x
        let y = this.location.y     
        
        let width = this.width * this.scale.x
        let height = this.height * this.scale.y

        let xShifted = x - width / 2
        let yShifted = y - height / 2      
        
        ctx.translate(this.location.x, this.location.y)
        ctx.rotate(rot)
        ctx.translate(-this.location.x, -this.location.y)

        ctx.globalAlpha = this.alpha;       
        ctx.drawImage(this.image, xShifted, yShifted, width, height)
        ctx.globalAlpha = 1.0;
        
        ctx.translate(this.location.x, this.location.y)
        ctx.rotate(-rot)
        ctx.translate(-this.location.x, -this.location.y)        
    }
}