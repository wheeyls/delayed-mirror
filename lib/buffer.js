var buffer = function (size) {
  var me
    , list
    , callbacks = []
    , emit
    ;

  emit = function (item) {
    var i, ii;

    console.log('tick', item, list);
    for (i = 0, ii = callbacks.length; i < ii; i += 1) {
      callbacks[i](item);
    }
  }

  me = {
    next: function () {
      return list.shift();
    }

  , reset: function () {
      var i;
      list = new Array(size);
    }

  , add: function (item) {
      console.log('add', item, list);
      list.push(item);

      while (list.length >= size) {
        emit(me.next());
      }
    }

  , setSize: function (val) {
      console.log('setting', val);
      size = parseInt(val, 10);
      me.reset();
    }

  , onTick: function (callback) {
      callbacks.push(callback);
    }
  };

  me.setSize(size);

  return me;
};

module.exports = buffer;
