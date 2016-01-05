var recording = function (control) {
  var me
    , control
    , mediaRecorder = null
    , errBack = function (error) { console.log("Video capture error: ", error.code); }
    ;

  return me = {
    begin: function () {
      var videoObj = { video: true }
        ;

      if (navigator.getUserMedia) { // Standard
        navigator.getUserMedia(videoObj, function(stream) {
          mediaRecorder = new MediaStreamRecorder(stream);
          mediaRecorder.mimeType = 'video/webm';
          mediaRecorder.bitsPerSecond = 12800;
          me.setup();

          mediaRecorder.ondataavailable = function (blob) {
            me.ondataavailable(blob);
          };

          me.start();
        }, function () { me.error(arguments); });
      } else {
        me.onerror();
      }

      me.begin = me.start;
    }

  , stop: function () {
      if (!mediaRecorder) { return; }
      mediaRecorder.stop();
    }

  , setup: function () {
      if (!mediaRecorder) { return; }
      mediaRecorder.width = control.get('width');
      mediaRecorder.height = control.get('height');
    }

  , start: function () {
      if (!mediaRecorder) { return; }
      mediaRecorder.start(1000);
      me.onstart();
    }

  , onstart: function () { }

  , reset: function () {
      me.stop();
      me.setup();
      me.start();
    }

  , ondataavailable: function (blob) {}

  , onerror: function () {}
  };
};

var videoObj = { "video": true }
  , errBack = function (error) {
      console.log("Video capture error: ", error.code);
    }
  ;

module.exports = recording;
