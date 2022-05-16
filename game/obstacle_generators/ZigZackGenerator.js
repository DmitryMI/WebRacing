class ZigZackGenerator extends ObstacleGenerator
{
    constructor(obstacle_type, game_controller, duration)
    {
        super(obstacle_type, game_controller)

        this.duration = duration
        this.next_wall_time = 0
        this.next_pivot_time = 0

        this.previous_pivot_center = null
        this.next_pivot_center = null
        this.pivot_time_cached = this.get_pivot_distance(0)
    }

    get generator_name()
    {
        return "ZigZackGenerator"
    }

    is_exhausted()
    {
        if(super.is_exhausted())
        {
            return true
        }

        return this.duration <= 0
    }

    get_pivot_distance(play_time)
    {
        let max = 1200
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
        let max_width = 6
        let min_width = 3
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

        let time_to_next_pivot_normalized = 1 - this.next_pivot_time / this.pivot_time_cached
        let current_gate_center = lerp(this.previous_pivot_center, this.next_pivot_center, time_to_next_pivot_normalized)

        let gate_width = this.get_gate_segments_width(play_time)

        console.log(`Gate Width: ${gate_width}`)

        let gate_start_min = current_gate_center - (gate_width + 1) * this.obstacle_type.collision_width / 2
        let gate_state_max = current_gate_center + (gate_width + 1) * this.obstacle_type.collision_width / 2

        let road_start_x = this.game_controller.road_center.x - this.game_controller.road_size.x / 2

        let points = [gate_start_min, gate_state_max]
        
        for(let i = 0; i < points.length; i++)
        {
            let spawn_start_offset = road_start_x + this.obstacle_type.collision_width / 2
            let location = new Vector2D(spawn_start_offset + points[i], -100)
            let velocity = new Vector2D(0, WebRacingGameController.road_vertical_speed)
            this.spawn_obstacle("ZigZackObstacle" + this.obstacle_counter, location, velocity)

            this.obstacle_counter++ 
        }
    }

    update(play_time, delta_seconds)
    {
        super.update(play_time, delta_seconds)

        if(this.next_pivot_time <= 0)
        {
            let min_x = 0
            let max_x = this.game_controller.road_size.x
            
            let gate_size = this.get_gate_segments_width(play_time) * this.obstacle_type.collision_width
            min_x += gate_size
            max_x -= gate_size

            this.previous_pivot_center = this.next_pivot_center
            if(this.previous_pivot_center == null)
            {               
                this.previous_pivot_center = random_range(min_x, max_x)
            }
            this.next_pivot_center = random_range(min_x, max_x)
            this.next_pivot_time = this.get_pivot_distance(play_time) / WebRacingGameController.road_vertical_speed
            this.pivot_time_cached = this.next_pivot_time
        }
        else
        {
            this.next_pivot_time -= delta_seconds
        }
       
        if(this.next_wall_time <= 0)
        {
            this.spawn_wall(play_time)
            this.next_wall_time = this.obstacle_type.collision_width * 3 / WebRacingGameController.road_vertical_speed   
        }
        else
        {
            this.next_wall_time -= delta_seconds            
        }        

        this.duration -= delta_seconds
    }

}