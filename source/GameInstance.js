
// GameInstance manages lifecycle of the game: initialization of scene, ticking, etc.
class GameInstance
{
    constructor(frame_delta_time, canvas)
    {
        this.timer_interval = frame_delta_time
        this.time = 0
        this.delta_time = frame_delta_time
        this.canvas = canvas
        this.canvas_rendering_context = canvas.getContext('2d');

        this.actors = []
        this.input_ref = new Input(canvas)

        this.timer_id = null
    }

    get input()
    {
        return this.input_ref
    }

    get scene_size()
    {
        return new Vector2D(this.canvas.clientWidth, this.canvas.clientHeight)
    }

    start_tick()
    {
        this.timer_id = setInterval(
            ()=> {
                this.game_loop_outer()
            },
            this.frame_delta_time * 1000)
    }

    stop_tick()
    {
        clearInterval(this.timer_id)
    }

    spawn(actor)
    {
        actor.game_instance = this
        this.actors.push(actor)
        actor.begin_play()
    }

    destroy_actor(actor)
    {
        actor.end_play()
        actor.game_instance = null
        this.actors.pop(actor)
    }

    update(){
        this.game_loop_outer()
    }  

    game_loop(delta_time){
        this.input_ref.update(delta_time)
        this.tick_actors(delta_time)
        this.render_pawns(delta_time)
    }

    render_pawns(delta_time){
        this.canvas_rendering_context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.actors.forEach(element => {
            if(element instanceof Pawn)
            {
                element.render(this.canvas_rendering_context, delta_time)
            }
        });
    }

    tick_actors(delta_time){
        this.actors.forEach(element => {
            element.tick(delta_time)
        });
    }

    game_loop_outer(){
        let currentTime = performance.now() / 1000
        
        this.delta_time = currentTime - this.time

        this.game_loop(this.delta_time)
        //console.log(this.delta_time)        

        this.time = currentTime
    }
}