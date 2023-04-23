var socket = io()

var side = 30

function setup() {

        createCanvas(25* side, 25 * side)
        


        // canvas.addEventListener("click", horziontal)
        // canvas.addEventListener("click", vertical)


        // function horziontal() {
        //         for (let y = 0; y < matrix.length; y++) {

        //                 for (let x = 0; x < matrix.length; x++) {



        //                         if (HoleArr.length == 0) {
        //                                 matrix[x][i / 2] = 5
        //                         }
        //                                 matrix[x][i / 2] = 5
        //                                 let hl = new Hole(x, y)
        //                                 HoleArr.push(hl)
                              
        //                 }

        //         }
        // }

        // function vertical() {
        //         for (let y = 0; y < matrix.length; y++) {

        //                 for (let x = 0; x < matrix.length; x++) {



        //                         if (HoleArr.length == 0) {
        //                                 matrix[x][i / 2] = 5
        //                         } 
                        
        //                                 matrix[i / 2][x] = 5
        //                                 let hl = new Hole(x, y)
        //                                 HoleArr.push(hl)
                                
        //                 }
        //         }

        // }

}


function nkarox(matrix) {
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
} 
socket.on('send matrix',nkarox)