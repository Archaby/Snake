window.onload = function() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    
    var scoreId = document.getElementById("score");
    
    var arrSnake = [];
    var lengthSnake = 0;
    var arrSnakeCoordinate = [];
    var arrToClearRect = [];
    
    var xFood;
    var yFood;
    
    var arrAreaX = [10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350,360,370,380,390];
    var arrAreaY = [10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290];
    
    var score = 0;
    
    var headCoordinateX;
    var headCoordinateY;
    
    var xMoveSnake = 100;
    var yMoveSnake = 150;
    
    var snakeIsMove = false;
    var isRightMove = false;
    var isLeftMove = false;
    var isUpMove = false;
    var isDownMove = false;
    
    var isCollision = false;
    
    var isInsideFood = false;
    
    function newGame() {
        arrSnake = [];
        lengthSnake = 0;
        arrSnakeCoordinate = [];
        arrToClearRect = [];
        score = 0;
        snakeIsMove = false;
        isRightMove = false;
        isLeftMove = false;
        isUpMove = false;
        isDownMove = false;
        xMoveSnake = 100;
        yMoveSnake = 150;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawFood();    
    }
    
    function playerWin() {
        if(score == 113000) {
            alert("You win!");
            newGame();
        } 
    }
    
    function playerGameOver() {
        //if(arrSnakeCoordinate.length < 4) return;
        
        arrSnakeCoordinate.forEach(function(element, index) {
            if(index > 3) {
                if(xMoveSnake == element[0] && yMoveSnake == element[1]) {
                    isCollision = true;
                    /*console.log("xMoveSnake : " + xMoveSnake);
                    console.log(index + ":" + element);*/
                    return;
                }
            }
        });
        
        if(isCollision) {
            isCollision = false;
            alert("Game over!");
            newGame();
        }
    }
    
    function drawFood() {
        xFood = arrAreaX[(Math.floor(Math.random()*38))];
        yFood = arrAreaY[(Math.floor(Math.random()*28))];
        
        arrSnakeCoordinate.forEach(function(element) {
            if(xFood == element[0] && yFood == element[1]) isInsideFood = true;    
        });
        
        if(isInsideFood) {
            isInsideFood = false;
            drawFood();
        }
        
        isInsideFood = false;
    
        ctx.fillStyle="yellow";
        ctx.fillRect(xFood, yFood, 10, 10);
        }
    
    function updateCoordinate() {
        if(lengthSnake > 0) {
            if(arrToClearRect.length > lengthSnake) {
                ctx.clearRect(arrToClearRect[0][0], arrToClearRect[0][1], 10, 10);
                arrToClearRect.shift();
            }
        }       
    
        if(arrSnake.length > 0) {
            arrSnake.forEach(function(element, index) {    
            ctx.fillStyle="white";
            ctx.fillRect(arrSnakeCoordinate[index][0], arrSnakeCoordinate[index][1], 10, 10);   
            });        
        }
    }
    
    function drawSnake() {
        playerWin();
        
        scoreId.innerHTML = "Score: " + score;
        
        if(lengthSnake < 1) {
            ctx.clearRect(xMoveSnake, yMoveSnake, 10, 10);
            ctx.fillStyle="white";
        }
        
        document.addEventListener("keydown", keyPress, false);
        
        if(!snakeIsMove) {
            if(xMoveSnake<=400) ctx.fillRect(xMoveSnake+=10, yMoveSnake, 10, 10);
            else xMoveSnake = 0;
        }
        
        if(isUpMove) {
            if(yMoveSnake>0) ctx.fillRect(xMoveSnake, yMoveSnake-=10, 10, 10);
            else yMoveSnake = 300;
        }
        else if(isDownMove) {
            if(yMoveSnake<300) ctx.fillRect(xMoveSnake, yMoveSnake+=10, 10, 10);
            else yMoveSnake = 0;
        }
        else if(isLeftMove) {
            if(xMoveSnake>0) ctx.fillRect(xMoveSnake-=10, yMoveSnake, 10, 10);
            else xMoveSnake = 400;
        }
        else if(isRightMove) {
            if(xMoveSnake<400) ctx.fillRect(xMoveSnake+=10, yMoveSnake, 10, 10);
            else xMoveSnake = 0;
        }
        
        function keyPress(e) {
            snakeIsMove = true;
            if(e.keyCode == 38 && !isDownMove) {
                isUpMove = true;
                isDownMove = false;
                isLeftMove = false;
                isRightMove = false;      
            }
            else if(e.keyCode == 40 && !isUpMove) {
                isUpMove = false;
                isDownMove = true;
                isLeftMove = false;
                isRightMove = false;   
            }
            else if(e.keyCode == 37 && !isRightMove) {
                isUpMove = false;
                isDownMove = false;
                isLeftMove = true;
                isRightMove = false;   
            }
            else if(e.keyCode == 39 && !isLeftMove) {
                isUpMove = false;
                isDownMove = false;
                isLeftMove = false;
                isRightMove = true;    
            }
        }
        
        updateCoordinate();
        
        playerGameOver();
        
        if(xMoveSnake == xFood && yMoveSnake == yFood) {
            lengthSnake++;
            arrSnake.push(lengthSnake);
            score += 100;
            coordinateSnake();
            drawFood();
        }
        else {
            if(lengthSnake == 1) {
                ctx.fillStyle="white";
                ctx.fillRect(xMoveSnake, yMoveSnake, 10, 10);
                arrSnakeCoordinate.pop();
                arrSnakeCoordinate.push([xMoveSnake, yMoveSnake]);
                
                arrToClearRect.push([xMoveSnake, yMoveSnake]);
            }
            else if(lengthSnake > 1) {
                if(arrToClearRect.length < lengthSnake+1) {
                    arrToClearRect.push([xMoveSnake, yMoveSnake]);   
                }
                else {
                    arrToClearRect.shift();
                    arrToClearRect.push([xMoveSnake, yMoveSnake]);
                }
                ctx.fillStyle="white";
                ctx.fillRect(xMoveSnake, yMoveSnake, 10, 10);
                arrSnakeCoordinate.shift();
                arrSnakeCoordinate.push([xMoveSnake, yMoveSnake]);
            }
        }
        
        function coordinateSnake() {
            arrSnakeCoordinate.push([xMoveSnake, yMoveSnake]);
            arrToClearRect.push([xMoveSnake, yMoveSnake]);
        }
        
    }                                
    
    function draw() {
        drawFood();
        setInterval(drawSnake, 1000/7);
    }
    
    draw();
}