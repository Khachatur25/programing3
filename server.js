var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");


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
matrix = matrixGenerator(30, 5, 4, 5, 4, 0)

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
                // console.log(predatorEaterArr.length);
        }

        io.sockets.emit('send matrix',matrix)
 }


setInterval(game,100)

var weath;

function Winter() {
    weath = "winter";
    io.sockets.emit('Winter', weath);
}

function Summer() {
    weath = "summer";
    io.sockets.emit('Summer', weath);
}

function Spring() {
    weath = "spring";
    io.sockets.emit('Spring', weath);
}
function Autumn() {
    weath = "autumn";
    io.sockets.emit('Autumn', weath);

}

function horziontal() {
        for (let y = 0; y < 30; y++) {

                for (let x = 0; x < 30; x++) {



                        if (HoleArr.length == 0) {
                                matrix[x][30/ 2] = 5
                        }
                                matrix[x][30 / 2] = 5
                                let hl = new Hole(x, y)
                                HoleArr.push(hl)
                      
                }

        }
}

function vertical() {
        for (let y = 0; y < 30; y++) {

                for (let x = 0; x < 30; x++) {



                        if (HoleArr.length == 0) {
                                matrix[x][30 / 2] = 5
                        } 
                
                                matrix[30 / 2][x] = 5
                                let hl = new Hole(x, y)
                                HoleArr.push(hl)
                        
                }
        }

}


 function AddGrass() {
         var a = 5;
         while(a){
                 let x =  Math.floor(Math.random() * 30);
                 let y =  Math.floor(Math.random() * 30);
                if (matrix[y][x] == 0) {
                    matrix[y][x] = 1
                    grassArr.push(new Grass(x, y))
                    a--;
                }
        }
    }

function AddGrassEater(){
        var a = 3;
        while(a){
                let x =  Math.floor(Math.random() * 30);
                let y =  Math.floor(Math.random() * 30);
                if(matrix[y][x] == 0){
                        matrix[y][x] = 2
                        grassEaterArr.push(new GrassEater(x,y))
                        a--;
                }
                
        }
}
function AddPredator(){
        var a = 4;
        while(a){
                let x =  Math.floor(Math.random() * 30);
                let y =  Math.floor(Math.random() * 30);
                if(matrix[y][x] == 0){
                        matrix[y][x] = 3
                        predatorArr.push(new Predator(x,y))
                        a--;
                }
        }
}
function AddPredatorEater(){
        var a = 2;
        while(a){
                let x =  Math.floor(Math.random() * 30);
                let y =  Math.floor(Math.random() * 30);
                if(matrix[y][x] == 0){
                        matrix[y][x] = 4
                        predatorEaterArr.push(new PredatorEater(x,y))
                        a--;
                }
        }
}
    function Clear() {
            grassArr = []
            grassEaterArr = []
            predatorArr = []
            predatorEaterArr = []
            HoleArr = []
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {
                matrix[y][x] = 0;
            }
        }
    }
    

    io.on('connection',function(socket){
        createObject()
        socket.on("horizontal", horziontal)
        socket.on("vertical", vertical)
        socket.on("AddGrass",AddGrass)
        socket.on("Clear",Clear)
        socket.on("AddGrassEater",AddGrassEater)
        socket.on("AddPredator",AddPredator)
        socket.on("AddPredatorEater",AddPredatorEater)
        socket.on("spring", Spring);
        socket.on("summer", Summer);
        socket.on("autumn", Autumn);
        socket.on("winter", Winter);


})

 var statistics = {}

 setInterval(function(){
        statistics.grass = grassArr.length
        statistics.grassEater = grassEaterArr.length
        statistics.predator = predatorArr.length
        statistics.predatorEater = predatorEaterArr.length
        statistics.hole = HoleArr.length

        fs.writeFile("statistics.json",JSON.stringify(statistics),function(){
        //       console.log("statistics"); 
        })
 },1000)
////



 

