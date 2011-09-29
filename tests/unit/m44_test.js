module('M44');

var m44_tests = {
  "constructor": function () {
    var i,j;

    var m1 = new vecJS.M44();
    ok(m1, 'M44 constructor');
    mequal(m1.m, [
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0], 'empty constructor');

    var m2 = new vecJS.M44([
       1,  2,  3,  4,
       5,  6,  7,  8,
       9, 10, 11, 12,
      13, 14, 15, 16
    ]);
    mequal(m2.m, [
       1,  2,  3,  4,
       5,  6,  7,  8,
       9, 10, 11, 12,
      13, 14, 15, 16
    ], 'values in constructor');
  },

  'set': function () {
    var m1 = new vecJS.M44(), m1b;
    m1b = m1.set([
       1,  2,  3,  4,
       5,  6,  7,  8,
       9, 10, 11, 12,
      13, 14, 15, 16
    ]);

    equal(m1, m1b, 'set return this');
    mequal(m1.m, [
       1,  2,  3,  4,
       5,  6,  7,  8,
       9, 10, 11, 12,
      13, 14, 15, 16
    ], 'set values');
  },

  'copyTo': function () {
    var m1 = new vecJS.M44([
       1,  2,  3,  4,
       5,  6,  7,  8,
       9, 10, 11, 12,
      13, 14, 15, 16
    ]), m1b,
      m2 = new vecJS.M44();

    m1b = m1.copyTo(m2.m);

    notEqual(m1, m2, 'copyTo does not overwrite object');
    equal(m1, m1b, 'copyTo return this');

    mequal(m1.m, [
      1,  2,  3,  4,
      5,  6,  7,  8,
      9, 10, 11, 12,
     13, 14, 15, 16
    ], 'copy does not modify self');
    mequal(m2.m, [
      1,  2,  3,  4,
      5,  6,  7,  8,
      9, 10, 11, 12,
     13, 14, 15, 16
    ], 'copyTo values');
  },

  'clone': function () {
    var m1 = new vecJS.M44([
      1,  2,  3,  4,
      5,  6,  7,  8,
      9, 10, 11, 12,
     13, 14, 15, 16
    ]),
      m2 = m1.clone();

    notEqual(m1, m2, 'clone does not return this');
    notEqual(m1.m, m2.m, 'clone does not return the same object');

    mequal(m1.m, [
      1,  2,  3,  4,
      5,  6,  7,  8,
      9, 10, 11, 12,
     13, 14, 15, 16
    ], 'clone does not modify object');
    mequal(m2.m, [
      1,  2,  3,  4,
      5,  6,  7,  8,
      9, 10, 11, 12,
     13, 14, 15, 16
    ], 'clone values');
  },

  'fromQuat': function () {
    //TODO: fromQuat
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
    //TODO: mul
  },

  'assignMul': function () {
    //TODO: assignMul
  },

  'transpose': function () {
    //TODO: transpose
  },

  'det': function () {
    var m1 = new vecJS.M44([
      1, 3,  8, 5,
      1, 3,  6, 1,
      1, 1,  1, 0,
      7, 3, 10, 2
    ]);
    //TODO: equal(m1.det(), 88, 'det');
  },

  'invert': function () {
    //TODO: invert
  },

  'lookAt': function () {
    var m1 = new vecJS.M44(), m1b,
        eye = new vecJS.V3([1, 2, 3]),
        target = new vecJS.V3([4, 5, 6]),
        up = new vecJS.V3([7, 8, 9]);

    m1b = m1.lookAt(eye.v, target.v, up.v);
    equal(m1, m1b, 'lookAt returns this');
    mequal(eye.v, [1, 2, 3], 'lookAt does not modify eye parameter');
    mequal(target.v, [4, 5, 6], 'lookAt does not modify center parameter');
    mequal(up.v, [7, 8, 9], 'lookAt does not modify up parameter');

    m1.lookAt(
      [10, 0, 0],
      [0, 0, 0],
      [0, 1, 0]
    );
    //TODO: check lookAt values
  },


  'frustum': function () {
    //TODO: frustum
  },

  'perspective': function () {
    //TODO: perspective
  },

  'orthogonal': function () {
    //TODO: orthogonal
  },

  'toString': function () {
    var m = new vecJS.M44([
      1,  2,  3,  4,
      5,  6,  7,  8,
      9, 10, 11, 12,
     13, 14, 15, 16
    ]);
    equal(m.toString(), 'M44\n1  2  3  4\n5  6  7  8\n9  10  11  12\n13  14  15  16', 'arbitrary matrix');
  }
};

run_test_set(m44_tests);