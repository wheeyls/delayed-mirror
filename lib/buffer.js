let buffer = (size) => {
  let me
    , list
    , callbacks = []
    , emit
    ;

  emit = (item) => {
    let i, ii;

    for (i = 0, ii = callbacks.length; i < ii; i += 1) {
      callbacks[i](item);
    }
  };

  me = {
    next() {
      return list.shift();
    }

  , reset() {
      let i;
      list = new Array(size);
    }

  , add(item) {
      list.push(item);

      while (list.length >= size) {
        emit(me.next());
      }
    }

  , setSize(val) {
      size = parseInt(val, 10);
      me.reset();
    }

  , onTick(callback) {
      callbacks.push(callback);
    }
  };

  me.setSize(size);

  return me;
};

module.exports = buffer;
