class Obstacle extends Pawn
{
    constructor(name, location)
    {
        super(name)
        this.location = location       
        this.rotation = 0
        this.scale = Vector2D.identity()

        this.maximum_speed = 1000
        this.maximum_angular_speed = 0.05

        this.drawable = this.create_drawable()   
        this.add_component(this.create_collider())
    }
}