module('M34');

var m34_tests = {
  'constructor': function () {
    var m1 = new vecJS.M34();
    ok(m1, 'M34 constructor');

    mequals(m1.m, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 'empty constructor');

    var m2 = new vecJS.M34([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    mequals(m2.m, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 'values in constructor');
  },

  'set': function () {
    var m1 = new vecJS.M34(), m1b;
    m1b = m1.set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

    equals(m1, m1b, 'set return this');
    mequals(m1.m, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 'set values');
  },

  'copyTo': function () {
    var m1 = new vecJS.M34([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]), m1b,
        m2 = new vecJS.M34();

    m1b = m1.copyTo(m2);

    notEqual(m1, m2, 'copyTo does not overwrite object');
    equals(m1, m1b, 'copyTo return this');

    mequals(m1.m, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 'copy does not modify self');
    mequals(m2.m, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 'copyTo values');
  },

  'clone': function () {
    var m1 = new vecJS.M34([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
      m2 = m1.clone();

    notEqual(m1, m2, 'clone does not return this');
    notEqual(m1.m, m2.m, 'clone does not return the same object');

    mequals(m1.m, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 'clone does not modify object');
    mequals(m2.m, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 'clone values');
  },

  'fromQuat': function () {
    //TODO: fromQuat
  },

  'identity': function () {
    var m1 = new vecJS.M34().identity();

    function testIdentity(m) {
      for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 3; j++) {
          if (m1.m[i + 4 * j] !== (i === j ? 1.0 : 0.0))
            return false;
        }
      }
      return true;
    }

    ok(testIdentity(m1), 'identity matrix');
  },

  'mul': function () {
    //TODO: mull
  },

  'assignMul': function () {
    //TODO: assignMul
  },

  'det': function () {
    //TODO: det
  },

  'transpose': function () {
    //TODO: transpose
  },

  'invert': function () {
    //TODO: invert
  },

  'translate': function () {
    //TODO: translate
  },

  'scale': function () {
    //TODO: scale
  },

  'rotate': function () {
    //TODO: rotate
  },

  'rotateX': function () {
    //TODO: rotateX
  },

  'rotateY': function () {
    //TODO: rotateY
  },

  'rotateZ': function () {
    //TODO: rotateZ
  },

  'setTranslate': function () {
    //TODO: setTranslate
  },

  'setScale': function () {
    //TODO: setScale
  },

  'setRotate': function () {
    var m1 = new vecJS.M34(), m1b;
    m1b = m1.setRotate(90*(Math.PI/180), [1, 0, 0]);
    console.debug(m1.toString());
  },

  'setRotateX': function () {
    //TODO: setRotateX
  },

  'setRotateY': function () {
    //TODO: setRotateY
  },

  'setRotateZ': function () {
    //TODO: setRotateZ
  },

  'lookAt': function () {
    //TODO: lookAt
  },

  'toString': function () {
    var m = new vecJS.M34([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    equals(m.toString(), 'M34\n1  2  3  4\n5  6  7  8\n9  10  11  12', 'arbitrary matrix');
  }
};

run_test_set(m34_tests);