class CircleCollider extends Collider
{
    constructor(circle)
    {
        super()

        this.circle = circle
    }

    get_translated_collider()
    {
        let pos = this.location
        let translated_circle = this.circle.get_translated_circle(pos, null, null)
        return translated_circle
    }

    draw_collider_shape(style, width, duration)
    {
        super.draw_collider_shape(style, width, duration)

        let circle = this.get_translated_collider()

        this.debug_utils?.draw_debug_circle(circle.center, circle.radius, style, width, duration)
    }

    check_collision(other_collider)
    {
        if(other_collider instanceof BoxCollider)
        {
            let my_circle = this.get_translated_collider()
            let other_box = other_collider.get_translated_collider()
            return my_circle.intersects_box(other_box)
        }
        else if(other_collider instanceof CircleCollider)
        {
            let my_circle = this.get_translated_collider()
            let other_circle = other_collider.get_translated_collider()
            return my_circle.intersects_circle(other_circle)
        }

        return false
    }
}