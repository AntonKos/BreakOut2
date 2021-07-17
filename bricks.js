const BRICK_W = 80
const BRICK_H = 20
const BRICK_COLS = 10
const BRICK_ROWS = 14
const BRICK_GAP = 2

let lengthOfArrayOfIndexesForSorting = 4
/*let levelOne = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 4, 4, 1, 1, 1, 1, 4, 4, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 0, 5, 5, 5, 5, 5, 5, 0, 0,
    0, 0, 0, 1, 1, 1, 1, 0, 0, 0,
    0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
    0, 0, 0, 0, 4, 4, 0, 0, 0, 0,
    0, 0, 0, 0, 4, 4, 0, 0, 0, 0,
    0, 0, 1, 1, 1, 1, 1, 1, 0, 0,
    0, 0, 0, 1, 1, 1, 1, 0, 0, 0,
    0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
    1, 1, 1, 1, 1, 1, 1, 7, 1, 1
]*/
let levelOne = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 1, 0, 0, 1, 1, 0, 0, 1, 1,
    1, 1, 0, 0, 1, 1, 0, 0, 1, 1,
    1, 1, 0, 0, 1, 1, 0, 0, 1, 1,
    1, 1, 0, 0, 1, 1, 0, 0, 1, 1,
    1, 1, 0, 0, 1, 1, 0, 0, 1, 1,
    1, 1, 0, 0, 1, 1, 0, 0, 1, 1,
    1, 1, 0, 0, 1, 1, 0, 0, 1, 1,
    1, 1, 0, 0, 1, 1, 0, 0, 1, 1,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0
]
let levelTwo = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 4, 4, 0, 0, 0, 0,
    0, 0, 0, 4, 4, 4, 4, 0, 0, 0,
    0, 0, 1, 1, 1, 1, 1, 1, 0, 0,
    0, 0, 1, 1, 1, 1, 1, 1, 0, 0,
    0, 0, 1, 1, 1, 1, 1, 1, 0, 0,
    0, 0, 1, 1, 1, 1, 1, 1, 0, 0,
    0, 0, 1, 1, 1, 1, 1, 1, 0, 0,
    0, 0, 0, 4, 4, 4, 4, 0, 0, 0,
    0, 0, 0, 0, 4, 4, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0
]
let levelThree = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
    0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
    0, 0, 0, 1, 1, 1, 1, 0, 0, 0,
    0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
    0, 0, 0, 4, 1, 1, 4, 0, 0, 0,
    0, 0, 1, 1, 0, 0, 1, 1, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    1, 0, 1, 1, 0, 0, 1, 1, 0, 1,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 0, 1, 1, 0, 0, 1, 1, 0, 0,
    0, 0, 0, 4, 4, 4, 4, 0, 0, 0,
    0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0
]
let levels = [levelOne, levelTwo, levelThree]
let brickGrid = []
let bricksLeft = 0
let numberOfLevel = -1

function brickReset() {
    brickGrid = levels[numberOfLevel].slice()
    bricksLeft = 0
    
    LIVES = 3
    for (let i = 0; i < BRICK_COLS * BRICK_ROWS; i++) {
        if (brickGrid[i] != 0 && brickGrid[i] != 5) {
            bricksLeft++
            if (brickGrid[i] === 1) {
                arrayOfIndexes.push(i) // 0 1 2 3
            }
        }
    }

    function handleArrayOfIndexes() {
        let index
        let y = 7
        for (let i = 0; i < lengthOfArrayOfIndexesForSorting; i++) {

            do {
                index = Math.floor(Math.random() * arrayOfIndexes.length) // from 0 to 3
            }
            while (collision(index))

            arrayOfIndexesForSorting.push(index)
        }

        for (let i = 0; i < arrayOfIndexesForSorting.length; i++) {

            brickGrid[arrayOfIndexes[arrayOfIndexesForSorting[i]]] = y
            y += 2
            // alert(arrayOfIndexes[arrayOfIndexesForSorting[i]])
        }

    }

    function collision(index) {
        for (let i = 0; i < arrayOfIndexesForSorting.length; i++) {
            if (index === arrayOfIndexesForSorting[i]) {
                return true
            }
        } return false
    }

    handleArrayOfIndexes()

}

function checkBricksLeft() {
    if (bricksLeft === 0) {

        resetGame()
        //brickReset()
    }
}

