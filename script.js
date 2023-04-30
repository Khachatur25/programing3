var socket = io()

var side = 30

function setup() {

        createCanvas(30 * side, 30 * side)

}
socket.on('Winter', function (data) {
        weath = data;
})
socket.on('Summer', function (data) {
        weath = data;
})
socket.on('Spring', function (data) {
        weath = data;
})
socket.on('Autumn', function (data) {
        weath = data;
})

var weath = "winter"
function nkarox(matrix) {
        for (let y = 0; y < matrix.length; y++) {
                for (let x = 0; x < matrix[y].length; x++) {
                        var toBot = side - side * 0.1
                        textSize(toBot)
                        if (matrix[y][x] == 1) {
                                if (weath == "spring") {
                                        fill("green")
                                } else if (weath == "summer") {
                                        fill("orange")
                                } else if (weath == "autumn") {
                                        fill("yellow")
                                } else if (weath == "winter") {
                                        fill("white")
                                }
                                rect(x * side, y * side, side, side)
                                // text('🥦', x * side, y * side + toBot);
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
socket.on('send matrix', nkarox)

function horziontal() {
        socket.emit("horizontal")
}

function vertical() {
        socket.emit("vertical")
}

function AddGrass() {
        socket.emit("AddGrass")
}
function Clear() {
        socket.emit("Clear")
}
function AddGrassEater() {
        socket.emit("AddGrassEater")
}
function AddPredator() {
        socket.emit("AddPredator")
}
function AddPredatorEater() {
        socket.emit("AddPredatorEater")
}
function Winter() {
        socket.emit("winter");
}
function Summer() {
        socket.emit("summer");
}
function Spring() {
        socket.emit("spring");
}
function Autumn() {
        socket.emit("autumn");
}