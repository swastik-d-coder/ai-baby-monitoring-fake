img="";
Status="";
objects=[];

function preload() {
	sound = loadSound("alarm.wav");

}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function start() {
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("STATUS").innerHTML = "Status : Detecting Objects";

}

function draw() {
    image(video, 0, 0, 380, 380);
   if(Status != ""){
    r = random(255);
    g = random(255);
    b = random(255);
    objectDetector.detect(video, gotResult);
for(i=0; i<objects.length; i++){
if(objects == "person") {
     document.getElementById("status").innerHTML = "Person detected";
   sound.play();
}
else
{
    document.getElementById("status").innerHTML = "Person not detected";
    sound.play();
}
document.getElementById("STATUS").innerHTML = "Status: Object Detected";
document.getElementById("number_of_objects").innerHTML = "Number Of objects detected are : " + objects.length;

fill(r,g,b);
confidence=Math.floor(objects[i].confidence*100);
text(objects[i].label+" "+confidence+"%",objects[i].x, objects[i].y);
noFill();
stroke(r,g,b);
rect(objects[i].x, objects[i].y, objects[i].height, objects[i].width);
}

if(objects.length < 0) {
    document.getElementById("status").innerHTML = "Person not detected";
  sound.play();
}

   }
}

function modelLoaded() {
    console.log("Model Loaded!");
    Status = true;
    
}

function gotResult(error, results) {
if (error) {
    console.log(error);
}
console.log(results);
objects=results;
}