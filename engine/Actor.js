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

    get debug_utils()
    {
        if(this.game_instance == null)
        {
            return null
        }

        return this.game_instance.debug_utils
    }

    get collision_resolver()
    {
        if(this.game_instance == null)
        {
            return null
        }

        return this.game_instance.collision_resolver
    }

    add_component(component)
    {
        component.attach(this)
        this.components.push(component)
    }

    remove_component(component)
    {        
        let index = this.components.indexOf(component)
        if(index != -1)
        {
            component.detach()
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
        this.components.forEach(element => {
            element.begin_play()
        });
    }

    end_play()
    {
        this.components.forEach(element => {
            element.end_play()
        });
    }

    tick(delta_seconds)
    {
        this.components.forEach(element => {
            element.tick_component(delta_seconds)
        });
    }

    destroy()
    {
        if(this.game_instance != null)
        {
            this.game_instance.destroy_actor(this)
        }
    }
}