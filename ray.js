let ray = false
let ang
let width = 1
let height = 70
function handleRay() {
    console.log("ray")
    ctx.save()
    ctx.translate(arrayOfBalls[0].x + 7.5, arrayOfBalls[0].y + 7.5)
    ctx.rotate(ang)
    ctx.fillStyle = 'white'
    ctx.fillRect(-width, -height, width, height)
    ctx.restore()
    //fire()
}

function move(e) {
    ang = Math.atan2(e.offsetX - (arrayOfBalls[0].x),
        -(e.offsetY - (arrayOfBalls[0].y)))
    //console.log
}

