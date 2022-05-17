class ActorComponent
{
    constructor()
    {
        this.parent = null
    }

    get location()
    {
        if(this.parent == null)
        {
            return null
        }

        if(this.parent instanceof Pawn)
        {
            return this.parent.location
        }

        return null
    }

    get debug_utils()
    {
        if(this.parent == null)
        {
            return null
        }

        return this.parent.debug_utils
    }

    get collision_resolver()
    {
        if(this.parent == null)
        {
            return null
        }

        return this.parent.collision_resolver
    }

    attach(parent)
    {
        this.parent = parent
    }

    detach()
    {
        this.parent = null
    }

    begin_play()
    {

    }

    end_play()
    {
        
    }

    tick_component(delta_seconds)
    {

    }
}