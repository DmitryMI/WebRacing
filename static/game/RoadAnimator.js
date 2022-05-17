class RoadAnimator extends Pawn
{
    constructor(canvas, road_width_fraction)
    {
        super("RoadAnimator")
        this.drawable = new RoadAnimationDrawable(canvas, road_width_fraction)
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
            this.drawable.render(canvas_rendering_context)
        }
    }

}