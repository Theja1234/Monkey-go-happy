var monkey, monkey_running, monkey_collided;
var banana, bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score;
var survivalTime=0;
var ground, groundImage;
var invisibleGround;
var play=1
var end=2
var gameState= play



function preload(){
monkey_running = 
loadAnimation("sprite_0.png","sprite_1.png", "sprite_2.png", "sprite_3.png",
 "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")  
monkey_collided = loadAnimation("sprite_0.png");
bananaImage = loadImage("banana.png");
obstacleImage = loadImage("obstacle.png");
groundImage = loadImage("ground.jpg")  
  
}
  
function setup(){
createCanvas(600,400)

  monkey = createSprite(90,360,20,50)
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("collide", monkey_collided);
  monkey.scale = 0.25;
  
  ground = createSprite(200,250,400,20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width/2;
  ground.scale=1.52;
  monkey.depth=3;
  score=0;
  
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  
  invisibleGround = createSprite(300,399,600,30); 
  invisibleGround.visible = false;
  
  
  //monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
 // monkey.debug = true
  
    
}
  
function draw() {
background("lightblue");

  //monkey.debug = true;
  
if(gameState === play) {
  ground.velocityX = -(4+score/100);
  score=score+ Math.round(frameCount/60)
    
if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
   if(keyDown("space") && monkey.y >= 100) {
     
        monkey.velocityY = -12;
  }  
  
    monkey.velocityY = monkey.velocityY + 0.8
  
  monkey.collide(invisibleGround);  

  spawnbananas();
  spawnobstacles();
  
if(obstacleGroup.isTouching(monkey)){
gameState=end;  
}

  
}
  
 else if(gameState === end) {
   
 monkey.changeAnimation("collide", monkey_collided);
 
 ground.velocityX=0;
   
 monkey.velocityY=0;  
   
 obstacleGroup.setLifetimeEach(-1);
 bananaGroup.setLifetimeEach(-1);
   
 obstacleGroup.setVelocityXEach(0);
 bananaGroup.setVelocityXEach(0)  
   
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach(); 
   
 }
  
  drawSprites();
  stroke("White")
  
  textSize(22);
    fill("white")
   text("Survival Time: "+ score, 300,80);
   //score = score + Math.round(frameCount/60);
  
}
  
function spawnbananas() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,100,50,50);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
    banana.lifetime = 170;
    
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    bananaGroup.add(banana);
  }
}   
  
function spawnobstacles() {
  if (frameCount % 200 === 0) {
    var obstacle = createSprite(620,380,50,50);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.13;
    obstacle.velocityX = -3;
    obstacle.lifetime = 220;
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    obstacleGroup.add(obstacle);
  }
}

function reset()
  {
    gameState=play;
    score=0;
    obstaclegroup.destroyEach()
    bananagroup.destroyEach()
    monkey.changeAnimation("running", moneky_running)
    ground.velocityX= -(4+ score /100)
  }
  

  
  
  
  
  
  