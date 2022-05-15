class RoadAnimator extends Pawn
{
    constructor(canvas)
    {
        super("RoadAnimator")
        this.drawable = new RoadAnimationDrawable(canvas)
    }

    begin_play()
    {
        super.begin_play()
    }

    tick(delta_seconds)
    {
        super.tick(delta_seconds)

        this.drawable.update(delta_seconds)
    }

    render(canvas_rendering_context, delta_time)
    {
        if(this.drawable != null)
        {
            this.drawable.draw(canvas_rendering_context, this.location, this.rotation, this.scale)
        }
    }

}