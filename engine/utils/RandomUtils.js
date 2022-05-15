function random_range(min, max)
{  
    return Math.random() * (max - min) + min
}

function random_bool_weighted(chance)
{
    let val = Math.random()

    if(val < chance)
    {
        return true
    }

    return false
}