class BoucingPawn extends Pawn
{
    constructor(location, image)
    {
        super("BouncingPawn", location, 0, Vector2D.identity(), image)

        //this.velocity = Vector2D.mult_float(Vector2D.random_unit(), 1000)
        this.velocity = Vector2D.zero()
    }

    begin_play()
    {
        super.begin_play()
    }
    
    tick(delta_seconds)
    {
        super.tick(delta_seconds)
        
        let step = Vector2D.multf(this.velocity, delta_seconds)
        this.location = Vector2D.addv(this.location, step)

        let scene_size = this.game_instance.scene_size
        //let scene_center_x = scene_size.x / 2
        //let scene_center_y = scene_size.y / 2
        let input = this.game_instance.input
        let mouse_pos = input.mouse_position
        let attraction_center = mouse_pos
        let x = this.location.x
        let y = this.location.y
        if(x <= 0 || x >= scene_size.x)
        {
            if (x < 0)
            {
                this.location.x = 0
            }
            else if(x > scene_size.x)
            {
                this.location.x = scene_size.x
            }
            //this.velocity.x = -this.velocity.x
            //let rnd_angle = Math.random() * Math.PI / 4
            //this.velocity.rotate(rnd_angle)
        }
        else if (y <= 0 || y > scene_size.y)
        {
            if (y < 0)
            {
                this.location.y = 0
            }
            else if(y > scene_size.y)
            {
                this.location.y = scene_size.y
            }

            //this.velocity.y = -this.velocity.y
            //let rnd_angle = Math.random() * Math.PI / 4
            //this.velocity.rotate(rnd_angle)
        }
        
        let vector_to_center = Vector2D.subv(attraction_center, this.location)
        //vector_to_center.normalize()
        vector_to_center = Vector2D.multf(vector_to_center, 0.1)
        this.velocity = Vector2D.addv(this.velocity, vector_to_center)

        this.velocity = Vector2D.multf(this.velocity, 0.99)
    }
}