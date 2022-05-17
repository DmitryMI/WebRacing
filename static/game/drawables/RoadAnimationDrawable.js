class RoadStripeDrawable extends Drawable
{
    constructor(style, line_width, location)
    {
        super(0)

        this.location = location

        this.shape_points = [
            new Vector2D(-10, 50),
            new Vector2D(10, 50),
            new Vector2D(10, -50),
            new Vector2D(-10, -50)
        ]

        this.shape = new DrawableShape(this.location, 0, Vector2D.identity(), this.shape_points, "#101010", 1)        
        
        this.style = style
        this.width = line_width
    }

    render(ctx)
    {
        this.shape.location = this.location
        this.shape.render(ctx)

        ctx.fillStyle = "#EFEFEF";

        let x = this.location.x - 10
        let y = this.location.y - 50
        let width = 20
        let height = 100

        ctx.fillRect(x, y, width, height);
    }
}

class RoadAsphaltDrawable extends Drawable
{
    constructor(road_center, road_width, road_height)
    {
        super(0)

        this.road_center = road_center
        this.road_width = road_width
        this.road_height = road_height
    }

    render(ctx)
    {
        ctx.fillStyle = "#282B2A ";

        let x = this.road_center.x - this.road_width / 2
        let y = this.road_center.y - this.road_height / 2
        let width = this.road_width
        let height = this.road_height

        ctx.fillRect(x, y, width, height);
    }
}

class RoadAnimationDrawable extends Drawable
{
    constructor(canvas, road_width_fraction, sorting_priority = 0)
    {
        super(sorting_priority)
        this.canvas = canvas
        this.road_width_fraction = road_width_fraction

        this.stripe_spawn_distance = 200        

        this.road_stripes = []
        this.road_asphalt = new RoadAsphaltDrawable(this.get_road_center(), this.get_road_width(), this.get_road_height())

        this.next_stripe_time = 0
        this.previous_road_width = this.get_road_width()
        this.previous_road_height = this.get_road_height()
    }

    get_road_width()
    {
        return this.canvas.clientWidth * this.road_width_fraction
    }

    get_road_height()
    {
        return this.canvas.clientHeight
    }

    get_road_center()
    {
        return new Vector2D(this.canvas.clientWidth / 2, this.canvas.clientHeight / 2)
    }

    spawn_stripe()
    {
        let pos = new Vector2D(this.get_road_center().x, -500)
        let stripe = new RoadStripeDrawable("#000000", 3, pos)
        this.road_stripes.push(stripe)
    }

    update(delta_seconds)
    {
        let step = Vector2D.multf(new Vector2D(0, 1), WebRacingGameController.road_vertical_speed * delta_seconds)

        for(let i = 0; i < this.road_stripes.length; i++)
        {
            let stripe = this.road_stripes[i]            
            stripe.location = Vector2D.addv(stripe.location, step)

            if(stripe.location.y > this.get_road_height() + 500)
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

        this.road_asphalt.road_center = this.get_road_center()
        this.road_asphalt.road_width = this.get_road_width()
        this.road_asphalt.road_height = this.get_road_height()
    }

    render(ctx)
    {
        this.road_asphalt.render(ctx)
        for(let i = 0; i < this.road_stripes.length; i++)
        {
            let stripe = this.road_stripes[i]            
            stripe.render(ctx)
        }        
    }
}