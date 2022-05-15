let canvas = document.getElementById("scene_canvas")

let gameInstance = new GameInstance(0.01, canvas)

gameInstance.start_tick()

let img = new Image();
img.src = 'https://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png';
let drawable = new DrawableImage(img)
let pos = new Vector2D(canvas.clientWidth / 2, canvas.clientHeight / 2)
let pawn = new BoucingPawn(pos, drawable)
gameInstance.spawn(pawn)
