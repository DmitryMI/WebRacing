function draw_shape(ctx, points, style, width)
{
    ctx.beginPath();
    let num = points.length
    for(let i = 0; i < num - 1; i++)
    {
        ctx.moveTo(points[i].x, points[i].y);
        ctx.lineTo(points[i + 1].x, points[i + 1].y);
    }
            
    if(num != 2)
    {
        ctx.moveTo(points[num - 1].x, points[num - 1].y);
        ctx.lineTo(points[0].x, points[0].y);
    }
    ctx.lineWidth = width;
    ctx.strokeStyle = style;
    ctx.stroke(); 
}

function draw_circle(ctx, center, radius, style, width)
{
    ctx.beginPath();
    
    ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);

    ctx.lineWidth = width;
    ctx.strokeStyle = style;

    ctx.stroke(); 
}