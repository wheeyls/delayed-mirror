(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jQuery"));
	else if(typeof define === 'function' && define.amd)
		define(["jQuery"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jQuery")) : factory(root["jQuery"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _control = __webpack_require__(2);

	var _control2 = _interopRequireDefault(_control);

	var _recording = __webpack_require__(4);

	var _recording2 = _interopRequireDefault(_recording);

	var _output = __webpack_require__(5);

	var _output2 = _interopRequireDefault(_output);

	var _buffer = __webpack_require__(6);

	var _buffer2 = _interopRequireDefault(_buffer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var control = (0, _control2.default)(),
	    recording = (0, _recording2.default)(control),
	    output = (0, _output2.default)(control),
	    buffer = (0, _buffer2.default)(control.get('delay'));

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

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jquery = __webpack_require__(3);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var control = function control() {
	  var me = undefined,
	      $form = (0, _jquery2.default)('#control'),
	      attrs = { width: 640, height: 480 },
	      readAttrs = function readAttrs() {
	    attrs.delay = $form.find('[name=delay]').val();
	  };

	  me = {
	    get: function get(name) {
	      return attrs[name];
	    },
	    onChange: function onChange() {}
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
	    var width = (0, _jquery2.default)(this).data().setWidth,
	        height = (0, _jquery2.default)(this).data().setHeight;

	    e.preventDefault();

	    attrs.width = width;
	    attrs.height = height;

	    me.onChange();
	  });

	  readAttrs();
	  return me;
	};

	exports.default = control;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var recording = function recording(control) {
	  var me = undefined,
	      mediaRecorder = null,
	      errBack = function errBack(error) {
	    console.log("Video capture error: ", error.code);
	  };

	  me = {
	    begin: function begin() {
	      var _arguments = arguments;

	      var videoObj = { video: true };

	      if (navigator.getUserMedia) {
	        // Standard
	        navigator.getUserMedia(videoObj, function (stream) {
	          mediaRecorder = new MediaStreamRecorder(stream);
	          mediaRecorder.mimeType = 'video/webm';
	          mediaRecorder.bitsPerSecond = 12800;
	          me.setup();

	          mediaRecorder.ondataavailable = function (blob) {
	            me.ondataavailable(blob);
	          };

	          me.start();
	        }, function () {
	          me.onerror(_arguments);
	        });
	      } else {
	        me.onerror();
	      }

	      me.begin = me.start;
	    },
	    stop: function stop() {
	      if (!mediaRecorder) {
	        return;
	      }
	      mediaRecorder.stop();
	    },
	    setup: function setup() {
	      if (!mediaRecorder) {
	        return;
	      }
	      mediaRecorder.width = control.get('width');
	      mediaRecorder.height = control.get('height');
	    },
	    start: function start() {
	      if (!mediaRecorder) {
	        return;
	      }
	      mediaRecorder.start(1000);
	      me.onstart();
	    },
	    onstart: function onstart() {},
	    reset: function reset() {
	      me.stop();
	      me.setup();
	      me.start();
	    },
	    ondataavailable: function ondataavailable(blob) {},
	    onerror: function onerror() {}
	  };

	  return me;
	};

	var videoObj = { "video": true },
	    errBack = function errBack(error) {
	  console.log("Video capture error: ", error.code);
	};

	exports.default = recording;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jquery = __webpack_require__(3);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var output = function output(control) {
	  var me = undefined,
	      $el = (0, _jquery2.default)('#output'),
	      templateText = "<video class='video' width='WIDTHpx' height='HEIGHTpx' src='URL'></video>",
	      $curr = undefined,
	      $prev = undefined,
	      _buffering = false;

	  return me = {
	    showNext: function showNext(blob) {
	      var out = templateText,
	          blobUrl = URL.createObjectURL(blob),
	          $rem = $prev;

	      if (_buffering) {
	        _buffering = false;
	        $el.html('');
	      }

	      out = out.replace(/WIDTH/, control.get('width'));
	      out = out.replace(/HEIGHT/, control.get('height'));
	      out = out.replace(/URL/, blobUrl);

	      $prev = $curr;
	      $curr = (0, _jquery2.default)(out);
	      $el.append($curr);
	      $el.css({ width: control.get('width'), height: control.get('height') });
	      $curr.get(0).play();
	      $rem && $rem.remove();
	    },
	    showError: function showError() {
	      var output = (0, _jquery2.default)('#error-message').html();
	      $el.html(output);
	    },
	    clear: function clear() {
	      $curr && $curr.remove();
	      $prev && $prev.remove();
	      $el.css({ width: control.get('width'), height: control.get('height') });
	      $el.html('');
	    },
	    buffering: function buffering() {
	      _buffering = true;
	      $el.html('Buffering...');
	    }
	  };
	};

	exports.default = output;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	var buffer = function buffer(size) {
	  var me = undefined,
	      list = undefined,
	      callbacks = [],
	      emit = undefined;

	  emit = function emit(item) {
	    var i = undefined,
	        ii = undefined;

	    for (i = 0, ii = callbacks.length; i < ii; i += 1) {
	      callbacks[i](item);
	    }
	  };

	  me = {
	    next: function next() {
	      return list.shift();
	    },
	    reset: function reset() {
	      var i = undefined;
	      list = new Array(size);
	    },
	    add: function add(item) {
	      list.push(item);

	      while (list.length >= size) {
	        emit(me.next());
	      }
	    },
	    setSize: function setSize(val) {
	      size = parseInt(val, 10);
	      me.reset();
	    },
	    onTick: function onTick(callback) {
	      callbacks.push(callback);
	    }
	  };

	  me.setSize(size);

	  return me;
	};

	module.exports = buffer;

/***/ }
/******/ ])
});
;