song_1 = "";
song_2 = "";
LeftWristX = 0;
LeftWristY = 0;
RightWristY = 0;
RightWristX = 0;
scoreRightWrist = 0;
scoreLeftWrist = 0;
function preload() {
    song_1 = loadSound("music.mp3");
    song_2 = loadSound("music2.mp3");
}
function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized')
}


function play() {
    song_1.play();

}

function gotPoses (results)
{
    if(results.length>0)
    {
scoreRightWrist = results[0].pose.keypoints[10].score;
scoreLeftWrist = results[0].pose.keypoints[9].score;

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
    }
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#2d1ba1");
    stroke("#261978");
    if(scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        song.stop();
        song.play(music_1);
    }
    
    if(scoreLeftWrist > 0) {
        circle(leftWristX, leftWristY, 20);
        song.stop();
        song.play(music_2);
    }
}