var $ = require('jquery');

var output = function (control) {
  var me
    , $el = $('#output')
    , templateText = "<video class='video' width='WIDTHpx' height='HEIGHTpx' src='URL'></video>"
    , $curr
    , $prev
    ;

  return me = {
    showNext: function (blob) {
      var out = templateText
        , blobUrl = URL.createObjectURL(blob)
        , $rem = $prev
        ;

      out = out.replace(/WIDTH/, control.get('width'));
      out = out.replace(/HEIGHT/, control.get('height'));
      out = out.replace(/URL/, blobUrl);

      $prev = $curr;
      $curr = $(out);
      $el.append($curr);
      $curr.get(0).play();
      $rem && $rem.remove();
    }

  , showError: function () {
      $el.html('<h2 class="error">We\'re sorry there was an error; could not access the camera on this device.</h2>');
    }

  , clear: function () {
      $curr && $curr.remove();
      $prev && $prev.remove();
      $el.html('');
    }
  };
};

module.exports = output;
