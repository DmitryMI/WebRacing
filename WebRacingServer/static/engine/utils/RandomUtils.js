function random_range(min, max)
{  
    return Math.random() * (max - min) + min
}

function random_range_int(min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
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

function random_item(arr)
{
    let num = arr.length - 1
    let rand = random_range_int(0, num)
    return arr[rand]
}