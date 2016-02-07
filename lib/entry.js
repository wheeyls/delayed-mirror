import buildControl from './control';
import buildRecording from './recording';
import buildOutput from './output';
import buildBuffer from './buffer';

var control = buildControl()
  , recording = buildRecording(control)
  , output = buildOutput(control)
  , buffer = buildBuffer(control.get('delay'))
  ;

control.onChange = () => {
  buffer.setSize(control.get('delay'));
  recording.reset();
};

recording.ondataavailable = (blob) => {
  buffer.add(blob);
};

recording.onerror = () => {
  output.showError();
};

buffer.onTick((blob) => {
  blob && output.showNext(blob);
});

recording.onstart = () => {
  output.clear();
  output.buffering();
};

recording.begin();
