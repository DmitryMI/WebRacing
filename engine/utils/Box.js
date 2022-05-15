class Box
{
    constructor(left, top, right, bottom)
    {
        this.left = left
        this.top = top
        this.right = right
        this.bottom = bottom
    }

    intersects(box)
    {
        let lgr = box.left >= this.right;
	    let rll = box.right <= this.left;
	    let tgb = box.top <= this.bottom;
	    let blt = box.bottom >= this.top;

	    let tmp = (lgr || rll || tgb || blt);
	    return !tmp;
    }

    contains_point(point)
    {
        let bInRangeX = this.left <= point.x && point.x < this.right;
	    let bInRangeY = this.bottom <= point.y && point.y < this.top;
	    return bInRangeX && bInRangeY;
    }

    get_translated_box(position, rotation, scale)
    {
        // TODO Rotation and Scale
        let left = this.left + position.x
        let right = this.right + position.x
        let top = this.top + position.y
        let bottom = this.bottom + position.y
        return new Box(left, top, right, bottom)
    }
}