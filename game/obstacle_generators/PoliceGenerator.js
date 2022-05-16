class PoliceGenerator extends ObstacleGenerator
{
    constructor(game_controller, duration)
    {
        super(Police, game_controller)

        this.duration = duration
    }

    get generator_name()
    {
        return "PoliceGenerator"
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
        return 5
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

    spawn_police()
    {
        // No division by 2 is intentional! Police cars should spawn off-screen
        let random_unit_vector = Vector2D.random_unit_circle()        
        let location = Vector2D.multv(random_unit_vector, this.game_controller.road_size)
        location = Vector2D.multf(location, 2)
        let velocity = new Vector2D(0, 0)

        this.spawn_obstacle("Police", location, velocity)
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
            this.spawn_police()
        }

        this.duration -= delta_seconds
    }
}