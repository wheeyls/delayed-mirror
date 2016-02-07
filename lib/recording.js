let recording = (control) => {
  let me
    , mediaRecorder = null
    , errBack = function (error) { console.log("Video capture error: ", error.code); }
    ;

  me = {
    begin() {
      let videoObj = { video: true }
        ;

      if (navigator.getUserMedia) { // Standard
        navigator.getUserMedia(videoObj, (stream) => {
          mediaRecorder = new MediaStreamRecorder(stream);
          mediaRecorder.mimeType = 'video/webm';
          mediaRecorder.bitsPerSecond = 12800;
          me.setup();

          mediaRecorder.ondataavailable = (blob) => {
            me.ondataavailable(blob);
          };

          me.start();
        }, () => { me.onerror(arguments); });
      } else {
        me.onerror();
      }

      me.begin = me.start;
    }

  , stop() {
      if (!mediaRecorder) { return; }
      mediaRecorder.stop();
    }

  , setup() {
      if (!mediaRecorder) { return; }
      mediaRecorder.width = control.get('width');
      mediaRecorder.height = control.get('height');
    }

  , start() {
      if (!mediaRecorder) { return; }
      mediaRecorder.start(1000);
      me.onstart();
    }

  , onstart() { }

  , reset() {
      me.stop();
      me.setup();
      me.start();
    }

  , ondataavailable(blob) {}

  , onerror() {}
  };

  return me;
};

let videoObj = { "video": true }
  , errBack = (error) => {
      console.log("Video capture error: ", error.code);
    }
  ;

export default recording;
