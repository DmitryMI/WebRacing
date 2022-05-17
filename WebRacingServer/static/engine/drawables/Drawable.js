class Drawable
{
    constructor(sorting_priority = 0)
    {
        this._sorting_priority = sorting_priority
    }

    get sorting_priority()
    {
        return this._sorting_priority
    }

    set sorting_priority(value)
    {
        this._sorting_priority = value
    }

    render(ctx)
    {

    }
}