class NarrowPassageGenerator extends ObstacleGenerator
{
    constructor(obstacle_type, game_controller, duration)
    {
        super(obstacle_type, game_controller)

        this.duration = duration

        this.next_wall_time = 0
    }

    get generator_name()
    {
        return "NarrowPassageGenerator"
    }

    is_exhausted()
    {
        if(super.is_exhausted())
        {
            return true
        }

        return this.duration <= 0
    }

    get_wall_spawn_distance(play_time)
    {
        let max = 800
        let min = 400
        let limit_time = 120
        let distance = (min - max) * play_time / limit_time + max
        if(distance < min)
        {
            return min
        }
        return distance
    }

    get_gate_segments_width(play_time)
    {
        let max_width = 10
        let min_width = 2
        let limit_time = 120
        let width = (min_width - max_width) * play_time / limit_time + max_width
        if(width < min_width)
        {
            return min_width
        }
        return Math.floor(width)
    }

    spawn_wall(play_time)
    {
        let wall_width_segments = Math.floor(this.game_controller.road_size.x / this.obstacle_type.collision_width)
        let gate_width = this.get_gate_segments_width(play_time)
        let gate_start_min = 0
        let gate_state_max = wall_width_segments - gate_width

        let gate_start = random_range_int(gate_start_min, gate_state_max)
        let gate_end = gate_start + gate_width

        for(let i = 0; i < wall_width_segments; i++)
        {
            if(gate_start <= i && i <= gate_end)
            {
                // Spawn gate here or left empty
            }
            else
            {
                let road_start_x = this.game_controller.road_center.x - this.game_controller.road_size.x / 2
                let spawn_start_offset = road_start_x + this.obstacle_type.collision_width / 2 + 10
                let location = new Vector2D(spawn_start_offset + i * this.obstacle_type.collision_width, -100)
                let velocity = new Vector2D(0, WebRacingGameController.road_vertical_speed)
                this.spawn_obstacle("WallObstacle" + this.obstacle_counter, location, velocity)

                this.obstacle_counter++
            }
        }
    }

    update(play_time, delta_seconds)
    {
        super.update(play_time, delta_seconds)
       
        if(this.next_wall_time <= 0)
        {
            this.spawn_wall(play_time)
            let wall_distance = this.get_wall_spawn_distance(play_time)
            this.next_wall_time = wall_distance / WebRacingGameController.road_vertical_speed
        }
        else
        {
            this.next_wall_time -= delta_seconds
        }

        this.duration -= delta_seconds
    }
}