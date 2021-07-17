let quantityOfBalls = 1
let arrayOfBalls = []
let fireBall = false
let cannon = false
let stickyBall = false
let radius = 7.5
LIVES
class Ball {
    constructor(x, y, xSpeed, ySpeed, numberOfBall) {
        // каждому мячу ставить метку и по метке удалять его из массива
        this.counterOfStickyBall = 0
        this.numberOfBall = numberOfBall
        this.isBallTouchPaddle = false
        this.ang
        this.LastX
        this.x = x
        this.y = y
        this.xSpeed = xSpeed
        this.ySpeed = ySpeed
        this.image
    }
    draw() {
        //drawBitmapCenteredWithRotation(this.image, this.x, this.y, this.ang)
        ctx.drawImage(this.image, this.x - radius, this.y - radius, 15, 15)
    }
    move2() {

        // ray = false
        this.x += this.xSpeed
        this.y += this.ySpeed
        if (this.x < 0 && this.xSpeed < 0.0) {
            this.xSpeed *= -1
        }
        if (this.x > canvas.width - 10 && this.xSpeed > 0.0) {
            this.xSpeed *= -1
        }
        if (this.y < 0 && this.ySpeed < 0.0) {
            this.ySpeed *= -1
        }

        if (this.y > canvas.height) {

            if (quantityOfBalls > 1) {

                delete arrayOfBalls[this.numberOfBall]
                    /*
                    if (arrayOfBalls[this.numberOfBall] != undefined) {
                        alert("length: " + arrayOfBalls.length +
                            " ballX1: " + arrayOfBalls[0].x +
                            " ballY1: " + arrayOfBalls[0].y +
                            " ballX2: " + arrayOfBalls[1].x +
                            " ballY2: " + arrayOfBalls[1].y +
                            " ballX3: " + arrayOfBalls[2].x +
                            " ballY3: " + arrayOfBalls[2].y)
                    } else { alert("all") }
                    */
                quantityOfBalls--

            } else {
                ballHeld = true
                if (LIVES === 1) {
                    resetGame()

                } else {
                    powerUpArray.splice(0)
                    this.counterOfStickyBall = 2
                    LIVES--
                }
            } //alert("quantity: " + quantityOfBalls + "length: " + arrayOfBalls.length)
        }

    }
    move() {

        /*
        if (ballStickHeld) {
            thisLast.x = paddleX + (paddleX + PADDLE_WIDTH - this.x)
            this.x = paddleX + (paddleX + PADDLE_WIDTH - thisLast.x)
            alert(this.x)
            this.y = canvas.height - PADDLE_DIST_FROM_EDGE - 15
        }
        */

        /*
        пробел ----> stickyBall = true -----> при касании paddle ballHeld = true ----> 
        this.x = paddleX + PADDLE_WIDTH - 40
        this.y = canvas.height - PADDLE_DIST_FROM_EDGE  ( move() не работает) -----> 
        clickUp ---> ballHeld = false, метод move() запускается
        
        мяч ниже дна ----> ballHeld = true ----> 
        */

        if (ballHeld) {
            //ray = true
            if (!stickyBall) {
                this.x = paddleX + PADDLE_WIDTH - 40
                this.y = canvas.height - PADDLE_DIST_FROM_EDGE - radius
            } else {
                if (this.isBallTouchPaddle) {
                    if (this.counterOfStickyBall === 0) {
                        this.LastX = this.x - paddleX
                        this.y = canvas.height - PADDLE_DIST_FROM_EDGE - radius
                        this.counterOfStickyBall++
                    } else if (this.counterOfStickyBall === 1) {
                        this.x = paddleX + this.LastX
                        this.y = canvas.height - PADDLE_DIST_FROM_EDGE - radius
                    } else if (this.counterOfStickyBall === 2) {
                        this.x = paddleX + PADDLE_WIDTH - 40
                        this.y = canvas.height - PADDLE_DIST_FROM_EDGE - radius
                        this.counterOfStickyBall = 0
                        this.ySpeed *= -1
                    }
                } else this.move2()
                    /*
                         const dx = this.x - mouse.x    const dy = this.y - mouse.y   let theta = Math.atan2(dy, dx)   this.angle = theta
                     */
            }
        } else this.move2()
    }
    ballCheckImage() {
        if (!fireBall) {
            this.image = ballImage
        } else {
            this.image = ballImage2
        }
    }
    ballPaddleHandling() {
        let paddleTopEdgeY = canvas.height - PADDLE_DIST_FROM_EDGE
        let paddleBottomEdgeY = paddleTopEdgeY + PADDLE_THICKNESS
        let paddleLeftEdgeX = paddleX
        let paddleRightEdgeX = paddleLeftEdgeX + PADDLE_WIDTH
        if (this.y > paddleTopEdgeY &&
            this.y < paddleBottomEdgeY &&
            this.x > paddleLeftEdgeX &&
            this.x < paddleRightEdgeX) {

            if (stickyBall) {
                this.isBallTouchPaddle = true
                this.counterOfStickyBall = 0
                ballHeld = true
                this.ySpeed *= -1
                console.log("numberOfBall: " + this.numberOfBall + "  isballtouch:  " + this.isBallTouchPaddle)
            } else {
                this.ySpeed *= -1
            }

            //console.log("ballHeld: " + ballHeld)




            let centerOfPaddleX = paddleX + PADDLE_WIDTH / 2
            let ballDistFromPaddleCenterX = this.x - centerOfPaddleX
            this.xSpeed = ballDistFromPaddleCenterX * 0.25
        }
    }
    ballBrickHandling() {
        let ballBrickCol = Math.floor(this.x / BRICK_W)
        let ballBrickRow = Math.floor(this.y / BRICK_H)
        let bringIndexUnderBall = rowColToArrayIndex(ballBrickCol, ballBrickRow)
        if (ballBrickCol >= 0 && ballBrickCol < BRICK_COLS &&
            ballBrickRow >= 0 && ballBrickRow < BRICK_ROWS) {
            if (isBrickAtColRow(ballBrickCol, ballBrickRow)) {
                if (brickGrid[bringIndexUnderBall] !== 5) {
                    brickGrid[bringIndexUnderBall]--
                        if (brickGrid[bringIndexUnderBall] == 0) {
                            bricksLeft--

                            SCORE += 100
                                //console.log(bricksLeft)
                        } else
                    if (brickGrid[bringIndexUnderBall] == 2) {
                        bricksLeft--

                        SCORE += 200
                        brickGrid[bringIndexUnderBall] = 0
                    } else if (brickGrid[bringIndexUnderBall] == 6) {

                        powerUpArray.push(new PowerUp(this.x, this.y, "threeBalls", powerUpImage1))
                            //alert(powerUpArray[0].name)

                        bricksLeft--

                        SCORE += 100
                        brickGrid[bringIndexUnderBall] = 0
                    } else if (brickGrid[bringIndexUnderBall] == 8) {

                        powerUpArray.push(new PowerUp(this.x, this.y, "fireBall", powerUpImage2))
                            //alert(powerUpArray[0].name)
                        bricksLeft--
                        SCORE += 100
                        brickGrid[bringIndexUnderBall] = 0

                    } else if (brickGrid[bringIndexUnderBall] == 10) {

                        powerUpArray.push(new PowerUp(this.x, this.y, "cannon", powerUpImage3))
                            //alert(powerUpArray[0].name)
                        bricksLeft--
                        SCORE += 100
                        brickGrid[bringIndexUnderBall] = 0

                    } else if (brickGrid[bringIndexUnderBall] == 12) {
                        bricksLeft--
                        powerUpArray.push(new PowerUp(this.x, this.y, "stickyBall", powerUpImage4))
                        SCORE += 100
                        brickGrid[bringIndexUnderBall] = 0
                    }
                }
                let prevBallX = this.x - this.xSpeed
                let prevBallY = this.y - this.ySpeed
                let prevBrickCol = Math.floor(prevBallX / BRICK_W)
                let prevBrickRow = Math.floor(prevBallY / BRICK_H)

                let bothTestsFailed = true

                if (prevBrickCol != ballBrickCol) {

                    if (isBrickAtColRow(prevBrickCol, ballBrickRow) == false && fireBall == false) {
                        this.xSpeed *= -1
                        bothTestsFailed = false
                    }
                }
                if (prevBrickRow != ballBrickRow && fireBall == false) {
                    if (isBrickAtColRow(ballBrickCol, prevBrickRow) == false) {
                        this.ySpeed *= -1
                        bothTestsFailed = false
                    }
                }
                if (bothTestsFailed && fireBall == false) {
                    this.xSpeed *= -1
                    this.ySpeed *= -1
                }
            }
        }
    }
}

arrayOfBalls[0] = new Ball(300, 300, 6, 8, 0)

function moveAll() {
    for (let i = 0; i < powerUpArray.length; i++) {

        powerUpArray[i].move()
        if (powerUpArray[i] != undefined) {
            powerUpArray[i].powerUpPaddleHandling()
        }
    }

    for (let i = 0; i < arrayOfBalls.length; i++) {
        if (arrayOfBalls[i] != undefined) {
            arrayOfBalls[i].ballBrickHandling()
            arrayOfBalls[i].ballPaddleHandling()
            arrayOfBalls[i].move()
            if (arrayOfBalls[i] != undefined) {
                arrayOfBalls[i].ballCheckImage()
            }
        }
    }
}