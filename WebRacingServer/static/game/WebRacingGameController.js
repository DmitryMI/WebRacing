class WebRacingGameController extends GameController 
{
    constructor()
    {
        super()
        
        this.canvas = document.getElementById("scene_canvas")
        this.score_element = document.getElementById("score")
        this.health_element = document.getElementById("health")
        this.road_width_fraction = 0.8
        this.play_time = 0

        this.obstacle_counter = 0

        this.car = new Car(this.scene_center)
        this.road_animator = new RoadAnimator(this.canvas, this.road_width_fraction)

        this.obstacle_generators = [
            new RandomObstacleGenerator(Obstacle, this, 0),
            new NarrowPassageGenerator(Obstacle, this, 0),
            new ZigZackGenerator(Obstacle, this, 0),
            new PoliceGenerator(this, 0)
        ]

        this.current_obstacle_generator = null
    }    

    static get difficulty_limit_seconds()
    {
        return 300
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
        let min_x = this.road_center.x - this.road_size.x * 2
        let max_x = this.road_center.x + this.road_size.x * 2

        let min_y = -1000
        let max_y = this.road_size.y + 1000

        return new Box(min_x, max_y, max_x, min_y)
    }

    update_score()
    {
        let score = Math.floor(this.play_time * 10)
        this.score_element.innerHTML = score
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

    update_obstacle_generators(delta_seconds)
    {
        if(this.current_obstacle_generator == null || this.current_obstacle_generator.is_exhausted())
        {
            this.current_obstacle_generator = random_item(this.obstacle_generators)
            this.current_obstacle_generator.duration = random_range(5, 20)

            console.log(`Obstacle Generator ${this.current_obstacle_generator.generator_name} spawned for ${this.current_obstacle_generator.duration} seconds`)
        }

        this.current_obstacle_generator.update(this.play_time, delta_seconds)
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

        this.update_obstacle_generators(delta_seconds)

        this.update_score()
    }

    report_car_collision(other_collider)
    {
        //console.log("Collision with " + other_collider.parent.name)
        let health = this.car.health
        this.health_element.innerHTML = health.toFixed(1)
        if(health <= 0)
        {
            // TODO Game Over
            this.game_instance.stop_tick()
        }
    }

}