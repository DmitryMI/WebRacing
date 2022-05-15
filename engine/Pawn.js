class Pawn extends Actor
{
    constructor(name, location, rotation, scale, drawable)
    {
        super(name)
        this.location = location        
        this._rotation = rotation
        this.scale = scale
        this.drawable = drawable
    }

    get rotation()
    {
        return this._rotation
    }

    set rotation(value)
    {
        this._rotation = unwind_angle(value)
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
        if(this.drawable != null)
        {
            this.drawable.draw(canvas_rendering_context, this.location, this.rotation, this.scale)
        }
    }
}