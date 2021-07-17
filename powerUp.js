let powerUpArray = []
class PowerUp {
    constructor(x, y, name, image) {
        this.x = x
        this.y = y
        this.ySpeed = 5
        this.name = name
        this.image = image
    }
    draw() {
        //console.log("length: "+powerUpArray.length)
        ctx.drawImage(this.image, this.x, this.y, 20, 15)
    }
    move() {
        this.y += this.ySpeed
        if (this.y > canvas.height) {
            powerUpArray.shift()
        }
    }
    powerUpPaddleHandling() {

        let paddleTopEdgeY = canvas.height - PADDLE_DIST_FROM_EDGE
        let paddleBottomEdgeY = paddleTopEdgeY + PADDLE_THICKNESS
        let paddleLeftEdgeX = paddleX
        let paddleRightEdgeX = paddleLeftEdgeX + PADDLE_WIDTH
        if (this.y > paddleTopEdgeY - 10 &&
            this.y < paddleBottomEdgeY &&
            this.x > paddleLeftEdgeX &&
            this.x < paddleRightEdgeX) {
            if (this.name === "threeBalls" && quantityOfBalls < 3) {

                quantityOfBalls = 3

                for (let i = 1; i < quantityOfBalls; i++) {
                    let balls = new Ball(arrayOfBalls[0].x + i * 20, arrayOfBalls[0].y, 6, -8, i)
                    arrayOfBalls.push(balls)
                }
                console.log(arrayOfBalls.length)
                powerUpArray.shift()
            } else if (this.name === "fireBall") {
                fireBall = true

                setTimeout(function () {
                    fireBall = false
                }, 10000)
                powerUpArray.shift()
            }
            else if (this.name === "cannon") {
                if (!stickyBall) {
                    cannon = true
                    setTimeout(function () {

                        cannon = false
                    }, 10000)
                }
                console.log('this is cannon')
                powerUpArray.shift()
            }
            else if (this.name === "stickyBall") {
                if (!cannon) {
                    stickyBall = true

                    setTimeout(function () {
                        for (let i = 0; i < arrayOfBalls.length; i++) {
                            if (arrayOfBalls[i] != undefined && arrayOfBalls[i].isBallTouchPaddle) {
                                arrayOfBalls[i].isBallTouchPaddle = false
                            }
                        }
                        stickyBall = false
                        ballHeld = false
                    }, 10000)
                }
                console.log('this is sticky')
                powerUpArray.shift()
            }
        }
    }
}