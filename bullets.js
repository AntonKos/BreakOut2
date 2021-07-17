let speedOfBullet = 10
let arrayOfBullets = []
let counterOfBullets = 0

class Bullet {
    constructor(counter, x) {
        this.counter = counter
        this.x = x
        this.y = canvas.height - PADDLE_DIST_FROM_EDGE
        this.ySpeed = speedOfBullet
        this.image = bulletImage
    }
    draw() {
        ctx.drawImage(this.image, this.x, this.y, 7, 15)
    }

    move() {
        this.y -= speedOfBullet
    }
    checkCollisionWithBlocks() {
        let bulletBrickCol = Math.floor(this.x / BRICK_W)
        let bulletBrickRow = Math.floor(this.y / BRICK_H)
        let bringIndexUnderBullet = rowColToArrayIndex(bulletBrickCol, bulletBrickRow)


        if (bulletBrickCol >= 0 && bulletBrickCol < BRICK_COLS &&
            bulletBrickRow >= 0 && bulletBrickRow < BRICK_ROWS) {
            if (isBrickAtColRow(bulletBrickCol, bulletBrickRow)) {

                if (brickGrid[bringIndexUnderBullet] !== 5) {
                    brickGrid[bringIndexUnderBullet]--
                    if (brickGrid[bringIndexUnderBullet] == 0) {
                        bricksLeft--

                        SCORE += 100
                        //console.log(bricksLeft)
                    }
                    else if (brickGrid[bringIndexUnderBullet] == 2) {
                        bricksLeft--

                        SCORE += 200
                        brickGrid[bringIndexUnderBullet] = 0
                    }
                    else if (brickGrid[bringIndexUnderBullet] == 6) {
                        bricksLeft--
                        powerUpArray.push(new PowerUp(this.x, this.y, "threeBalls", powerUpImage1))
                        //alert(powerUpArray[0].name)



                        SCORE += 100
                        brickGrid[bringIndexUnderBullet] = 0
                    }
                    else if (brickGrid[bringIndexUnderBullet] == 8) {
                        bricksLeft--
                        powerUpArray.push(new PowerUp(this.x, this.y, "fireBall", powerUpImage2))
                        //alert(powerUpArray[0].name)
                        SCORE += 100
                        brickGrid[bringIndexUnderBullet] = 0

                    } else if (brickGrid[bringIndexUnderBullet] == 10) {

                        powerUpArray.push(new PowerUp(this.x, this.y, "cannon", powerUpImage3))
                        //alert(powerUpArray[0].name)

                        bricksLeft--

                        SCORE += 100
                        brickGrid[bringIndexUnderBullet] = 0

                    }
                    else if (brickGrid[bringIndexUnderBullet] == 12) {
                        bricksLeft--
                        powerUpArray.push(new PowerUp(this.x, this.y, "stickyBall", powerUpImage4))
                        SCORE += 100
                        brickGrid[bringIndexUnderBullet] = 0
                    }

                    findAndDeleteBullet(this.counter)
                }
            }
        }
    }
}

function findAndDeleteBullet(counterOfBullet) {
    for (let i = 0; i < arrayOfBullets.length; i++) {
        if (arrayOfBullets[i].counter === counterOfBullet) {
            arrayOfBullets.splice(i, 1)
        }
    }
}

function checkCannon() {
    let x = paddleX
    let x2 = paddleX + PADDLE_WIDTH
    if (cannon && Date.now() - lastFire > 500) {
        handleBullets(x2)
        handleBullets(x)
        lastFire = Date.now()
    }
}

function handleBullets(x) {
    arrayOfBullets.unshift(new Bullet(counterOfBullets, x))
    if (arrayOfBullets.length > 40) {
        for (let i = 0; i < 10; i++) {
            arrayOfBullets.pop(arrayOfBullets[i])
        }
    }
    counterOfBullets++
}


