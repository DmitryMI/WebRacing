class Input
{
    constructor(canvas)
    {
        this.canvas = canvas
        this.mouse_position_vec = Vector2D.zero()

        canvas.onmousemove = (event) =>
        {
            event = event || window.event; // IE-ism
            
            let x = event.pageX
            let y = event.pageY

            this.mouse_position_vec.x = x
            this.mouse_position_vec.y = y
        }
    }

    update(delta_seconds)
    {

    }

    get mouse_position()
    {
        return this.mouse_position_vec
    }
}