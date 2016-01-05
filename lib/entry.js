var control = require('./control')()
  , recording = require('./recording')(control)
  , output = require('./output')(control)
  , buffer = require('./buffer')(control.get('delay'))
  ;

control.onChange = function () {
  buffer.setSize(control.get('delay'));
  recording.reset();
};

recording.ondataavailable = function (blob) {
  buffer.add(blob);
};

recording.onerror = function () {
  output.showError();
};

buffer.onTick(function (blob) {
  blob && output.showNext(blob);
});

recording.onstart = function () {
  output.clear();
  output.buffering();
};

recording.begin();
