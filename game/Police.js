class Police extends Pawn
{
    constructor(name, location, velocity, life_box)
    {
        super(name)
        this.location = location       
        this.rotation = 3 * Math.PI / 2
        this.scale = Vector2D.identity()

        this.maximum_speed = 400
        this.maximum_angular_speed = 0.05

        this.drawable = this.create_drawable()   
        this.collider = this.create_collider_circle()
        this.collider.add_collision_enter_event_handler((other_collider)=>this.on_collision_enter(other_collider))
        this.add_component(this.collider)

        this.smoke_spawn_period = 0.01

        this.next_smoke_particle_time = this.smoke_spawn_period

        this.life_box = life_box

        this.is_alive = true
    }

    static image_instance = null

    create_drawable()
    {
        if (Police.image_instance == null)
        {
            Police.image_instance = new Image()
            Police.image_instance.src = 'images/Police.png';            
        }

        let drawable = new DrawableImage(Police.image_instance, this.location, this.rotation, 100, 50, 20)
        drawable.set_image_default_rotation(Math.PI)
        return drawable
    }

    create_collider_circle()
    {
        let circle = new Circle(Vector2D.zero(), 25)
        let collider = new CircleCollider(circle)
        return collider
    }

    follow_player(delta_seconds)
    {
        let player_car = this.game_controller.car
        let player_car_location = player_car.location

        let x_diff = player_car_location.x - this.location.x
        let y_diff = player_car_location.y - this.location.y

        let to_player_direction = new Vector2D(x_diff, y_diff)
        to_player_direction.normalize()

        let face_target_x = to_player_direction.x * this.maximum_speed
        let face_target_y = to_player_direction.y * this.maximum_speed - WebRacingGameController.road_vertical_speed
       
        //let face_target_x = this.location.x
        let face_target = new Vector2D(face_target_x, face_target_y)

        //this.debug_utils.draw_debug_line(this.location, Vector2D.addv(this.location, face_target), "#ff0000", 2)

        let police_player = Vector2D.subv(player_car_location, this.location)
        let direction_length = police_player.length
        let direction= Vector2D.divf(police_player, direction_length)
        
        let target_rotation = 0      

        if(direction_length > 0.01)
        {                   
            target_rotation = unwind_angle(face_target.rotation_angle)

            let step = this.maximum_speed * delta_seconds
            if (step > direction_length)
            {
                step = direction_length
            }

            let translation = Vector2D.multf(direction, step)
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
        this.is_alive = false
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

    tick(delta_seconds)
    {
        super.tick(delta_seconds)        

        if(this.is_alive)
        {            
            this.follow_player(delta_seconds)
            if(this.next_smoke_particle_time <= 0)
            {
                this.spawn_smoke()
                this.next_smoke_particle_time = this.smoke_spawn_period
            }
            else
            {
                this.next_smoke_particle_time -= delta_seconds
            } 
        }       
        else
        {
            let step = WebRacingGameController.road_vertical_speed * delta_seconds
            let translation = Vector2D.multf(new Vector2D(0, 1), step)
            this.location = Vector2D.addv(this.location, translation)
        }

        if(!this.life_box.contains_point(this.location))
        {            
            console.log(this.name + " entered kill zone")
            this.destroy()
        }
    }

    render(canvas_rendering_context, delta_time)
    {
        super.render(canvas_rendering_context, delta_time)
    }
}