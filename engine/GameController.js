class GameController extends Actor
{
    constructor(name)
    {
        super(name)
        this.name = name
        this.game_instance_ref = null
        this.components = []
    }

    begin_play()
    {
        super.begin_play()
    }

    end_play()
    {
        super.end_play()
    }

    tick(delta_seconds)
    {
        super.tick(delta_seconds)
    }

    destroy()
    {
        super.destroy()
    }
}