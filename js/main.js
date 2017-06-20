
var canvas = document.getElementById("ricket");
//Yo chai 2D rendering-Context Ho. - the actual tool that we can use to paint on canvas !!
var rick = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
var ballRadius =10;
var dx = 2;
var dy = -2;
var batHeight = 10;
var batWidth = 85;
var batX = (canvas.width - batWidth)/2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 6;
var brickColumnCount = 12;
var brickWidth = 85;
var brickHeight = 30;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;

var bricks = [];
for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0 , status:1};
    }
}


// rick.beginPath();
// //yesma first ko 2 ota component bhaneko x-axis and y-axis location ho. nd another
// // 2 chai width rah height ho !!
// rick.rect(10,10,100,50);
// rick.fillStyle = "#FF0000";
// rick.fill();
// rick.closePath();

//Yo chai Circle banaunako lagi use huncha !!
// rick.beginPath();
// rick.arc(240, 160, 30, 0, Math.PI*2, false);
// rick.strokeStyle = "rgba(255, 0, 0, 2)";
// rick.stroke();
// rick.fillStyle = "green";
// rick.fill();
// rick.closePath();

// Event Creation for the left and right key !!
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e){
    relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width ){
        batX = relativeX - batWidth/2;
    }
}
function keyDownHandler(e){
    if(e.keyCode == 39){
        rightPressed = true;
    }else if(e.keyCode == 37){
        leftPressed = true;
    }
}

function keyUpHandler(e){
    if(e.keyCode == 39){
        rightPressed = false;
    }
    else if(e.keyCode == 37){
        leftPressed = false;
    }
}

function drawBall(){
    rick.beginPath();
    rick.arc(x , y , ballRadius , 0 , Math.PI*2);
    rick.fillStyle = "#e0ab4a";
    rick.fill();
    rick.closePath();
}

function drawBat(){
    rick.beginPath();
    rick.rect(batX,canvas.height - batHeight,batWidth, batHeight);
    rick.fillStyle = "#3a4746";
    rick.fill();
    rick.closePath();
}

function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                rick.beginPath();
                rick.rect(brickX, brickY, brickWidth, brickHeight);
                rick.fillStyle = "#ffd88c";
                rick.fill();

                rick.closePath();
            }
        }
    }
}

function drawScore(){
    rick.font= "20px Arial";
    rick.fillStyle = "#f9f9f9";
    rick.fillText("Score: "+score, 8, 20);

}

// function collisionDetection() {
//     for(c=0; c<brickColumnCount; c++) {
//         for(r=0; r<brickRowCount; r++) {
//             var b = bricks[c][r];
//             if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
//                 dy = -dy;
//             }
//         }
//     }
// }

function collisionDetection() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score == brickRowCount*brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}


function draw(){
    rick.clearRect(0,0,canvas.width,canvas.height);
    drawBricks();
    drawBall();
    drawBat();
    drawScore();
    collisionDetection();

    // yo part bhaneko the ball bounces of from four side !!
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius){
        dx = -dx;
    }

    // if(y + dy < ballRadius || y + dy > canvas.height - ballRadius){
    //     dy = -dy;
    // }

    //Aba bottom ko ma bounce bhayo bhane chai Game over garnu paryo !!
    if(y + dy < ballRadius){
        dy = -dy;
    }else if( y + dy > canvas.height - ballRadius){
        //Aba chai bottom ma aayo but bat lai hit garyo ki nai check
        //garne mechanism
        if(x >= batX && x <= batX + batWidth){
            dy = -dy;
        }else {
            alert('Game Over');
            document.location.reload();
        }
    }

    //yo chai Bat move left rah right ko lagi ho !!
    if(rightPressed && batX < canvas.width - batWidth){
        batX +=7;
    }
    else if(leftPressed && batX > 0){
        batX -=7;
    }

    x += dx;
    y += dy;
}
setInterval(draw, 10);

// document.addEventListener("mousemove", mouseMoveHandler, false);

// function mouseMoveHandler(e) {
//     var relativeX = e.clientX - canvas.offsetLeft;
//     if(relativeX > 0 && relativeX < canvas.width) {
//         batX = relativeX - batWidth/2;
//     }
// }
