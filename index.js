const canvas = document.querySelector('canvas')
canvas.width = 1080
canvas.height = 928
const ctx = canvas.getContext('2d')

ctx.fillStyle = 'black'
ctx.fillRect(0,0,canvas.width, canvas.height)

ctx.beginPath()
ctx.moveTo(canvas.width / 3,canvas.height / 10)
ctx.lineTo(canvas.width / 3, canvas.height / 10 * 9)
ctx.strokeStyle = 'white'
ctx.stroke()

ctx.beginPath()
ctx.moveTo(canvas.width /3 * 2,canvas.height / 10)
ctx.lineTo(canvas.width / 3 * 2, canvas.height / 10 * 9)
ctx.strokeStyle = 'white'
ctx.stroke()

ctx.beginPath()
ctx.moveTo(canvas.width / 10 ,canvas.height / 3)
ctx.lineTo(canvas.width / 10 * 9, canvas.height / 3 )
ctx.strokeStyle = 'white'
ctx.stroke()

ctx.beginPath()
ctx.moveTo(canvas.width / 10 ,canvas.height / 3 * 2)
ctx.lineTo(canvas.width / 10 * 9, canvas.height / 3 * 2)
ctx.strokeStyle = 'white'
ctx.stroke()

let player = null
let turn = 0
let position = [[null,null,null], [null,null,null], [null,null,null]]

document.onmousemove = (e) => {
    if(turn % 2 == 0) player = "X"; else player = "O"
    handleAction(e)
}

function handleAction(e){
    console.log(position[0])
    evalScore()
    //Row One
    if(e.offsetX <= canvas.width / 3 && e.offsetY <= canvas.height / 3 ){
         if(position[0][0] == undefined){
            draw((canvas.width / 3) / 2, (canvas.height / 3) / 2)
            position[0][0] = player
            turn++
         }
    }
    else if(e.offsetX <= (canvas.width / 3) * 2 && e.offsetY <= canvas.height / 3){
        if(position[0][1] == undefined){
            draw((canvas.width / 2) , (canvas.height / 3) / 2)
            position[0][1] = player
            turn++
        }

    }
    else if(e.offsetX <= (canvas.width / 3) * 3 && e.offsetY <= canvas.height / 3){
        if(position[0][2] == undefined){
            draw((canvas.width) - (canvas.width / 3) /2 , (canvas.height / 3) / 2)
            position[0][2] = player
            turn++
        }

    }
    //Row Two
    else if(e.offsetX <= canvas.width / 3 && (e.offsetY <= (canvas.height / 3) * 2)){
        if(position[1][0] == undefined){
            draw((canvas.width / 3) / 2, (canvas.height/ 2) )
            position[1][0] = player
            turn++
            position[1][0]
        }

    }
    else if(e.offsetX <= (canvas.width / 3) * 2 && (e.offsetY <= (canvas.height / 3) * 2)){
        if(position[1][1] == undefined){
            draw((canvas.width / 2), (canvas.height/ 2) )
            position[1][1] = player
            turn++
        }

    }
    else if(e.offsetX <= (canvas.width / 3) * 3 && (e.offsetY <= (canvas.height / 3) * 2)){
        if(position[1][2] == undefined){
            draw((canvas.width) - (canvas.width / 3) /2, (canvas.height/ 2) )
            position[1][2] = player
            turn++
        }

    }
    //Row Three
    else if(e.offsetX <= canvas.width / 3 && e.offsetY <= canvas.height){
        if(position[2][0] == undefined){
            draw((canvas.width / 3) / 2, (canvas.height) - (canvas.height / 3) /2)
            position[2][0] = player
            turn++
        }

    }
    else if(e.offsetX <= (canvas.width / 3) * 2 && e.offsetY <= canvas.height){
        if(position[2][1] == undefined){
            draw((canvas.width / 2) , (canvas.height) - (canvas.height / 3) /2)
            position[2][1] = player
            turn++
        }

    }
    else if(e.offsetX <= (canvas.width / 3) * 3 && e.offsetY <= canvas.height){
        if(position[2][2] == undefined){
            draw((canvas.width) - (canvas.width / 3) /2 , (canvas.height) - (canvas.height / 3) /2)
            position[2][2] = player
            turn++
        }

    }
    evalScore()
}

function evalScore(index){
    for (let i = 0; i < position.length; i++) {
        if(position[i][0] == player && position[i][1] == player && position[i][2] == player ){
            console.log("win")
        }
    }
}

function draw(x, y) {
    if(player == "X"){
        ctx.beginPath()
        ctx.moveTo(x - 100, y - 100)
        ctx.lineTo(x + 100, y + 100)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(x + 100, y - 100)
        ctx.lineTo(x - 100, y + 100)
        ctx.stroke()
    }else if(player == "O"){
        ctx.beginPath()
        ctx.arc(x, y, 100, 0, 2*Math.PI)
        ctx.stroke()
    }
    
}