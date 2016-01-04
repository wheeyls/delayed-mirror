var $ = require('jquery');

var control = function () {
  var me
    , $form = $('#control')
    , attrs = {}
    , readAttrs = function () {
        attrs.delay = $form.find('[name=delay]').val() * 1000;
        attrs.width = $form.find('[name=width]').val();
        attrs.height = $form.find('[name=height]').val();
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

  $form.on('click', '.js-fill-screen', function (e) {
    e.preventDefault();
    attrs.width = $('body').width();
    attrs.height = $('body').height();

    $form.find('[name=width]').val(attrs.width);
    $form.find('[name=height]').val(attrs.height);

    me.onChange();
  });

  readAttrs();
  return me;
};

module.exports = control;
