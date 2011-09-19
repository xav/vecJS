module('M44');

var m44_tests = {
  "constructor": function () {
    var i,j;

    var m1 = new vecJS.M44();
    ok(m1, 'M44 constructor');
  },

  'set': function () {
  },

  'copy': function () {
  },

  'copyTo': function () {
  },

  'clone': function () {
  },

  'fromQuat': function () {
  },

  'identity': function () {
    var m1 = new vecJS.M44().identity();

    function testIdentity(m) {
      for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
          if (m1.m[i + 4 * j] !== (i === j ? 1.0 : 0.0))
            return false;
        }
      }
      return true;
    }

    ok(testIdentity(m1), 'identity matrix');
  },

  'mul': function () {
  },

  'assignMul': function () {
  },

  'transpose': function () {
  },

  'invert': function () {
  },

  'lookAt': function () {
  },

  'frustum': function () {
  },

  'perspective': function () {
  },

  'orthogonal': function () {
  }
};

run_test_set(m44_tests);