function matrixGenerator(matrixSize, grass, grassEater, predator, predatorEater, hole) {
        var matrix = []
        for (let i = 0; i < matrixSize; i++) {
                matrix.push([])
                for (let j = 0; j < matrixSize; j++) {
                        matrix[i].push(0)
                }
        }

        for (let i = 0; i < grass; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 1
        }

        for (let i = 0; i < grassEater; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 2
        }


        for (let i = 0; i < predator; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 3
        }

        for (let i = 0; i < predatorEater; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 4
        }

        for (let i = 0; i < hole; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 5
        }




        return matrix
}
let i = prompt('matrix size')
let matrix = matrixGenerator(i, 5, 4, 5, 4, 1)
let side = prompt('rect side ?')
var grassArr = []
var grassEaterArr = []
var predatorArr = []
var predatorEaterArr = []
var HoleArr = []


function setup() {
        frameRate(15)
        createCanvas(matrix[0].length * side, matrix.length * side)
        for (let y = 0; y < matrix.length; y++) {
                for (let x = 0; x < matrix[y].length; x++) {
                        if (matrix[y][x] == 1) {
                                let grass = new Grass(x, y)

                                grassArr.push(grass)


                        } else if (matrix[y][x] == 2) {
                                let grEat = new GrassEater(x, y)
                                grassEaterArr.push(grEat)
                        } else if (matrix[y][x] == 3) {
                                let pre = new Predator(x, y)
                                predatorArr.push(pre)
                        }
                        else if (matrix[y][x] == 4) {
                                let preEat = new PredatorEater(x, y)
                                predatorEaterArr.push(preEat)
                        }
                        else if (matrix[y][x] == 5) {
                                let hl = new Hole(x, y)
                                HoleArr.push(hl)
                        }


                }
        }


        canvas.addEventListener("click", horziontal)
        canvas.addEventListener("click", vertical)


        function horziontal() {
                for (let y = 0; y < matrix.length; y++) {

                        for (let x = 0; x < matrix.length; x++) {



                                if (HoleArr.length == 0) {
                                        matrix[x][i / 2] = 5
                                }
                                        matrix[x][i / 2] = 5
                                        let hl = new Hole(x, y)
                                        HoleArr.push(hl)
                              
                        }

                }
        }

        function vertical() {
                for (let y = 0; y < matrix.length; y++) {

                        for (let x = 0; x < matrix.length; x++) {



                                if (HoleArr.length == 0) {
                                        matrix[x][i / 2] = 5
                                } 
                        
                                        matrix[i / 2][x] = 5
                                        let hl = new Hole(x, y)
                                        HoleArr.push(hl)
                                
                        }
                }

        }

}


function draw() {
        for (let y = 0; y < matrix.length; y++) {
                for (let x = 0; x < matrix[y].length; x++) {
                        var toBot = side - side * 0.1
                        textSize(toBot)
                        if (matrix[y][x] == 1) {
                                fill("green")
                                rect(x * side, y * side, side, side)
                                text('🥦', x * side, y * side + toBot);
                        } else if (matrix[y][x] == 2) {
                                fill("yellow")
                                rect(x * side, y * side, side, side)
                                text('🐄', x * side, y * side + toBot);
                        } else if (matrix[y][x] == 3) {
                                fill("red")
                                rect(x * side, y * side, side, side)
                                text('🐆', x * side, y * side + toBot);
                        } else if (matrix[y][x] == 4) {
                                fill("blue")
                                rect(x * side, y * side, side, side)
                                text('🧛🏽‍♂️', x * side, y * side + toBot)
                        } else if (matrix[y][x] == 5) {
                                fill("black")
                                rect(x * side, y * side, side, side)
                                text('☠️', x * side, y * side + toBot)
                        }
                        else {
                                fill("gray")
                                rect(x * side, y * side, side, side)
                        }

                }
        }



        for (let i in grassArr) {
                grassArr[i].mul()
        }


        for (let i in grassEaterArr) {
                grassEaterArr[i].eat()
        }



        for (let i in predatorArr) {
                predatorArr[i].eat()
        }

        for (let i in predatorEaterArr) {
                predatorEaterArr[i].eat()
        }

        console.log(HoleArr.length);



}
