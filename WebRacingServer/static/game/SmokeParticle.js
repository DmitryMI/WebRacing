class SmokeParticle extends Pawn
{
    constructor(location, velocity, rotation_velocity, life_time)
    {
        super("Smoke")
        this.location = location       
        this.rotation = 0
        this.scale = Vector2D.identity()
        this.velocity = velocity
        this.life_time_maximum = life_time
        this.rotation_velocity = rotation_velocity

        this.life_time = 0

        this.drawable = this.get_drawable()   
    }

    static image_instance = null

    get_drawable()
    {
        if (SmokeParticle.image_instance == null)
        {
            SmokeParticle.image_instance = new Image()
            SmokeParticle.image_instance.src = 'images/SmokeParticle.png';            
        }

        let drawable = new DrawableImage(SmokeParticle.image_instance, this.location, this.rotation, 25, 25, 10)
        return drawable
    }

    get_normalized_lifetime()
    {
        return this.life_time / this.life_time_maximum
    }

    get_scaled_alpha()
    {
        return lerp(0.5, 0, this.get_normalized_lifetime())
    }

    get_scaled_size()
    {
        return lerp(1, 3, this.get_normalized_lifetime())
    }

    tick(delta_seconds)
    {
        super.tick(delta_seconds)      
        
        let step = Vector2D.multf(this.velocity, delta_seconds)
        this.location = Vector2D.addv(this.location, step)

        let angle_step = this.rotation_velocity * delta_seconds
        this.rotation = this.rotation + angle_step

        this.drawable.alpha = this.get_scaled_alpha()
        let size = this.get_scaled_size()
        this.scale = new Vector2D(size, size)

        this.life_time += delta_seconds
        if(this.life_time >= this.life_time_maximum)
        {
            this.destroy()
        }
    }
}