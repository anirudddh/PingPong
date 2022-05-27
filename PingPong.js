    var canvas=document.getElementById("canvas");
    var ctx=canvas.getContext("2d");
    var radius=10;
    var uppress=false;
    var downpress=false;
    var leftpress=false;
    var rightpress=false;
    document.addEventListener("keydown",keyDownHandler,false);
    document.addEventListener("keyup",keyUpHandler,false);
    var dir;
    let point=new Audio();
    let hit=new Audio();
    point.src="/home/kunal/Desktop/IMG Project/26f8b9_sonic_ring_sound_effect.mp3";
    hit.src="/home/kunal/Desktop/IMG Project/Mario-jump-sound.mp3"
    var user={
        x:0,
        y:(canvas.height-80)/2,
        height:80,
        width:10,
        color:"#66b266",
        score:0
    };
    var comp={
        x:(canvas.width-10),
        y:(canvas.height-80)/2,
        height:80,
        width:10,
        color:"#7f7fff",
        score:0
    };
    var ball={
        x:(canvas.width/2),
        y:(canvas.height/2),
        radius:10,
        color:"BLACK",
        speedx:2,
        speedy:0,
        speed:3
    };
    function keyDownHandler(a){
        if(a.key=="ArrowUp"||a.key=="Up"){
            uppress=true;
        }
        if(a.key=="ArrowDown"||a.key=="Down"){
            downpress=true;
        }
        if(a.key=="ArrowRight"||a.key=="Right"){
            rightpress=true;
        }
        if(a.key=="ArrowLeft"||a.key=="Left"){
            leftpress=true;
        }
    }
    function keyUpHandler(a){
        if(a.key=="ArrowUp"||a.key=="Up"){
            uppress=false;
        }
        if(a.key=="ArrowDown"||a.key=="Down"){
            downpress=false;
        }
        if(a.key=="ArrowRight"||a.key=="Right"){
            rightpress=false;
        }
        if(a.key=="ArrowLeft"||a.key=="Left"){
            leftpress=false;
        }
    }
    
    function drawrect(x,y,width,height,color){
        ctx.beginPath();
        ctx.rect(x,y,width,height);
        ctx.fillStyle=color;
        ctx.fill();
    }
    function text(x,y,text,color){
        ctx.fillStyle=color;
        ctx.font="20px Arial";
        ctx.fillText(text,x,y);
    }
    function drawcircle(x,y,radius,color){
        ctx.beginPath();
        ctx.arc(x,y,radius,0,Math.PI*2,false);
        ctx.fillStyle=color;
        ctx.fill();
    }
    //reset the ball to default position
    function reset(){
        ball.x=canvas.width/2;
        ball.y=canvas.height/2;
        ball.speed=3;
        ball.speedx=dir*2;
        ball.speedy=0;
        user.x=0;
        comp.x=canvas.width-10;
        user.y=(canvas.height-80)/2;
        comp.y=(canvas.height-80)/2;
    }
    function move(){
        ball.x+=ball.speedx;
        ball.y+=ball.speedy;
        if(ball.y+ball.speedy>canvas.height||ball.y+ball.speedy<0){
            ball.speedy=-ball.speedy;
            //hit.play();
        }
        var player;
        if(ball.x<(canvas.width/2)){
            player=user;
        }
        else if(ball.x>(canvas.width/2)){
            player=comp;
        }
        if(detectCollision(ball,player)){
            var collisionpoint=-(player.y+(player.height/2)-ball.y)/(player.height/2);
            //ball.speed=Math.sqrt(Math.pow(ball.speedx,2)+Math.pow(ball.speedy,2));
            angle=(Math.PI/6)*collisionpoint;
            if(player==user){
                direction=1;
            }
            if(player==comp){
                direction=-1
            }
            ball.speedx=ball.speed*Math.cos(angle)*direction;
            ball.speedy=ball.speed*Math.sin(angle);
            ball.speed+=.1;
            //hit.play();
        }
        if(uppress){
            user.y-=5;
            if(user.y<0){
                user.y=0;
            }
        }
    
        if(downpress){
            user.y+=5;
            if(user.y+user.height>canvas.height){
                user.y=canvas.height-user.height;
            }
        }
            if(rightpress){
                user.x+=3;
                if(user.x>canvas.width/10){
                    user.x=canvas.width/10;
                }
            }
            if(leftpress){
                user.x-=3;
                if(user.x<0){
                    user.x=0;
                }
            }
        
        
        comp.y += ((ball.y - (comp.y + comp.height/2)))*(0.05);  //defines the movement of computer
        if(comp.y+comp.height>canvas.height){
        comp.y=canvas.height-comp.height;
        }
        else if(comp.y<0){
            comp.y=0;
        }
        if(ball.x-ball.radius<0){
            comp.score++;
            //point.play();
             dir=1;
            if(comp.score==5){
            alert("Aniruddh Wins. Click OK to start new game");
            document.location.reload();
            }
            reset();
            
        }
        if(ball.x+ball.radius>canvas.width){
            user.score++;
            //point.play();
             dir=-1;
            if(user.score==5){
                alert("User Wins. Click OK to start new game");
                document.location.reload();
                clearInterval(interval);
            }
            reset();
        }
    }
    function detectCollision(b,p){
        b.top=b.y-b.radius;
        b.bottom=b.y+b.radius;
        b.left=b.x-b.radius;
        b.right=b.x+b.radius;
        p.top=p.y;
        p.bottom=p.y+p.height;
        p.left=p.x;
        p.right=p.x+p.width;
        return (b.left<p.right && b.right>p.left && b.bottom>p.top && b.top<p.bottom)
    }
    
    function draw(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        drawrect(user.x,user.y,user.width,user.height,user.color);
        drawrect(comp.x,comp.y,comp.width,comp.height,comp.color);
        drawcircle(ball.x,ball.y,ball.radius,ball.color);
        text(canvas.width/4,canvas.height/7,user.score,"BLACK");
        text(3*canvas.width/4,canvas.height/7,comp.score,"BLACK");
        for(var c=0;c<=400;c+=40){
            drawrect((canvas.width/2-1),20+c,2,20,"BLACK");   
        }
        move();
        //point.play();
    }
    var interval=setInterval(draw,10);