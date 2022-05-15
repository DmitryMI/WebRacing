class Drawable
{
    constructor(sorting_priority = 0)
    {
        this._sorting_priority = sorting_priority
    }

    get sorting_priority()
    {
        return this.sorting_priority
    }

    set sorting_priority(value)
    {
        this.sorting_priority = value
    }

    render(ctx)
    {

    }
}