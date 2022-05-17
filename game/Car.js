class Car extends Pawn
{
    constructor(location)
    {
        super("Car")
        this.location = location       
        this.rotation = 3 * Math.PI / 2
        this.scale = Vector2D.identity()

        this.maximum_speed = 800
        this.maximum_angular_speed = 0.05

        this.drawable = this.create_drawable()   
        this.collider = this.create_collider_circle()
        this.collider.add_collision_enter_event_handler((other_collider)=>this.on_collision_enter(other_collider))
        this.add_component(this.collider)

        this.smoke_spawn_period = 0.01

        this.health = 100

        this.next_smoke_particle_time = this.smoke_spawn_period

        this.invincibility_timer = 0
        this.invincibility_duration = 1.0

        this.flicker = 1
        this.flicker_timer = 0
        this.flicker_period = 0.05
    }

    static image_instance = null

    create_drawable()
    {
        if (Car.image_instance == null)
        {
            Car.image_instance = new Image()
            Car.image_instance.src = 'images/Car.png';            
        }

        let drawable = new DrawableImage(Car.image_instance, this.location, this.rotation, 100, 50, 20)
        return drawable
    }

    create_drawable_debug()
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
        let drawable = new DrawableShape(this.location, this.rotation, this.scale, points, "#ff1000", 2)
        return drawable
    }

    create_collider()
    {
        let box = new Box(-25, 50, 25, -50)
        let collider = new BoxCollider(box)
        return collider
    }

    create_collider_circle()
    {
        let circle = new Circle(Vector2D.zero(), 25)
        let collider = new CircleCollider(circle)
        return collider
    }

    follow_mouse(delta_seconds)
    {
        let input = this.game_instance.input
        let mouse_pos = input.mouse_position

        let x_diff = mouse_pos.x - this.location.x
        let y_diff = mouse_pos.y - this.location.y

        let mouse_direction = new Vector2D(x_diff, y_diff)
        mouse_direction.normalize()

        let face_target_x = mouse_direction.x * this.maximum_speed
        let face_target_y = mouse_direction.y * this.maximum_speed - WebRacingGameController.road_vertical_speed
       
        //let face_target_x = this.location.x
        let face_target = new Vector2D(face_target_x, face_target_y)

        //this.debug_utils.draw_debug_line(this.location, Vector2D.addv(this.location, face_target), "#ff0000", 2)

        let car_mouse = Vector2D.subv(mouse_pos, this.location)
        let direction_car_mouse_length = car_mouse.length
        let direction_car_mouse = Vector2D.divf(car_mouse, direction_car_mouse_length)
        
        let target_rotation = 0      

        if(direction_car_mouse_length > 0.01)
        {                   
            target_rotation = unwind_angle(face_target.rotation_angle)

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
            target_rotation = 3 * Math.PI / 2
        }
        
        let rotation_delta = get_shortest_angle(this.rotation, target_rotation)
        let rotation_delta_abs = Math.abs(rotation_delta)
        if(rotation_delta_abs > 0.001)
        {
            let rotation_direction = Math.sign(rotation_delta)
            let rotation_step = rotation_direction * this.maximum_angular_speed
            if(Math.abs(rotation_step) > rotation_delta_abs)
            {
                rotation_step = rotation_delta
            }
            this.rotation += rotation_step
        }
        else
        {
            this.rotation = target_rotation
        }

    }

    begin_play()
    {
        super.begin_play()        
    }

    on_collision_enter(other_collider)
    {       
        let other_pawn = other_collider.parent
        let hit_direction = Vector2D.subv(other_pawn.location, this.location)
        hit_direction.normalize()

        let car_forward = this.forward    
        
        // -1 means read hit, 0 is side hit, 1 means forward hit
        let hit_direction_dot = Vector2D.dot(car_forward, hit_direction)

        // 0 means read hit, 0.5 is side hit, 1 means forward hit
        let hit_direction_dot_normalized = (hit_direction_dot + 1) / 2

        let max_damage = 50
        let min_damage = 10

        let damage = lerp(min_damage, max_damage, hit_direction_dot_normalized)

        if(this.invincibility_timer <= 0)
        {
            this.health -= damage
            this.invincibility_timer = this.invincibility_duration
        }

        this.game_instance.game_controller.report_car_collision(other_collider)
    }

    spawn_smoke_at(spawn_offset)
    {
        let rotation_speed = random_range(-2, 2)

        let spawn_location = Vector2D.addv(this.location, spawn_offset)
        let x_speed = random_range(-20, 20)
        let particle_speed = new Vector2D(x_speed, WebRacingGameController.road_vertical_speed)
        let particle = new SmokeParticle(spawn_location, particle_speed, rotation_speed, 0.3)
        this.game_instance.spawn(particle)
    }

    spawn_smoke()
    {       
        // Right Smoke
        let right_x_spawn = random_range(-80, -50)
        let right_y_spawn = random_range(5, 10)
        let right_spawn_offset = new Vector2D(right_x_spawn, right_y_spawn)
        right_spawn_offset.rotate(this.rotation)

        // Left Smoke
        let left_x_spawn = random_range(-80, -50)
        let left_y_spawn = random_range(-10, -5)
        let left_spawn_offset = new Vector2D(left_x_spawn, left_y_spawn)
        left_spawn_offset.rotate(this.rotation)

        this.spawn_smoke_at(left_spawn_offset)
        this.spawn_smoke_at(right_spawn_offset)       
    }

    update_flicker(delta_seconds)
    {
        if(this.flicker_timer <= 0)
        {
            this.flicker = -this.flicker
            this.flicker_timer = this.flicker_period
        }
        else
        {
            this.flicker_timer -= delta_seconds
        }
    }

    tick(delta_seconds)
    {
        super.tick(delta_seconds)

        this.follow_mouse(delta_seconds)

        this.update_flicker(delta_seconds)

        if(this.next_smoke_particle_time <= 0)
        {
            this.spawn_smoke()
            this.next_smoke_particle_time = this.smoke_spawn_period
        }
        else
        {
            this.next_smoke_particle_time -= delta_seconds
        }      
        
        if(this.invincibility_timer > 0)
        {
            this.invincibility_timer -= delta_seconds
        }
    }

    render(canvas_rendering_context, delta_time)
    {
        if(this.invincibility_timer > 0)
        {
            this.drawable.alpha = 1 - (this.flicker + 1) / 3
        }
        else
        {
            this.drawable.alpha = 1
        }

        super.render(canvas_rendering_context, delta_time)
    }
}