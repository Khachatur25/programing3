let LivingCreature = require("./LivingCreature")
module.exports =  class PredatorEater extends LivingCreature {
    constructor(x, y) {
        super(x,y)
        this.energy = 50
        this.directions = []
    }


    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(char) {
        this.getNewCoordinates()
        return super.chooseCell(char)

    }


    mul() {
        let emptyCell = this.chooseCell(0)
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)]

        if (newCell) {
            let newX = newCell[0]
            let newY = newCell[1]

            matrix[newY][newX] = 3

            let preEat = new PredatorEater(newX, newY)

            predatorEaterArr.push(preEat)


        }
    }


    eat() {
        let emptyCell = this.chooseCell(3)
        let newCell =emptyCell[Math.floor(Math.random() * emptyCell.length)]

        if (newCell) {
            this.energy += 1
            let newX = newCell[0]
            let newY = newCell[1]

            for (let i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1)
                }
            }


            matrix[newY][newX] = 4
            matrix[this.y][this.x] = 0


            this.x = newX
            this.y = newY

            if (this.energy > 50) {
                this.mul()
            }

        } else {
            this.move()
        }
    }


    move(){
        let emptyCell = this.chooseCell(0)
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)]

            if(newCell){
                let newX = newCell[0]
                let newY = newCell[1]

                matrix[newY][newX] = 4
                matrix[this.y][this.x] = 0
                
                this.x = newX
                this.y = newY

                this.energy--

                if(this.energy < 0){
                    this.die ()
                }
            }
     }



     die(){
        matrix[this.y][this.x] = 0

          for(let i in predatorArr){
                   if(this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                             predatorArr.splice(i,1)
                   }
          }
    }


}


