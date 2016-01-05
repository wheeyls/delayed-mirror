var $ = require('jquery');

var control = function () {
  var me
    , $form = $('#control')
    , attrs = { width: 640, height: 480 }
    , readAttrs = function () {
        attrs.delay = $form.find('[name=delay]').val();
      }
    ;

  me = {
    get: function (name) {
      return attrs[name];
    }

  , onChange: function () { }
  };

  $form.on('submit', function (e) {
    e.preventDefault();
    readAttrs();
    me.onChange();
  });

  $form.on('change', 'input', function (e) {
    $form.submit();
  });

  $form.on('click', '[data-set-width]', function (e) {
    var width = $(this).data().setWidth
      , height = $(this).data().setHeight
      ;

    e.preventDefault();

    attrs.width = width;
    attrs.height = height;

    me.onChange();
  });

  readAttrs();
  return me;
};

module.exports = control;
