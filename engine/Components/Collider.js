class Collider extends ActorComponent
{
    constructor()
    {
        super()

        this.collision_enter_event_handlers = []
        this.collision_leave_event_handlers = []
        this.collision_stay_event_handlers = []
    }

    add_collision_stay_event_handler(handler)
    {
        this.collision_stay_event_handlers.push(handler)
    }

    remove_collision_stay_event_handle(handler)
    {
        array_remove(this.collision_stay_event_handlers, handler)
    }

    add_collision_enter_event_handler(handler)
    {
        this.collision_enter_event_handlers.push(handler)
    }

    remove_collision_enter_event_handler(handler)
    {
        array_remove(this.collision_leave_event_handlers, handler)
    }

    add_collision_leave_event_handler(handler)
    {
        this.collision_enter_event_handlers.push(handler)
    }

    remove_collision_leave_event_handler(handler)
    {
        array_remove(this.collision_leave_event_handlers, handler)
    }

    begin_play()
    {
        super.begin_play()

        this.collision_resolver.add_collider(this)
    }

    end_play()
    {
        super.end_play()        

        this.collision_resolver.remove_collider(this)
    }

    draw_collider_shape(style, width, duration)
    {

    }   

    tick_component(delta_seconds)
    {
        super.tick_component(delta_seconds)      
    
        this.draw_collider_shape('#0000ff', 2, -1)
    }    

    on_collision_enter(other_collider_component)
    {
        this.collision_enter_event_handlers.forEach(element => {
            element(other_collider_component)
        });
        
        this.draw_collider_shape('#ff0000', 2, 0.5)
    }
    
    on_collision_leave(other_collider_component)
    {
        this.collision_leave_event_handlers.forEach(element => {
            element(this, other_collider_component)
        });

        this.draw_collider_shape('#00ff00', 2, 0.5)        
    }

    on_collision_stay(other_collider_component)
    {
        this.collision_stay_event_handlers.forEach(element => {
            element(this, other_collider_component)
        });

        this.draw_collider_shape('#ffff00', 2, -1)  
    }
}