let canvas, ctx

let SCORE = 0
let LIVES = 3
    //let particlesArray = []

let arrayOfIndexesForSorting = []
let arrayOfIndexes = []

let mouseX
let mouseY

let displayTitle = true
let ballHeld = true

//let ballStickHeld = false

let lastFire = Date.now()

let highScore = sessionStorage.getItem('gameHighScore') || 0

function resetHighScore() {
    SCORE = 0
    numberOfLevel = -1
    highScore = sessionStorage.getItem('gameHighScore') || 0
}

function checkHighScore() {
    // console.log(`numberOfLevel: ${numberOfLevel}`)
    // console.log(`gameHighScore ${sessionStorage.getItem('gameHighScore')}`)
    if (SCORE > sessionStorage.getItem('gameHighScore')) {
        sessionStorage.setItem('gameHighScore', SCORE)
        highScore = SCORE
    }
}
/*let canvasPosition = canvas.getBoundingClientRect()

const mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    click: false
}
*/
function handleDisplayTitle() {
    displayTitle = false
        //brickReset()
}

function updateMousePos(evt) {
    let rect = canvas.getBoundingClientRect()
    let root = document.documentElement

    mouseX = evt.clientX
    mouseY = evt.clientY

    paddleX = mouseX - PADDLE_WIDTH / 2


    // arrayOfBalls[0].x = mouseX
    // arrayOfBalls[0].y = mouseY
    // arrayOfBalls[0].xSpeed = 8
    // arrayOfBalls[0].ySpeed = -8
    //what is happening???

}

function resetGame() {
    if (LIVES === 1) {
        resetHighScore()
    }
    numberOfLevel++
    brickReset()

    arrayOfIndexes.splice(0)
    arrayOfIndexesForSorting.splice(0)

    counterBullets = 0
    cannon = false
    stickyBall = false
    fireBall = false
    quantityOfBalls = 1
    displayTitle = true
    ballHeld = true

    arrayOfBalls.splice(0)
    powerUpArray.splice(0)
    arrayOfBullets.splice(0)
    arrayOfBalls[0] = new Ball(500, 500, 6, 8, 0)
        //ballReset()
}

function handleBallHeld() {
    ballHeld = false
    for (let i = 0; i < arrayOfBalls.length; i++) {
        if (arrayOfBalls[i] != undefined && arrayOfBalls[i].isBallTouchPaddle) {
            arrayOfBalls[i].isBallTouchPaddle = false
        }
    }
}

window.onload = function() {
    canvas = document.getElementById('gameCanvas')
    ctx = canvas.getContext('2d')
    let framesPerSecond = 30
    setInterval(updateAll, 1000 / framesPerSecond)
        //handleArrayOfParticles()
    canvas.addEventListener('mousemove', updateMousePos)
    canvas.addEventListener('mousedown', handleDisplayTitle)
    canvas.addEventListener('mouseup', handleBallHeld)
    window.addEventListener('keyup', function(e) {

        /*
        if (e.code === "Digit1") {
            stickyBall = true
        }
        if (e.code === "Digit2") {
            cannon = true
        }
        if (e.code === "Digit3") {
            quantityOfBalls = 3
            for (let i = 1; i < quantityOfBalls; i++) {
                let balls = new Ball(arrayOfBalls[0].x + i * 20, arrayOfBalls[0].y, 6, -8, i)
                arrayOfBalls.push(balls)
            }
        }
        setTimeout(function () {
            for (let i = 0; i < arrayOfBalls.length; i++) {
                if (arrayOfBalls[i] != undefined && arrayOfBalls[i].isBallTouchPaddle) {
                    arrayOfBalls[i].isBallTouchPaddle = false
                }
            }
            ballHeld = false
            stickyBall = false
            cannon = false
        }, 10000) 
        */

    })

    resetGame()
}

function rowColToArrayIndex(col, row) {
    return col + BRICK_COLS * row
}

function isBrickAtColRow(col, row) {
    if (col >= 0 && col < BRICK_COLS &&
        row >= 0 && row < BRICK_ROWS) {
        let bringIndexUnderCord = rowColToArrayIndex(col, row)
        return brickGrid[bringIndexUnderCord]
    } else {
        return false
    }
}

function updateAll() {
    checkHighScore()
    console.log(`hightScore: ${highScore}`)
    console.log(`score: ${SCORE}`)
    if (numberOfLevel === levels.length) {
        resetHighScore()
    }
    checkCannon()
    if (!displayTitle) {
        moveAll()
        drawAll()
        checkBricksLeft()
        for (let i = 0; i < arrayOfBullets.length; i++) {
            arrayOfBullets[i].checkCollisionWithBlocks()
            if (arrayOfBullets[i] != undefined) {
                arrayOfBullets[i].move()
                arrayOfBullets[i].draw()
            }
        }
        return
    } else {
        handleBackground()
        if (numberOfLevel === 0) {
            colorText("CLICK TO PLAY", canvas.width / 2, canvas.height / 2, 'white')
                //colorText("SCORE: " + SCORE, 20, 20, 'white')
        } else {
            colorText("TO NEXT LEVEL", canvas.width / 2, canvas.height / 2, 'white')
        }
    }
}


/*class Particle {
    constructor() {
        this.x
        this.y
        this.size = Math.random() * 7 + 3
        this.speedY = (Math.random() * 1) - 0.5
        this.color = 'hsla(' + hue + ', 100%, 50%, 0.8)'
    }
    setXY(x, y) {
        this.x = x
        this.y = y
    }
    update() {
        this.y += this.speedY
    }
    draw() {

        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
    }
}

function handleArrayOfParticles() {
    for (let i = 0; i < 10; i++) {
        particlesArray.unshift(new Particle())
    }
}

function handleParticles(x, y) {
    for (i = 0; i < particlesArray.length; i++) {
        particlesArray[i].setXY(x, y)
    }
    for (let y = 0; y < 10; y++) {
        for (i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update()
            particlesArray[i].draw()
        }
    }

}*/