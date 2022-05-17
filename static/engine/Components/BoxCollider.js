class BoxCollider extends Collider
{
    constructor(box)
    {
        super()
        this.box = box       
    }

    get_translated_collider()
    {
        let pos = this.location
        let translated_box = this.box.get_translated_box(pos, null, null)
        return translated_box
    }

    draw_collider_shape(style, width, duration)
    {
        super.draw_collider_shape(style, width, duration)

        this.debug_utils?.draw_debug_box(this.get_translated_collider(), style, width, duration)
    }

    check_collision(other_collider)
    {
        if(other_collider instanceof BoxCollider)
        {
            let my_box = this.get_translated_collider()
            let other_box = other_collider.get_translated_collider()
            return my_box.intersects(other_box)
        }
        else if(other_collider instanceof CircleCollider)
        {
            let my_box = this.get_translated_collider()
            let other_circle = other_collider.get_translated_collider()
            return other_circle.intersects_box(my_box)
        }
    }
}