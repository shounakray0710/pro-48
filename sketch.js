var bg,bgImg;
var player;
var obstacle;
var obstaclegroup;
var score =0;
var num
function preload(){
  bgImg = loadImage("assets/background.gif")
  playerImg = loadAnimation("assets/aeroplane.png")
  obstacleImg1 = loadImage("assets/obstacle.png")
  obstacleImg2 = loadImage("assets/helicopter.png")
  blastImg = loadAnimation("assets/blast.png")
}

function setup() {
  createCanvas(1200,600);

  bg = createSprite(width/2,height/2,width,height);
  bg.addImage(bgImg)
  bg.scale=1.5
  bg.velocityX=-1

  player = createSprite(140,80);
  player.addAnimation("player",playerImg)
  player.addAnimation("blast",blastImg)
  player.scale = 0.5

  obstaclegroup = new Group();
  bulletgroup = new Group();
}

function draw() {
  background(0); 

  if(bg.x<width/2-85){
   bg.x=width/2
  }
  if (keyDown("up")) {
    player.y=player.y-7;
  }
  if (keyDown("down")) {
    player.y=player.y+7;
  }
  obstacles()
  
  if(obstaclegroup.isTouching(bulletgroup)){
    for(var i=0;i< obstaclegroup.length;i++){
      if( obstaclegroup.isTouching(bulletgroup)){
       obstaclegroup.get(i).destroy()
       bulletgroup.get(i).destroy()
       score=score+5
      }
    }
  }
   
if(obstaclegroup.isTouching(player)){
  obstaclegroup.setVelocityXEach(0)
obstaclegroup.destroyEach();
player.changeAnimation("blast",blastImg)
player.scale = 0.4
player.velocityY = 0

bg.velocityX = 0
}


 if(keyDown("space")){
   bullet = createSprite(player.x+100,player.y,20,10)
   bullet.velocityX = 10
   bulletgroup.add(bullet)
   player.depth = bullet.depth
   player.depth = player.depth+1
 } 

 
       
drawSprites();
textSize(25)
fill("white")
text("Score:"+score,900,50)
}
function  obstacles(){
  if(frameCount%80===0){
    obstacle = createSprite(1200,random(100,height/2))
    num = Math.round(random(1,2))
    if(num ===1){
      obstacle.addImage(obstacleImg1)
      obstacle.scale =0.2
    }
    else if(num ===2){
      obstacle.addImage(obstacleImg2)
      obstacle.scale =0.55
    }
  
    obstacle.velocityX = -7
    obstacle.lifetime = 600
    obstaclegroup.add( obstacle);
  }
}