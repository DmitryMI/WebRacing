function array_remove(arr, item)
{
    let index = arr.indexOf(item)
    if(index == -1)
    {
        return
    }

    arr.splice(index, 1)
}