import $ from 'jquery';

let output = (control) => {
  let me
    , $el = $('#output')
    , templateText = "<video class='video' width='WIDTHpx' height='HEIGHTpx' src='URL'></video>"
    , $curr
    , $prev
    , buffering = false
    ;

  return me = {
    showNext(blob) {
      let out = templateText
        , blobUrl = URL.createObjectURL(blob)
        , $rem = $prev
        ;

      if (buffering) {
        buffering = false;
        $el.html('');
      }

      out = out.replace(/WIDTH/, control.get('width'));
      out = out.replace(/HEIGHT/, control.get('height'));
      out = out.replace(/URL/, blobUrl);

      $prev = $curr;
      $curr = $(out);
      $el.append($curr);
      $el.css({ width: control.get('width'), height: control.get('height') });
      $curr.get(0).play();
      $rem && $rem.remove();
    }

  , showError() {
      let output = $('#error-message').html();
      $el.html(output);
    }

  , clear() {
      $curr && $curr.remove();
      $prev && $prev.remove();
      $el.css({ width: control.get('width'), height: control.get('height') });
      $el.html('');
    }

  , buffering() {
      buffering = true;
      $el.html('Buffering...');
    }
  };
};

export default output;
