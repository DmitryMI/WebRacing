class CollidingPair
{
    constructor(a, b)
    {
        this.a = a
        this.b = b
    }
}

class CollisionResolver
{
    constructor()
    {
        this.collision_components = []

        this.colliding_pairs = []
    }

    add_collider(collider)
    {
        this.collision_components.push(collider)
    }

    remove_collider(collider)
    {
        let component_index = this.collision_components.indexOf(collider)
        if(component_index == -1)
        {
            return
        }
        this.collision_components.splice(component_index, 1)

        let index = this.colliding_pair_index_of_any(collider)

        if(index != -1)
        {
            let pair = this.colliding_pairs[index]
            if(pair.a == collider)
            {
                pair.b.on_collision_leave(collider)
            }
            else
            {
                pair.a.on_collision_leave(collider)
            }
            this.colliding_pairs.splice(index, 1);
        }
    }

    colliding_pair_index_of_any(collider)
    {
        let num = this.colliding_pairs.length
        
        for(let i = 0; i < num; i++)
        {
            let pair = this.colliding_pairs[i]
            if(pair.a == collider || pair.b == collider)
            {
                return i
            }
        }

        return -1
    }

    colliding_pair_index_of_both(a, b)
    {
        let num = this.colliding_pairs.length
        
        for(let i = 0; i < num; i++)
        {
            let pair = this.colliding_pairs[i]
            let direct = pair.a == a && pair.b == b
            let flipped = pair.a == b && pair.b == a
            if(direct || flipped)
            {
                return i
            }
        }

        return -1
    }

    send_collision_present_events(a, b)
    {
        if(this.colliding_pair_index_of_both(a, b) == -1)
        {
            a.on_collision_enter(b)
            b.on_collision_enter(a)

            let pair = new CollidingPair(a, b)
            this.colliding_pairs.push(pair)
        }
        else
        {
            a.on_collision_stay(b)
            b.on_collision_stay(a)
        }
    }

    send_no_collision_events(a, b)
    {
        let index = this.colliding_pair_index_of_both(a, b)
        if(index != -1)
        {
            a.on_collision_leave(b)
            b.on_collision_leave(a)

            this.colliding_pairs.splice(index, 1);
        }
    }

    resolve_collisions()
    {
        let num = this.collision_components.length

        for(let i = 0; i < num; i++)
        {
            let collider = this.collision_components[i]
            for(let j = i + 1; j < num; j++)
            {
                let other_collider = this.collision_components[j]
                if(collider.check_collision(other_collider))
                {
                    this.send_collision_present_events(collider, other_collider)
                }
                else
                {
                    this.send_no_collision_events(collider, other_collider)
                }
            }
        }
    }
    
}