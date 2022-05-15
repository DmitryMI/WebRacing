class WebRacingGameController extends GameController 
{
    constructor()
    {
        super()
        
        this.canvas = document.getElementById("scene_canvas")

        this.car = new Car(this.scene_center)

        
    }

    get scene_size()
    {
        return new Vector2D(this.canvas.clientWidth, this.canvas.clientHeight)
    }

    get scene_center()
    {
        return Vector2D.divf(this.scene_size, 2)
    }

    begin_play()
    {
        super.begin_play()

        this.game_instance.spawn(this.car)
    }

    end_play()
    {
        super.end_play()
    }

    tick(delta_seconds)
    {
        super.tick(delta_seconds)
    }


}