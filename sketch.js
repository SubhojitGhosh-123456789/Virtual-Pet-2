//Create variables here
var Dog;
var dogImg;
var happyDog;
var foodStock;
var foods;
var database;
var input1;
var input2;
var play;
var bar;
var barImg;
var main;
var mainImg;
var start;
var startImg;
var currentDate;
var currentTime;
var currentHour;
var milk = 20;
var gameOver;
var gameOverImg;
var fedTime;
var lastFed;
var foodObj;

var gameState = "main";

function preload()
{
  //load images here
  dogImg = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");
  mainImg = loadImage("main.png");
  startImg = loadImage("start.png");
  gameOverImg = loadImage("img5.jpg");
  barImg = loadImage("img.png");

}

function setup() {
  createCanvas(800, 800);
  
  Dog = createSprite(430,555,20,20);
  Dog.addImage(dogImg);
  Dog.scale = 0.33;

  main = createSprite(400,400,800,800);
  main.addImage(mainImg);
  main.visible = false;

  start = createSprite(410,610,70,100);
  start.addImage(startImg);
  start.visible = false;

  gameOver = createSprite(400,400,800,800);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;
  gameOver.scale = 1.5;

  bar = createSprite(400,400,800,800);
  bar.addImage(barImg);
  bar.scale = 5;
  bar.visible = false;

  foodObj = new Food(foods, lastFed);

  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val()
  });

  title = createElement('h1');
  title.html("Virtual Pet -2");
  title.position(630,100);
  title.hide();

  title1 = createElement('h2');
  title1.html("Name :");
  title1.position(550,235);
  title1.hide();

  title2 = createElement('h2');
  title2.html("Pet's Name :");
  title2.position(510,290);
  title2.hide();

  input1 = createInput("");
  input1.position(650,260);
  input1.hide();

  input2 = createInput("");
  input2.position(650,320);
  input2.hide();

  play = createButton("Submit");
  play.position(710,400);
  play.mousePressed(submit);
  play.hide();

  feed = createButton("Feed The Dog");
  feed.position(650,795);
  feed.mousePressed(feedDog);
  feed.hide();

  addFood = createButton("Add Food");
  addFood.position(850,795);
  addFood.mousePressed(addFoods);
  addFood.hide();
  

}


function draw() {  

  background(46,139, 87);

  time();

  foodObj.display();

  if(gameState === "main"){
    main.visible = true;
  }

  drawSprites();
  //add styles here
  if(gameState === "play"){

    fill(255);
  
  textSize(25)
  text("Time:  "+ currentTime,560,90);

  textSize(25)
  text("Date:  "+ currentDate,560,50);

  textSize(25)
  text("Current Milk Stock:  "+ milk,40,200);

  textSize(25)
  text("litres",310,200);

  textSize(25)
  text("1 Litre Milk Bottle",600,180);

  fill(255,255,254);
  textSize(25);
  if(lastFed>=12){
  text("Last Fed :  "+ lastFed%12 + " "+ "PM",300,50);
  }else if(lastFed == 0){
  text("Last Fed : 12 PM",300,50);
  }else{
  text("Last Fed :  "+ lastFed +" "+"AM",300,50);  
  }
  }

   if(mousePressedOver(start)){
    main.visible = false;
    start.visible = false;
    bar.visible = true;
    play.show();
    input1.show();
    input2.show();
    title.show();
    title1.show();
    title2.show();
    gameState="play";
 }

  if(gameState === "main"){
    main.visible = true;
    start.visible = true;
  }

}
function writeStock(x){
   
  if(x<=0){
    x=0;
  }else{
    x = x - 1;
  }

  database.ref("/").update({
    Food : x
});

console.log(x);

}
function readStock(data){
 foods = data.val();
}
function writeTime(){
  database.ref("/").update({
    FeedTime : currentHour
});
}

async function time(){
  var response = await fetch ("https://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();
  var dateTime  = responseJSON.datetime;
  var t = dateTime.slice(11,19);
  var d = dateTime.slice(0,10);
  var h = dateTime.slice(11,13);

  currentDate = d;
  currentTime = t;
  currentHour = h;

}
function addFoods(){
  foods++;
  milk++;
  foodObj.foodStock++;
  database.ref("/").update({
    Food : foods
});

}
function feedDog(){
  writeStock(foods);
  foodObj.foodStock--;
  milk = milk-1;
  Dog.addImage(happyDog);
  writeTime();
  

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref("/").update({
    Food : foodObj.getFoodStock(),
    FeedTime : hour()

});

}
function submit(){
  play.hide();
  input1.hide();
  input2.hide();
  title.hide();
  title1.hide();
  title2.hide();
  bar.visible = false;
  feed.show();
  addFood.show();

  var name = input1.value();
  var petname = input2.value();

  var greeting1 = createElement('h2');
  greeting1.html("Welcome " + name +"!!");
  greeting1.position(430,130);

  var greeting2 = createElement('h2');
  greeting2.html(petname);
  greeting2.position(730,450);
}




