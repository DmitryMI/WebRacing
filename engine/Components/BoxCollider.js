class BoxCollider extends ActorComponent
{
    constructor(box)
    {
        super()
        this.box = box

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
        this.collision_stay_event_handlers.pop(handler)
    }

    add_collision_enter_event_handler(handler)
    {
        this.collision_enter_event_handlers.push(handler)
    }

    remove_collision_enter_event_handler(handler)
    {
        this.collision_leave_event_handlers.pop(handler)
    }

    add_collision_leave_event_handler(handler)
    {
        this.collision_enter_event_handlers.push(handler)
    }

    remove_collision_leave_event_handler(handler)
    {
        this.collision_leave_event_handlers.pop(handler)
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

    tick_component(delta_seconds)
    {
        super.tick_component(delta_seconds)      
    
        //this.debug_utils?.draw_debug_box(this.get_translated_collider(), '#0000ff', 2)
    }

    get_translated_collider()
    {
        let pos = this.location
        let translated_box = this.box.get_translated_box(pos, null, null)
        return translated_box
    }

    on_collision_enter(other_collider_component)
    {
        this.collision_enter_event_handlers.forEach(element => {
            element(this, other_collider_component)
        });

        if(this.debug_utils == null)
        {
            console.log("DebugUtils is null!")
        }
        else
        {
            this.debug_utils.draw_debug_box(this.get_translated_collider(), '#ff0000', 2, 0.5)
        }
    }
    
    on_collision_leave(other_collider_component)
    {
        this.collision_leave_event_handlers.forEach(element => {
            element(this, other_collider_component)
        });

        this.debug_utils?.draw_debug_box(this.get_translated_collider(), '#00ff00', 2, 0.5)
    }

    on_collision_stay(other_collider_component)
    {
        this.collision_stay_event_handlers.forEach(element => {
            element(this, other_collider_component)
        });

        this.debug_utils?.draw_debug_box(this.get_translated_collider(), '#ffff00', 2)
    }
}