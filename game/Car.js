class Car extends Pawn
{
    constructor(location)
    {
        super("Car")
        this.location = location       
        this.rotation = 0
        this.scale = Vector2D.identity()

        this.maximum_speed = 100
        this.maximum_angular_speed = 0.01

        this.drawable = this.create_drawable()   
        this.add_component(this.create_collider())
    }

    create_drawable()
    {
        let width = 100
        let height = 50

        let points = [
            new Vector2D(-width / 2, -height / 2),
            new Vector2D(width / 4, -height / 2),
            new Vector2D(width / 2, 0),
            new Vector2D(width / 4, height / 2),
            new Vector2D(-width / 2, height / 2),
        ]
        let drawable = new DrawableShape(points, "#ff1000", 2)
        return drawable
    }

    create_collider()
    {
        let box = new Box(-25, 0, 25, 50)
        let collider = new BoxCollider(box)
        return collider
    }

    follow_mouse(delta_seconds)
    {
        let input = this.game_instance.input
        let mouse_pos = input.mouse_position

        let car_mouse = Vector2D.subv(mouse_pos, this.location)
        let direction_car_mouse_length = car_mouse.length
        let direction_car_mouse = Vector2D.divf(car_mouse, direction_car_mouse_length)
        
        let target_rotation = 0

        if(direction_car_mouse_length > 0.01)
        {
            target_rotation = car_mouse.rotation_angle           

            let step = this.maximum_speed * delta_seconds
            if (step > direction_car_mouse_length)
            {
                step = direction_car_mouse_length
            }

            let translation = Vector2D.multf(direction_car_mouse, step)
            this.location = Vector2D.addv(this.location, translation)
        }
        else
        {
            target_rotation = 0
        }        

        if(Math.abs(this.rotation - target_rotation) > 0.01)
        {
            let rotation_direction = get_shortest_rotation(this.rotation, target_rotation)
            let rotation_step = rotation_direction * this.maximum_angular_speed
            this.rotation += rotation_step
        }      

    }

    begin_play()
    {
        super.begin_play()
    }

    tick(delta_seconds)
    {
        super.tick(delta_seconds)

        this.follow_mouse(delta_seconds)
    }

    render(canvas_rendering_context, delta_time)
    {
        super.render(canvas_rendering_context, delta_time)
    }
}