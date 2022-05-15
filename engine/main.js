let canvas = document.getElementById("scene_canvas")

let gameInstance = new GameInstance(0.01, canvas)

gameInstance.start_tick()

function create_bouncing_pawn()
{
    let img = new Image();
    img.src = 'https://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png';
    let drawable = new DrawableImage(img)

    let box = new Box(-100, 100, 100, -100)
    let collider = new BoxCollider(box)

    let pos = new Vector2D(canvas.clientWidth / 2, canvas.clientHeight / 2)
    let pawn = new BoucingPawn(pos, drawable)
    pawn.add_component(collider)

    return pawn
}

function create_obstacle_pawn(pos)
{
    let points = [new Vector2D(-25, 0), new Vector2D(0, 50), new Vector2D(25, 0)]
    let drawable = new DrawableShape(points, "#000000", 2)
    let box = new Box(-25, 50, 25, 0)
    let collider = new BoxCollider(box)
   
    let pawn = new Pawn("Obstacle", pos, 0, Vector2D.identity(), drawable)
    pawn.add_component(collider)

    return pawn
}

let bouncing_pawn = create_bouncing_pawn()
gameInstance.spawn(bouncing_pawn)

for(let i = 0; i < 10; i++)
{
    let obstacle = create_obstacle_pawn(Vector2D.random_box(0, 1024, 1024, 0))
    gameInstance.spawn(obstacle)
}


