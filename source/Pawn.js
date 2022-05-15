class Pawn extends Actor
{
    constructor(name, location, rotation, scale, drawable)
    {
        super(name)
        this.location = location        
        this.rotation = rotation
        this.scale = scale
        this.drawable = drawable
    }

    begin_play()
    {
        super.begin_play()
    }

    tick(delta_seconds)
    {
        super.tick(delta_seconds)
    }

    render(canvas_rendering_context, delta_time)
    {
        this.drawable.draw(canvas_rendering_context, this.location.x, this.location.y)
        //let x = this.location.x - this.image.width / 2
        //let y = this.location.y - this.image.height / 2
        //canvas_rendering_context.drawImage(this.image, x, y)
    }
}