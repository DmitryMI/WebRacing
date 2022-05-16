class RandomObstacleGenerator extends ObstacleGenerator
{
    constructor(obstacle_type, game_controller, duration)
    {
        super(obstacle_type, game_controller)

        this.duration = duration
    }

    get generator_name()
    {
        return "RandomObstacleGenerator"
    }

    is_exhausted()
    {
        if(super.is_exhausted())
        {
            return true
        }

        return this.duration <= 0
    }

    get obstacle_spawn_chance_maximum()
    {
        return 10
    }

    get obstacle_spawn_chance_slope()
    {
        return 0.01
    }

    get_obstacle_spawn_chance(time)
    {
        let max = this.obstacle_spawn_chance_maximum
        let slope = this.obstacle_spawn_chance_slope
        let chance = max * (1 - Math.pow(Math.E, -slope * time))
        return chance
    }

    spawn_random_obstacle()
    {
        let min_x = this.game_controller.road_center.x -this.game_controller.road_size.x / 2
        let max_x = this.game_controller.road_center.x + this.game_controller.road_size.x / 2
        let rand_x = random_range(min_x, max_x)
        let y = -100
        let location = new Vector2D(rand_x, y)
        let y_speed =  WebRacingGameController.road_vertical_speed
        let velocity = new Vector2D(0, y_speed)

        this.spawn_obstacle("RandomObstacle" + this.obstacle_counter, location, velocity)
    }

    update(play_time, delta_seconds)
    {
        super.update(play_time, delta_seconds)

        let chance_base = this.get_obstacle_spawn_chance(play_time)
        //console.log(chance_base)
        let obstacle_spawn_chance = chance_base * delta_seconds
        let will_spawn = random_bool_weighted(obstacle_spawn_chance)
        if(will_spawn)
        {
            this.spawn_random_obstacle()
        }

        this.duration -= delta_seconds
    }
}