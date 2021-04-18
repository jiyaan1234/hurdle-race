var runner, ground
var hurdle1,hurdle2
var invisibleGround,count,HurldeGroup,gameState

function preload(){
  runnerimg=loadImage("runner.png")
  restartimg=loadImage("restart.png")
  hurdle1img=loadImage("hurdle1.png")
  hurdle2img=loadImage("hurdle2.png")

}


function setup() {
createCanvas(windowWidth,windowHeight)

PLAY= 1;
END = 0;
gameState = PLAY;
 
runner = createSprite(60,height-50,0,0);
runner.addImage("runner",runnerimg);
runner.scale=0.3;
runner.debug = true;

ground = createSprite(width/2,height-30,width,20);
//ground.setAnimation("ground2.png_1");
ground.x = ground.width /2;
ground.velocityX = -(6 + 3*count/100);

invisibleGround = createSprite(width/2,height-20,width,20);
invisibleGround.visible = false;

HurdleGroup = createGroup();

gameOver = createSprite(width/2,height/2);
restart = createSprite(width/2,height/2 + 100);
//gameOver.setAnimation("gameOver.png_1");
gameOver.scale = 0.5;
restart.addImage("restart",restartimg);
restart.scale = 0.5;

gameOver.visible = false;
restart.visible = false;

textSize(18);
textFont("Georgia");



count=0;
}


function draw() {
  background("white");
  
  text("Score: "+ count, 250, 100);
 console.log(gameState);
 
 if(gameState === PLAY){
   //move the ground
   ground.velocityX = -(6 + 3*count/100);
   //scoring
   count =count+Math.round(frameRate/60);
   
     
   if (ground.x < 0){
     ground.x = ground.width/2;
   }
   
   if(keyDown("space") && runner.collide(invisibleGround)){
     runner.velocityY = -18 ;
   }
 
 runner.velocityY = runner.velocityY + 0.8;
 
  Hurdle1();
 
 if(HurdleGroup.isTouching(runner)){
     gameState = END;
   }
 }
 
 else if(gameState === END) {
   gameOver.visible = true;
   restart.visible = true;
   
   //set velcity of each game object to 0
   ground.velocityX = 0;
   runner.velocityY = 0;
   HurdleGroup.setVelocityXEach(0);

HurdleGroup.setLifetimeEach(-1);
 }
 
  if(mousePressedOver(restart)) {
   reset();
  }
   
    runner.collide(invisibleGround);
    

//  Hurdle2
 
 
 
 drawSprites();
 
}

function reset(){
  
  gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false;
  HurdleGroup.destroyEach();
  runner.addImage("runner",runningImg);
  count = 0;
}

function Hurdle1(){
  
  
  if(frameCount% 111 === 0){
     hurdle1 = createSprite(width,height-100);
    hurdle1.velocityX = - (6 + 3*count/100);
hurdle1.scale=0.5;
hurdle1.debug= true;
hurdle1.setCollider("rectangle",0,0,250,250);
var rand = Math.round(random(1,2));
switch(rand){
  case 1:hurdle1.addImage("hurdle1",hurdle1img)
  break;
  case 2:hurdle1.addImage("hurdle2",hurdle2img)
  break;
  default:break
}

hurdle1.depth = runner.depth;
runner.depth = runner.depth + 1;
HurdleGroup.add(hurdle1);

}
}

