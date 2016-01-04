var control = require('./control')()
  , recording = require('./recording')(control)
  , output = require('./output')(control)
  ;

control.onChange = function () {
  recording.reset();
};

recording.ondataavailable = function (blob) {
  output.showNext(blob);
};

recording.onerror = function () {
  output.showError();
};

recording.onstart = function () {
  output.clear();
};

recording.begin();
