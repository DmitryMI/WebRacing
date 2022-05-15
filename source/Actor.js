class Actor
{
    constructor(name)
    {
        this.name = name
        this.game_instance_ref = null
        this.components = []
    }

    set game_instance(value)
    {
        this.game_instance_ref = value
    }

    get game_instance()
    {
        return this.game_instance_ref
    }

    add_component(component)
    {
        component.parent = this
        this.components.push(component)
    }

    remove_component(component)
    {
        component.parent = null
        let index = this.components.indexOf(component)
        if(index != -1)
        {
            this.components.splice(index, 1)
        }
    }

    get_component_of_type(type)
    {
        this.components.forEach(element => {
            if(element instanceof type)
            {
                return element
            }
        });
        return null
    }

    get_components_of_type(type)
    {
        result = []
        this.components.forEach(element => {
            if(element instanceof type)
            {
                result.push(element)
            }
        });
        return result
    }

    begin_play()
    {

    }

    end_play()
    {

    }

    tick(delta_seconds)
    {

    }

    destroy()
    {
        if(this.game_instance != null)
        {
            this.game_instance.destroy_actor(this)
        }
    }
}