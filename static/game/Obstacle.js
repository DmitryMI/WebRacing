class Obstacle extends Pawn
{
    constructor(name, location, velocity, life_box)
    {
        super(name)
        this.location = location       
        this.rotation = 0
        this.scale = Vector2D.identity()
        this.velocity = velocity
        this.life_box = life_box

        this.drawable = this.get_drawable()   
        this.add_component(this.create_collider())
    }

    static collision_width = 50

    static image_instance = null

    get_drawable()
    {
        if (Obstacle.image_instance == null)
        {
            Obstacle.image_instance = new Image()
            Obstacle.image_instance.src = 'images/Barricade.png';            
        }

        let drawable = new DrawableImage(Obstacle.image_instance, this.location, this.rotation, 50, 50, 10)
        return drawable
    }

    create_collider()
    {
        let box = new Box(-25, 25, 25, -25)
        let collider = new BoxCollider(box)
        return collider
    }

    end_play()
    {
        //console.log("Obstacle destroyed at " + this.location.x, + ", " + this.location.y)

        super.end_play()
    }

    tick(delta_seconds)
    {
        super.tick(delta_seconds)      
        
        let step = Vector2D.multf(this.velocity, delta_seconds)
        this.location = Vector2D.addv(this.location, step)

        if(!this.life_box.contains_point(this.location))
        {            
            this.destroy()
        }
    }

}