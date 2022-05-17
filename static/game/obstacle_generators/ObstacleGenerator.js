class ObstacleGenerator
{
    constructor(obstacle_type, game_controller)
    {
        this.obstacle_type = obstacle_type
        this.obstacle_counter = 0
        this.game_controller = game_controller
    }

    get generator_name()
    {
        return "ObstacleGenerator"
    }

    is_exhausted()
    {

    }

    spawn_obstacle(name, location, velocity)
    {
        let obstacle = new this.obstacle_type(name + this.obstacle_counter, location, velocity, this.game_controller.obstacle_lifebox)
        this.game_controller.game_instance.spawn(obstacle)

        this.obstacle_counter++
        return obstacle
    }

    update(play_time, delta_seconds)
    {

    }

}