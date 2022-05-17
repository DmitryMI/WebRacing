class PoliceGenerator extends ObstacleGenerator
{
    constructor(game_controller, duration)
    {
        super(Police, game_controller)

        this.duration = duration

        this.alive_police_cars = 0
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

    get_target_alive_police_cars(play_time)
    {
        let max = 6
        let min = 2
        let limit_time = WebRacingGameController.difficulty_limit_seconds
        let count = (max - min) * play_time / limit_time + min
        if(count > max)
        {
            return max
        }
        return Math.floor(count)
    }

    spawn_police()
    {
        // No division by 2 is intentional! Police cars should spawn off-screen
        let random_unit_vector = Vector2D.random_unit_circle()        
        let location = Vector2D.multv(random_unit_vector, this.game_controller.road_size)
        location = Vector2D.multf(location, 1.5)
        let velocity = new Vector2D(0, 0)

        let police = this.spawn_obstacle("Police", location, velocity)        

        police.on_death_event_handler = (police) => {this.on_police_death(police)}

        this.alive_police_cars++
    }

    on_police_death(police)
    {
        this.alive_police_cars--
        console.log(`${police.name} died! There are ${this.alive_police_cars} police cars left`)
    }

    update(play_time, delta_seconds)
    {
        super.update(play_time, delta_seconds)

        let max_cars = this.get_target_alive_police_cars(play_time)

        let will_spawn = this.alive_police_cars < this.get_target_alive_police_cars(play_time)
        if(will_spawn)
        {
            this.spawn_police()
            console.log(`Spawned ${this.alive_police_cars}/${max_cars} police cars`)
        }

        this.duration -= delta_seconds
    }
}