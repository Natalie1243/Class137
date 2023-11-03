video = "";
status_model = "";
objects = [];

function setup() {
canvas= createCanvas(500, 500);
canvas.center();
}

function preload() {
video = createVideo('video.mp4');
video.hide();
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML= "Status: Detecting objects";
}

function modelLoaded() {
    console.log('Model Loaded');
    status_model = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error, results) {
if(error) {
    console.log(error);
}

else{
    console.log(results);
    objects = results;
}

}

function draw() {
    image(video, 0, 0, 500, 500);
    if(status_model != "")
    {
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : "+ objects.length;

            fill("#FF0000");
            confidence = floor(objects[i].confidence * 100);
            text(objects[i].label + confidence + " % ", objects[i].x + 10 , objects[i].y - 10);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
        }
    }
    }