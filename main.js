var status = "";
var object_name = "";

function preload(){

}
    
function setup(){
canvas = createCanvas(450,370);
canvas.center();
video = createCapture(VIDEO);
video.size(450,370);
video.hide();
}

function modelLoaded(){
console.log('Model Loaded');
status = true;
}
 
function start(){
objectDetector = ml5.objectDetector('cocossd',modelLoaded);
document.getElementById("Status").innerHTML = "Status:- Detecting Objects";
object_name  = document.getElementById("input-sky").value;
}

function gotResult(error,results){
if(error){
console.error(error);
}
else{
console.log(results);
}
}

function draw(){
image(video,0,0,450,370);
if(status != ""){
objectDetector.detect(video,gotResult);

for(i=0; i<objects.length; i++){
document.getElementById("Status").innerHTML = "Status:- Objects Detected";
fill("#FF0000");
percente = floor(objects[i].confidence*100);
text(objects[i].label + "" + percente + "%" + objects[i].x+15, objects[i].y+15);
noFill();
stroke("#FF0000");
rect(objects[i].x, objects[i].y,objects[i].width, objects[i].height);


if(objects[i].label == object_name){
video.stop();
objectDetector.detect(gotResult);
document.getElementById("Status").innerHTML = object_name + "Found";

synth = window.speechSynthesis;
utterThis = new SpeechSynthesisUtterance(object_name + "Found");
synth.speak(utterThis);
}
else{
    document.getElementById("Status").innerHTML = object_name + "Not-Found";
}
}
}
}