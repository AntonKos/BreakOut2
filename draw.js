let originalWidth = 488
let originalHeight = 131
let frameX = 0

function drawBricks( /* key */ ) {
    for (let eachRow = 0; eachRow < BRICK_ROWS; eachRow++) {
        for (let eachCol = 0; eachCol < BRICK_COLS; eachCol++) {
            let arrayIndex = rowColToArrayIndex(eachCol, eachRow)
            if (brickGrid[arrayIndex] == 1 || brickGrid[arrayIndex] == 7 || brickGrid[arrayIndex] == 9 ||
                brickGrid[arrayIndex] == 11 || brickGrid[arrayIndex] == 13 /* key */ ) {
                ctx.drawImage(brickImage, BRICK_W * eachCol, BRICK_H * eachRow, BRICK_W - BRICK_GAP, BRICK_H)
            } else if (brickGrid[arrayIndex] == 3) {
                ctx.drawImage(brickImage2, BRICK_W * eachCol, BRICK_H * eachRow, BRICK_W - BRICK_GAP, BRICK_H - BRICK_GAP)
            } else if (brickGrid[arrayIndex] == 4) {
                ctx.drawImage(brickImage1, BRICK_W * eachCol, BRICK_H * eachRow, BRICK_W - BRICK_GAP, BRICK_H - BRICK_GAP)
            } else if (brickGrid[arrayIndex] == 5) {
                ctx.drawImage(brickImage3, BRICK_W * eachCol, BRICK_H * eachRow, BRICK_W - BRICK_GAP, BRICK_H - BRICK_GAP)
            }
        }
    }
}

function changeFrame() {
    if (frameX >= 2) frameX = 0
    else frameX++
        //alert()

}

function paddleDraw() {
    if (cannon) {
        ctx.drawImage(paddleShootingImage, paddleX, canvas.height - PADDLE_DIST_FROM_EDGE, PADDLE_WIDTH,
            PADDLE_THICKNESS)
    } else if (!cannon && !stickyBall) {
        ctx.drawImage(paddleImage, paddleX, canvas.height - PADDLE_DIST_FROM_EDGE, PADDLE_WIDTH,
            PADDLE_THICKNESS)
    } else if (stickyBall) {
        ctx.drawImage(paddleSticky, frameX * originalWidth, 0, originalWidth,
            originalHeight, paddleX, canvas.height - PADDLE_DIST_FROM_EDGE, PADDLE_WIDTH,
            PADDLE_THICKNESS)
    }

}

/*function drawPowerUp(x, y) {
    ctx.drawImage(Image, x, y, 25,
        10)
}*/

function drawAll() {
    changeFrame()
    handleBackground()
    showGameStats(livesImage, canvas.width - 90, 10)
        //showGameStats()
        //showGameStats()
    colorText("SCORE: " + SCORE, 20, 20, 'white')
    colorText("HIGHEST SCORE: " + highScore, 580, 20, 'white')
    for (let i = 0; i < powerUpArray.length; i++) {
        powerUpArray[i].draw()
    }
    for (let i = 0; i < arrayOfBalls.length; i++) {
        if (arrayOfBalls[i] != undefined) {
            arrayOfBalls[i].draw()
        }
    }
    paddleDraw()
        /* if (ray) {
             handleRay()
         }*/
    drawBricks()
}






/*function drawBitmapCenteredWithRotation(useBitmap, atX, atY, withAng) {
    ctx.save();
    ctx.translate(atX, atY);
    ctx.rotate(withAng);
    ctx.drawImage(useBitmap, -useBitmap.width / 2, -useBitmap.height / 2, 15, 15);
    ctx.restore();
}*/






function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
    ctx.fillStyle = fillColor
    ctx.fillRect(topLeftX, topLeftY, boxWidth, boxHeight)
}

function colorCircle(centerX, centerY, radius, fillColor) {
    ctx.fillStyle = fillColor
    ctx.beginPath()
    ctx.arc(centerX, centerY, 10, 0, Math.PI * 2, true)
    ctx.fill()
}

function colorText(showWords, textX, textY, fillColor) {
    ctx.fillStyle = fillColor
    ctx.fillText(showWords, textX, textY)
}

function handleBackground() {
    ctx.drawImage(background, 0, 0, 800, 600)
}

function showGameStats(img, imgX, imgY) {
    for (let i = 0; i < LIVES; i++) {
        ctx.drawImage(img, imgX, imgY, 25, 25)
        imgX += 30
    }
}