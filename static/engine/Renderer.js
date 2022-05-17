class Renderer
{
    constructor()
    {
        this.rendering_queue = []
    }

    enqueue(drawable)
    {
        if(this.rendering_queue.length == 0)
        {
            this.rendering_queue.push(drawable)
            return
        }

        for(let i = 0; i < this.rendering_queue.length; i++)
        {
            if(this.rendering_queue[i].sorting_priority > drawable.sorting_priority)
            {
                this.rendering_queue.splice(i, 0, drawable);
                break
            }

            if(i == this.rendering_queue.length - 1)
            {
                this.rendering_queue.push(drawable)
                break
            }
        }
    }

    render(ctx)
    {
        this.rendering_queue.forEach(element => {
            element.render(ctx)
        });

        // TODO Is there a better way to clear an array?
        this.rendering_queue.splice(0, this.rendering_queue.length)
    }
}