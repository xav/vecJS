module('M44');

var m44_tests = {
  "constructor": function () {
    var i,j;

    var m1 = new vecJS.M44();
    ok(m1, 'M44 constructor');
    mequals(m1.m, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 'empty constructor');

    var m2 = new vecJS.M44([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
    mequals(m2.m, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], 'values in constructor');
  },

  'set': function () {
    var m1 = new vecJS.M44(), m1b;
    m1b = m1.set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);

    equals(m1, m1b, 'set return this');
    mequals(m1.m, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], 'set values');
  },

  'copyTo': function () {
    var m1 = new vecJS.M44([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]), m1b,
        m2 = new vecJS.M44();

    m1b = m1.copyTo(m2);

    notEqual(m1, m2, 'copyTo does not overwrite object');
    equals(m1, m1b, 'copyTo return this');

    mequals(m1.m, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], 'copy does not modify self');
    mequals(m2.m, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], 'copyTo values');
  },

  'clone': function () {
    var m1 = new vecJS.M44([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]),
      m2 = m1.clone();

    notEqual(m1, m2, 'clone does not return this');
    notEqual(m1.m, m2.m, 'clone does not return the same object');

    mequals(m1.m, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], 'clone does not modify object');
    mequals(m2.m, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], 'clone values');
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