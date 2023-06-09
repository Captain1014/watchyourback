let video;
let poseNet;
let noseX = 0;
let noseY = 0;
let eyelX = 0;
let eyelY = 0;
let maskImg;
let myFont;

function preload() {
  maskImg = loadImage('hands.png', function() {
    console.log("image loaded");
  });
  
  myFont = loadFont('Phantom Fingers.ttf');
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', gotPoses);
  textFont(myFont);
}

function gotPoses(poses) {
  if (poses.length > 0) {
    let nX = poses[0].pose.keypoints[0].position.x;
    let nY = poses[0].pose.keypoints[0].position.y;
    let eX = poses[0].pose.keypoints[1].position.x;
    let eY = poses[0].pose.keypoints[1].position.y;
    noseX = lerp(noseX, nX, 0.5);
    noseY = lerp(noseY, nY, 0.5);
    eyelX = lerp(eyelX, eX, 0.5);
    eyelY = lerp(eyelY, eY, 0.5);
  }
}

function modelReady() {
  console.log('model ready');
}

function draw() {
  image(video, 0, 0);
  
  let d = dist(noseX, noseY, eyelX, eyelY);
  
  // Draw image over nose and mouth
  image(maskImg, noseX-160, noseY+100, d*4, d*2);
  
  textSize(32);
  textAlign(CENTER, CENTER);
 
  text("WATCH YOUR BACK", width/2, height/2);

  fill(255, 0, 0);

}

