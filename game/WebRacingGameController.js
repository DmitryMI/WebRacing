class WebRacingGameController extends GameController 
{
    constructor()
    {
        super()
        
        this.canvas = document.getElementById("scene_canvas")
        this.road_width_fraction = 0.8
        this.play_time = 0

        this.obstacle_counter = 0

        this.car = new Car(this.scene_center)
        this.road_animator = new RoadAnimator(this.canvas, this.road_width_fraction)
    }

    static get obstacle_spawn_chance_maximum()
    {
        return 10
    }

    static get obstacle_spawn_chance_slope()
    {
        return 0.01
    }

    static get_obstacle_spawn_change(time)
    {
        let max = WebRacingGameController.obstacle_spawn_chance_maximum
        let slope = WebRacingGameController.obstacle_spawn_chance_slope
        let chance = max * (1 - Math.pow(Math.E, -slope * time))
        return chance
    }

    static get road_vertical_speed()
    {
        return 600
    }

    get scene_size()
    {
        return new Vector2D(this.canvas.clientWidth, this.canvas.clientHeight)
    }

    get scene_center()
    {
        return Vector2D.divf(this.scene_size, 2)
    }

    get road_size()
    {
        let scale = new Vector2D(this.road_width_fraction, 1)
        return Vector2D.multv(this.scene_size, scale)
    }

    get road_center()
    {
        return this.scene_center
    }

    get obstacle_lifebox()
    {
        let min_x = this.road_center.x - this.road_size.x
        let max_x = this.road_center.x + this.road_size.x

        let min_y = -1000
        let max_y = this.road_size.y + 500

        return new Box(min_x, max_y, max_x, min_y)
    }

    begin_play()
    {
        super.begin_play()

        this.game_instance.spawn(this.road_animator)
        this.game_instance.spawn(this.car)
    }

    end_play()
    {
        super.end_play()
    }

    spawn_obstacle()
    {
        //if(this.obstacle_counter == 0)
        {
            let min_x = this.road_center.x - this.road_size.x / 2
            let max_x = this.road_center.x + this.road_size.x / 2
            let rand_x = random_range(min_x, max_x)
            let y = -100
            let location = new Vector2D(rand_x, y)
            let y_speed =  WebRacingGameController.road_vertical_speed
            //let y_speed = 100
            let obstacle = new Obstacle("Obstacle" + this.obstacle_counter, location, new Vector2D(0, y_speed), this.obstacle_lifebox)
            this.game_instance.spawn(obstacle)

            this.obstacle_counter++
        }
    }

    tick(delta_seconds)
    {
        super.tick(delta_seconds)

        this.play_time += delta_seconds
        
        let road_left = this.road_center.x - this.road_size.x / 2
        let road_right = this.road_center.x + this.road_size.x / 2

        if(this.car.location.x < road_left)
        {
            this.car.location.x = road_left
        }
        else if(this.car.location.x > road_right)
        {
            this.car.location.x = road_right
        }

        let chance_base = WebRacingGameController.get_obstacle_spawn_change(this.play_time)
        console.log(chance_base)
        let obstacle_spawn_chance = chance_base * delta_seconds
        let will_spawn = random_bool_weighted(obstacle_spawn_chance)
        if(will_spawn)
        {
            this.spawn_obstacle()
        }
    }


}