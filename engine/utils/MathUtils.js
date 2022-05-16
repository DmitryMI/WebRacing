function get_shortest_angle(current, target)
{
    let a = target - current
    let b = target - current + Math.PI * 2
    let c = target - current - Math.PI * 2

    let abs_a = Math.abs(a)
    let abs_b = Math.abs(b)
    let abs_c = Math.abs(c)

    if(abs_a <= abs_b && abs_a <= abs_c)
    {
        return a
    }
    
    if(abs_b <= abs_a && abs_b <= abs_c)
    {
        return b
    }

    if(abs_c <= abs_a && abs_c <= abs_b)
    {
        return c
    }

    return 0
}

function get_shortest_rotation(current, target)
{
    return Math.sign(get_shortest_angle(current, target))
}

function unwind_angle(angle)
{
    full_rotation = 2 * Math.PI
    while(angle >= full_rotation)
    {
        angle -= full_rotation
    }

    while(angle < 0)
    {
        angle += full_rotation
    }

    return angle
}

function lerp(a, b, alpha)
{
    return a + (b - a) * alpha
}

function clamp(x, min, max)
{
    if(x > max)
    {
        return max
    }

    if(x < min)
    {
        return min
    }

    return x
}