class WebRacingGameController extends GameController 
{
    constructor()
    {
        super()
        
        this.canvas = document.getElementById("scene_canvas")
        this.road_width_fraction = 0.8

        this.car = new Car(this.scene_center)

        this.road_animator = new RoadAnimator(this.canvas, this.road_width_fraction)
    }

    static get road_vertical_speed()
    {
        return 1000
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

    tick(delta_seconds)
    {
        super.tick(delta_seconds)
        
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
    }


}