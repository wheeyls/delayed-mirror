var canvas = document.getElementById("output")
  , context = canvas.getContext("2d")
  , video = document.getElementById("video")
  , videoObj = { "video": true }
  , errBack = function (error) {
      console.log("Video capture error: ", error.code);
    }
  ;

if (navigator.getUserMedia) { // Standard
  navigator.getUserMedia(videoObj, function(stream) {
    var mediaRecorder = new MediaStreamRecorder(stream);
    mediaRecorder.mimeType = 'video/webm';

    mediaRecorder.ondataavailable = function (blob) {
      var blobUrl = URL.createObjectURL(blob);
      video.src = blobUrl;
    };

    mediaRecorder.start(5000);
  }, errBack);
}
