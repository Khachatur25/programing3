var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs")

app.use(express.static("."));
 
app.get('/',function(req,res){
    res.redirect('y.html');
});

server.listen(3000,function(){
    console.log("server is run");
});

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
matrix = matrixGenerator(25, 5, 4, 5, 4, 0)

io.sockets.emit('send matrix',matrix)

 grassArr = []
 grassEaterArr = []
 predatorArr = []
 predatorEaterArr = []
 HoleArr = []

 Grass = require("./grass")
 GrassEater = require("./grassEater")
 Predator = require("./predator")
 PredatorEater = require("./predatorEater")
 Hole = require("./hole")


 function createObject(){
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
        io.sockets.emit('send matrix',matrix)
    }



    
 }

 function game(){
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

        io.sockets.emit('send matrix',matrix)
 }


setInterval(game,100)


 io.on('connection',function(){
         createObject()
 })