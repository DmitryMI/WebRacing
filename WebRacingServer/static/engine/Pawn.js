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

    get forward()
    {
        return Vector2D.get_unit_vector_from_rotation(this.rotation)
    }

    set rotation(value)
    {
        this._rotation = unwind_angle(value)
    }

    draw_debug_forward()
    {
        let forward = Vector2D.multf(this.forward, 100)
        let forward_step = Vector2D.addv(this.location, forward)
        this.debug_utils?.draw_debug_line(this.location, forward_step, "#00FF00", 1)
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
        if(this.game_instance == null)
        {
            return
        }
        
        if(this.drawable != null)
        {
            this.drawable.location = this.location
            this.drawable.rotation = this.rotation
            this.drawable.scale = this.scale
            //this.drawable.render(canvas_rendering_context)
            this.game_instance.renderer.enqueue(this.drawable)
        }
    }
}