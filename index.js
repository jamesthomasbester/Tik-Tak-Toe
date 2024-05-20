const canvas = document.querySelector('canvas')
canvas.width = 1080
canvas.height = 928
const ctx = canvas.getContext('2d')
const locations = [
    [[(canvas.width / 3) / 2, (canvas.height / 3) / 2], [(canvas.width / 2) , (canvas.height / 3) / 2], [(canvas.width) - (canvas.width / 3) /2 , (canvas.height / 3) / 2]],
    [[(canvas.width / 3) / 2, (canvas.height/ 2)], [(canvas.width / 2), (canvas.height/ 2)], [(canvas.width) - (canvas.width / 3) /2, (canvas.height/ 2)]],
    [[(canvas.width / 3) / 2, (canvas.height) - (canvas.height / 3) /2], [(canvas.width / 2) , (canvas.height) - (canvas.height / 3) /2], [(canvas.width) - (canvas.width / 3) /2 , (canvas.height) - (canvas.height / 3) /2]]]

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
ctx.font = "40px Sans-serif"
if(localStorage.getItem("score")){
    let score = JSON.parse(localStorage.getItem("score"))
    ctx.fillStyle = "white"
    ctx.fillText(`X: ${score.x}, O: ${score.o}`,30,30)
}else{
    ctx.fillStyle = "white"
    ctx.fillText(`X: 0, O: 0`, 30,30)
}

let player = null
let turn = 0
let position = [[null,null,null], [null,null,null], [null,null,null]]
let active = true

document.onmousemove = (e) => {
    if(turn % 2 == 0) player = "X"; else player = "O"
    if(active){
         handleAction(e)
    }
    document.onkeydown = (e) => {
        if(active == false && e.key == "y"){
            location.reload()
        }
    }
   
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
    ComputerMove()
}

function evalScore(){
    for (let i = 0; i < position.length; i++) {
        if(position[i][0] == player && position[i][1] == player && position[i][2] == player ){
           active = false
           console.log("win")
           ctx.lineWidth = 10
           ctx.beginPath()
           ctx.moveTo(100 , ((canvas.height / 3) * (i + 1)) - (canvas.height /3) /2)
           ctx.lineTo(canvas.width - 100, ((canvas.height / 3) * (i + 1)) - (canvas.height /3) /2 )
           winnerMessage()
           ctx.stroke()
        }
        if(position[0][i] == player && position[1][i] == player && position[2][i] == player ){
            active = false
            ctx.lineWidth = 10
            ctx.beginPath()
            ctx.moveTo(((canvas.width /3) * (i + 1) - (canvas.width / 3) /2), canvas.height -100)
            ctx.lineTo(((canvas.width /3) * (i + 1) - (canvas.width / 3) /2), 100)
            ctx.stroke()
            winnerMessage()
        }
    }
    if(position[0][0] == player && position[1][1] == player && position[2][2] == player 
    ){
        active = false
        ctx.lineWidth = 10
        ctx.beginPath()
        ctx.moveTo(120,100)
        ctx.lineTo(canvas.width - 120, canvas.height - 100)
        ctx.stroke()
        winnerMessage()
    }
    if(position[2][0] == player && position[1][1] == player && position[0][2] == player 
    ){
        active = false
        ctx.lineWidth = 10
        ctx.beginPath()
        ctx.moveTo(canvas.width - 120,100)
        ctx.lineTo(120, canvas.height - 100)
        ctx.stroke()
        console.log(turn % 2) 
        winnerMessage()
    }
    if(turn == 9 && active){
        noWinnderMessage()
    }
}
function noWinnderMessage(){
    active = false
    ctx.font = "148px Sans-serif"
    let message = `Draw`
    let text = ctx.measureText(message)
    ctx.fillStyle = "rgba(0,0,0,0.3)"
    ctx.fillRect(0,0,canvas.width,canvas.height)
    if(turn % 2){
        ctx.fillStyle = "white"
    }else{
        ctx.fillStyle = "red"
    }
    ctx.fillText(message , (canvas.width / 2) - text.width /2, canvas.height /2 )
    ctx.font = "50px Sans-serif"
    ctx.fillText("play again?  Y/N", canvas.width/2, canvas.height - 100)
    console.log(player)
    
}

function winnerMessage(){
    ctx.font = "148px Sans-serif"
    let message = `${player} wins`
    let text = ctx.measureText(message)
    ctx.fillStyle = "rgba(0,0,0,0.3)"
    ctx.fillRect(0,0,canvas.width,canvas.height)
    if(turn % 2){
        ctx.fillStyle = "white"
    }else{
        ctx.fillStyle = "red"
    }
    ctx.fillText(message , (canvas.width / 2) - text.width /2, canvas.height /2 )
    ctx.font = "50px Sans-serif"
    ctx.fillText("play again?  Y/N", canvas.width/2, canvas.height - 100)
    console.log(player)
    
    if(!localStorage.getItem("score")){
        if(player == "X"){
            var score = {
                x:1,
                o:0
            }
        }else{
            var score = {

                x:0,
                o:1
            }
        }
        localStorage.setItem("score", JSON.stringify(score))
    }else{
        let score = localStorage.getItem("score")
        score = JSON.parse(score)
        if(player == "X"){
            score.x += 1
        }else{
            score.o +=1
        }
        console.log(score)
        localStorage.setItem("score", JSON.stringify(score))
    }
}

function draw(x, y) {
    if(player == "X"){
        console.log("x")
        ctx.strokeStyle = "red"
        ctx.fillStyle = "red"
        ctx.beginPath()
        ctx.moveTo(x - 100, y - 100)
        ctx.lineTo(x + 100, y + 100)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(x + 100, y - 100)
        ctx.lineTo(x - 100, y + 100)
        ctx.stroke()
    }else if(player == "O"){
        console.log("y")
        ctx.strokeStyle = "white"
        ctx.fillStyle ="white"
        ctx.beginPath()
        ctx.arc(x, y, 100, 0, 2*Math.PI)
        ctx.stroke()
    }
    
}
function ComputerMove(){
    if(turn % 2 == 0) player = "X"; else player = "O"
    if(active){

    }
    let moves = true
    while(moves){
        let x = Math.floor(Math.random() * 3)
        let y = Math.floor(Math.random() * 3)
        console.log(`x: ${x},y: ${y}a3`)
        console.log(turn)
        if(position[x][y] == null){
            console.log(locations[x][y])
            let posx = locations[x][y][0]
            let posy = locations[x][y][1]
            draw(posx, posy)
            position[x][y] = player
            turn++
            moves = false
        }
        if(turn >= 9){
            moves = false
        }
    }
    evalScore()
}