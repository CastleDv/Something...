var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudImg;
var cactus, cactus1Img, cactus2Img, cactus3Img, cactus4Img, cactus5Img, cactus6Img;
var score, HIscore;
var clouds; 
var cactusall; 
var gameState = "play";
var restart, restartImg;
var gameOver, gameOverImg;
var invisiblecircle;
var vision, radius;
var jumpsound, checkpointsound, diesound;


function preload() {
trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");               
trex_collided = loadImage("trex_collided.png");
groundImage = loadImage("ground2.png")
cloudImg = loadImage("cloud.png");
cactus1Img = loadImage("obstacle1.png");
cactus2Img = loadImage("obstacle2.png");
cactus3Img = loadImage("obstacle3.png");
cactus4Img = loadImage("obstacle4.png");
cactus5Img = loadImage("obstacle5.png");
cactus6Img = loadImage("obstacle6.png");
restartImg = loadImage("restart.png");
gameOverImg = loadImage("gameOver.png");
jumpsound = loadSound("jump.mp3");
checkpointsound = loadSound("checkpoint.mp3");
diesound = loadSound("die.mp3")
}

function setup() {

createCanvas(windowWidth,windowHeight);

//create a trex sprite
trex = createSprite(50,160,20,50);
trex.addAnimation("running", trex_running);
trex.scale = .5;


invisiblecircle = createSprite(50, 160, 1, 1);
invisiblecircle.visible = false;
invisiblecircle.debug = false;

invisiblecircle.setCollider("circle", 30, 0, -50);
HIscore = 0;
restart = createSprite(300,120,20,50);
restart.addImage(restartImg);
restart.scale = 0.5;
gameOver = createSprite(300,80,20,50);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.5;
restart.visible = false;
gameOver.visible = false;
vision = 30;
radius = 50;
//create a ground sprite
ground = createSprite(200,180,400,20);
ground.addImage("ground",groundImage);
ground.x = ground.width /2;
invisibleGround = createSprite(200,195,400,20);
invisibleGround.visible = false;
trex.setCollider("circle", 0 ,0 ,35);
ground.velocityX = -6;
score = 0;
clouds = new Group();
cactusall = new Group();
trex.debug = true;

}

function draw() {
if (gameState === "play"){
    
    score = frameCount;
        if (touches.length > 0 ||keyDown("space") && trex.collide(invisibleGround)) {
        trex.velocityY = -11;
        jumpsound.play();
        touches = [];
        }
        
        if (keyDown("DOWN_ARROW")) {
            trex.velocityY = 15;
            }
    trex.velocityY = trex.velocityY + 0.8;    
    
    SpawnCactus();
    
        if (ground.x < 0) {
        ground.x = ground.width / 2;
        }
        if(frameCount % 100 === 0){
        ground.velocityX = ground.velocityX -.1;
        checkpointsound.play();    
        }    
         //inteligencia del trex version beta
        /*if (invisiblecircle.radius = ground.velocityX){
          vision = vision * 1.001;
          invisiblecircle.setCollider("circle",vision, 0, radius);
        }
       
        if (vision > 60){
          vision = 60;
          radius = radius * 1.01;
        }
        if (radius > 50 && vision === 60){
          radius = 50;
        }*/
} else if (gameState === "end"){
  trex.addAnimation("running", trex_collided);
  ground.velocityX = 0;
  cactusall.setVelocityXEach (0);
  cactusall.setLifetimeEach = -1;
  restart.visible = true;
  gameOver.visible = true;
  //reinicio de parametros de la IA
  /*vision = 30;
  radius = 50;*/
  
         if (HIscore < score){
         HIscore = score;
         }
         if(mousePressedOver(restart)){
            reset();
         }
}

if (trex.isTouching(cactusall)){
  gameState = "end";
  trex.velocityY = 0;
  //diesound.play();
}


//if (invisiblecircle.isTouching(cactusall) && trex.collide(invisibleGround)){
  //  trex.velocityY = -11;
  //}
//if (invisiblecircle.isTouching(cactusall) === false){
  //  trex.velocityY = 15;
//}

background(300);
//jump when the space button is pressed

trex.collide(invisibleGround);
SpawnClouds();
drawSprites();

textSize(10);
text("score = "+ score, 200, 200);
text("HI = "+ HIscore, 300, 200);
}  
function reset (){
  gameState = "play";
  restart.visible = false;
  gameOver.visible = false;
  cactusall.destroyEach();
  trex.addAnimation("running", trex_running);
  frameCount = 0;
  cactusall.setLifetimeEach = 200;
  ground.velocityX = -6;
}

function SpawnClouds(){

var randforclouds = Math.round(random(20,80));
var randscale = random(0.1,0.2);
var randvelocityX = random(-1,-3);

    if(frameCount % 60 === 0){
        
       cloud = createSprite (windowWidth + 100, randforclouds, 1, 1);
       cloud.velocityX = randvelocityX;
       cloud.addImage(cloudImg);
       cloud.scale = randscale;
       trex.depth = cloud.depth + 1;
       gameOver.depth = cloud.depth + 1;
       restart.depth = cloud.depth + 1;
       cloud.lifetime = 650;
       clouds.add(cloud);
    }

}
function SpawnCactus() {
  var randforcactus = Math.round(random(1,6));

  if(frameCount % 60 === 0){   

    cactus = createSprite (windowWidth + 100, 165, 50, 50);
    cactus.velocityX = ground.velocityX;
    cactus.scale = 0.5;
    cactus.debug = true;
    switch (randforcactus){
     
      case 1:
      cactus.addImage(cactus1Img);
        break
      case 2:
      cactus.addImage(cactus2Img);
        break
      case 3:
      cactus.addImage(cactus3Img);
        break
      case 4:
       cactus.addImage(cactus4Img);

        break
      case 5:
      cactus.addImage(cactus5Img);
      
        break
       case 6:
      cactus.addImage(cactus6Img);
     

        default:   
        cactus.addImage(cactus1Img);
        break
    }
    cactusall.add(cactus);
    cactusall.setLifetimeEach = 200;
    
 }
}
