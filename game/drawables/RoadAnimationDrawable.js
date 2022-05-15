class RoadStripeDrawable extends DrawableShape
{
    constructor(style, width, position)
    {
        super()
        this.points = [
            new Vector2D(-10, 50),
            new Vector2D(10, 50),
            new Vector2D(10, -50),
            new Vector2D(-10, -50)
        ]
        this.style = style
        this.width = width

        this.position = position
    }

    draw(ctx, position, rotation, scale)
    {
        super.draw(ctx, position, rotation, scale)
    }
}

class RoadAnimationDrawable extends Drawable
{
    constructor(canvas)
    {
        super()
        this.canvas = canvas
        this.stripe_spawn_distance = 200

        this.road_stripes = []

        this.next_stripe_time = 0
        this.previous_road_width = this.get_road_width()
        this.previous_road_height = this.get_road_height()
    }

    get_road_width()
    {
        return this.canvas.clientWidth
    }

    get_road_height()
    {
        return this.canvas.clientHeight
    }

    spawn_stripe()
    {
        let pos = new Vector2D(this.get_road_width() / 2, -500)
        let stripe = new RoadStripeDrawable("#000000", 3, pos)
        this.road_stripes.push(stripe)
    }

    update(delta_seconds)
    {
        let step = Vector2D.multf(new Vector2D(0, 1), WebRacingGameController.road_vertical_speed * delta_seconds)

        for(let i = 0; i < this.road_stripes.length; i++)
        {
            let stripe = this.road_stripes[i]            
            stripe.position = Vector2D.addv(stripe.position, step)

            if(stripe.position.y > this.get_road_height() + 500)
            {
                this.road_stripes.splice(i, 1)
                i--
            }
        }

        if(this.next_stripe_time <= 0)
        {
            this.spawn_stripe()
            this.next_stripe_time = this.stripe_spawn_distance / WebRacingGameController.road_vertical_speed
        }
        else
        {
            this.next_stripe_time -= delta_seconds
        }
    }

    draw(ctx, position, rotation, scale)
    {
        for(let i = 0; i < this.road_stripes.length; i++)
        {
            let stripe = this.road_stripes[i]            
            stripe.draw(ctx, stripe.position, 0, Vector2D.identity())
        }
    }
}