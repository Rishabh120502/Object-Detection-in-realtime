img= "";
status = "";
objects = [];

function preload(){
img = loadImage("dog_cat.jpg");
}

function setup(){
canvas= createCanvas(380,380);
canvas.center();
video=createCapture(VIDEO);
video.hide();
video.size(380,380);

ObjectDetector= ml5.objectDetector("cocossd",modelLoaded);
document.getElementById("status").innerHTML=" STATUS : DETECTING OBJECTS";
}

function draw(){
image(video,0,0,380,380);
if(status != ""){
    r = random(255);
    g = random(255);
    b = random(255);

    ObjectDetector.detect(video,gotResults);
for(var i = 0;i<objects.length;i++){
document.getElementById("status").innerHTML = "Status : Objects Detected";
document.getElementById("number_of_objects").innerHTML = "The number of objects detected are :"+objects.length;
fill(r,g,b);

percent = floor(objects[i].confidence*100);
text(objects[i].label + " "+ percent + "%",objects[i].x+10,objects[i].y+20);
noFill();
stroke(r,g,b);
rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
}
}
}

function modelLoaded(){
    console.log("MODEL LOADED!");
    status=true;
  
}

function gotResults(error,results){
if(error){
    console.error("error");
}
else{
    console.log(results);
    objects = results;
}
}