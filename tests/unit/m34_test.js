module('M34');

var m34_tests = {
  'constructor': function () {
    var m1 = new vecJS.M34();
    ok(m1, 'M34 constructor');

    mequal(m1.m, [
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0
    ], 'empty constructor');

    var m2 = new vecJS.M34([
      1,  2,  3,  4,
      5,  6,  7,  8,
      9, 10, 11, 12
    ]);
    mequal(m2.m, [
      1,  2,  3,  4,
      5,  6,  7,  8,
      9, 10, 11, 12
    ], 'values in constructor');
  },

  'set': function () {
    var m1 = new vecJS.M34(), m1b;
    m1b = m1.set([
      1, 2, 3, 4,
      5, 6, 7, 8,
      9, 10, 11, 12
    ]);

    equal(m1, m1b, 'set return this');
    mequal(m1.m, [
      1, 2, 3, 4,
      5, 6, 7, 8,
      9, 10, 11, 12
    ], 'set values');
  },

  'copyTo': function () {
    var m1 = new vecJS.M34([
      1,  2,  3,  4,
      5,  6,  7,  8,
      9, 10, 11, 12
    ]), m1b,
        m2 = new vecJS.M34();

    m1b = m1.copyTo(m2.m);

    notEqual(m1.m, m2.m, 'copyTo does not overwrite object');
    equal(m1, m1b, 'copyTo return this');

    mequal(m1.m, [
      1,  2,  3,  4,
      5,  6,  7,  8,
      9, 10, 11, 12
    ], 'copy does not modify self');
    mequal(m2.m, [
      1,  2,  3,  4,
      5,  6,  7,  8,
      9, 10, 11, 12
    ], 'copyTo values');
  },

  'clone': function () {
    var m1 = new vecJS.M34([
      1,  2,  3,  4,
      5,  6,  7,  8,
      9, 10, 11, 12
    ]),
      m2 = m1.clone();

    notEqual(m1, m2, 'clone does not return this');
    notEqual(m1.m, m2.m, 'clone does not return the same object');

    mequal(m1.m, [
      1,  2,  3,  4,
      5,  6,  7,  8,
      9, 10, 11, 12
    ], 'clone does not modify object');
    mequal(m2.m, [
      1,  2,  3,  4,
      5,  6,  7,  8,
      9, 10, 11, 12
    ], 'clone values');
  },

  'fromQ': function () {
    var q1 = new vecJS.Q([1, 2, 3, 4]),
        q2 = q1.clone(),
        m1 = new vecJS.M34(), m1b,
        c = Math.PI / 180;

    m1b = m1.fromQ(q1.q);
    equal(m1, m1b, 'fromQ return this');
    mequal(q1.q, q2.q, 'fromQ does no modify parameter');

    m1.fromQ(q1.set([0, 0, 0, 1]).q);
    mfequal(m1.m, [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0
    ], 'identity quaternion');

    m1.fromQ(q1.fromPitchYawRoll([90*c, 0, 0]).q);
    mfequal(m1.m, [
      1, 0,  0, 0,
      0, 0, -1, 0,
      0, 1,  0, 0
    ], '90deg around X');

    m1.fromQ(q1.fromPitchYawRoll([0, 90*c, 0]).q);
    mfequal(m1.m, [
       0, 0, 1, 0,
       0, 1, 0, 0,
      -1, 0, 0, 0
    ], '90deg around Y');

    m1.fromQ(q1.fromPitchYawRoll([0, 0, 90*c]).q);
    mfequal(m1.m, [
      0, -1, 0, 0,
      1,  0, 0, 0,
      0,  0, 1, 0
    ], '90deg around Z');
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
    var m1 = new vecJS.M34([
          12, 11, 10, 9,
          8,  7,  6, 5,
          4,  3,  2, 1
        ]),
        m1b,
        m2 = new vecJS.M34([
          1,  2,  3,  4,
          5,  6,  7,  8,
          9, 10, 11, 12
        ]);

    m1b = m1.mul(m2.m);
    equal(m1, m1b, 'mul return this');
    mequal(m2.m, [
      1,  2,  3,  4,
      5,  6,  7,  8,
      9, 10, 11, 12
    ], 'mul does no modify parameter');

    mfequal(m1.m, [
      157, 190, 223, 265,
       97, 118, 139, 165,
       37,  46,  55, 65
    ], 'mul values');
  },

  'assignMul': function () {
    var m1 = new vecJS.M34(), m1b,
        m2 = new vecJS.M34([
          12, 11, 10, 9,
          8,  7,  6, 5,
          4,  3,  2, 1
        ]),
        m3 = new vecJS.M34([
          1,  2,  3,  4,
          5,  6,  7,  8,
          9, 10, 11, 12
        ]);

    m1b = m1.assignMul(m2.m, m3.m);
    equal(m1, m1b, 'assignMul return this');
    mequal(m2.m, [
      12, 11, 10, 9,
      8,  7,  6, 5,
      4,  3,  2, 1
    ], 'mul does no modify parameter 1');
    mequal(m3.m, [
      1,  2,  3,  4,
      5,  6,  7,  8,
      9, 10, 11, 12
    ], 'mul does no modify parameter 2');

    mfequal(m1.m, [
      157, 190, 223, 265,
       97, 118, 139, 165,
       37,  46,  55, 65
    ], 'mul values');
  },

  'det': function () {
    var m1 = new vecJS.M34([
      1, 3, 8, 5,
      1, 3, 6, 1,
      1, 1, 1, 0
    ]);

    equal(m1.det(), -4, 'det');
    mequal(m1.m, [
      1, 3, 8, 5,
      1, 3, 6, 1,
      1, 1, 1, 0
    ], 'det does no modify object');
  },

  'transpose': function () {
    var m1 = new vecJS.M34([
      1,  2,  3,  4,
      5,  6,  7,  8,
      9, 10, 11, 12
    ]), m1b;

    m1b = m1.transpose();

    equal(m1, m1b, 'transpose return this');
    mequal(m1.m, [
      1, 5,  9, 0,
      2, 6, 10, 0,
      3, 7, 11, 0
    ], 'transpose values');
  },

  'invert': function () {
    var m1 = new vecJS.M34([
      1, 2,  1, 0,
      3, 4, 10, 1,
      5, 2,  8, 0
    ]), m1b,
    m2 = m1.clone();

    m1b = m1.invert();
    equal(m1, m1b, 'invert return this');
    mfequal(m1.m, [
       0.24, -0.28,  0.32,  0.28,
       0.52,  0.06, -0.14, -0.06,
      -0.28,  0.16, -0.04, -0.16
    ], 'invert values');

    m1.mul(m2.m);
    mfequal(m1.m, [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0
    ], 'm*inv(m) = identity');
  },

  'translate': function () {
    var m1 = new vecJS.M34([
      0, 0, 1, 1,
      1, 0, 0, 2,
      0, 1, 0, 3
    ]), m1b;

    m1b = m1.translate([10, 20, 30]);
    equal(m1, m1b, 'translate return this');
    mfequal(m1.m, [
      0, 0, 1, 31,
      1, 0, 0, 12,
      0, 1, 0, 23
    ], 'translate values');
  },

  'scale': function () {
    var m1 = new vecJS.M34([
      1,  2,  3,  4,
      5,  6,  7,  8,
      9, 10, 11, 12
    ]), m1b;

    m1b = m1.scale([2, 4, 6]);
    equal(m1, m1b, 'scale return this');
    mfequal(m1.m, [
       2,  8, 18,  4,
      10, 24, 42,  8,
      18, 40, 66, 12
    ], 'scale values');
  },

  'rotate': function () {
    var m1 = new vecJS.M34([
      1,  2,  3,  4,
      5,  6,  7,  8,
      9, 10, 11, 12
    ]), m1b,
    v1 = new vecJS.V3([1, 1, 1]).normalize(),
    v2 = v1.clone();

    m1b = m1.rotate(120*(Math.PI/180), v1.v);

    equal(m1, m1b, 'rotate return this');
    mequal(v1.v, v2.v, 'rotate does not modify parameter');

    mfequal(m1.m, [
       2,  3, 1,  4,
       6,  7, 5,  8,
      10, 11, 9, 12
    ], 'rotate values');
  },

  'rotateX': function () {
    var m1 = new vecJS.M34([
      1,  2,  3,  4,
      5,  6,  7,  8,
      9, 10, 11, 12
    ]), m1b;

    m1b = m1.rotateX(90*(Math.PI/180));

    equal(m1, m1b, 'rotateX return this');

    mfequal(m1.m, [
      1,  3,  -2, 4.000,
      5,  7,  -6, 8.000,
      9, 11, -10, 12.000
    ], 'rotateX values');
  },

  'rotateY': function () {
    var m1 = new vecJS.M34([
      1,  2,  3,  4,
      5,  6,  7,  8,
      9, 10, 11, 12
    ]), m1b;

    m1b = m1.rotateY(90*(Math.PI/180));

    equal(m1, m1b, 'rotateY return this');

    mfequal(m1.m, [
       -3,  2, 1,  4.000,
       -7,  6, 5,  8.000,
      -11, 10, 9, 12.000
    ], 'rotateY values');
  },

  'rotateZ': function () {
    var m1 = new vecJS.M34([
      1,  2,  3,  4,
      5,  6,  7,  8,
      9, 10, 11, 12
    ]), m1b;

    m1b = m1.rotateZ(90*(Math.PI/180));

    equal(m1, m1b, 'rotateZ return this');

    mfequal(m1.m, [
       2, -1,  3, 4.000,
       6, -5,  7, 8.000,
      10, -9, 11, 12.000
    ], 'rotateZ values');
  },

  'setTranslate': function () {
    var m1 = new vecJS.M34([
      1,  2,  3,  4,
      5,  6,  7,  8,
      9, 10, 11, 12
    ]), m1b,
    v1 = new vecJS.V3([10, 20, 30]),
    v2 = v1.clone();

    m1b = m1.setTranslate(v1.v);

    equal(m1, m1b, 'setTranslate return this');
    mequal(v1.v, v2.v, 'setTranslate does not modify parameter');

    mfequal(m1.m, [
      1,  2,  3, 10,
      5,  6,  7, 20,
      9, 10, 11, 30
    ], 'setTranslate values (no overwrite)');

    m1b = m1.setTranslate([40, 50, 60], true);
    mfequal(m1.m, [
      1, 0, 0, 40,
      0, 1, 0, 50,
      0, 0, 1, 60
    ], 'setTranslate values (overwrite)');
  },

  'setScale': function () {
    var m1 = new vecJS.M34([
      1,  2,  3,  4,
      5,  6,  7,  8,
      9, 10, 11, 12
    ]), m1b,
    v1 = new vecJS.V3([10, 20, 30]),
    v2 = v1.clone();

    m1b = m1.setScale(v1.v);

    equal(m1, m1b, 'setScale return this');
    mequal(v1.v, v2.v, 'setScale does not modify parameter');

    mfequal(m1.m, [
      10,  0,  0, 0,
       0, 20,  0, 0,
       0,  0, 30, 0
    ], 'setScale values');
  },

  'setRotate': function () {
    var m1 = new vecJS.M34(), m1b,
        c = Math.PI/180;

    m1b = m1.setRotate(0, [1, 0, 0]);
    equal(m1, m1b, 'setRotate returns this');
    mfequal(m1.m, [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0
    ], 'no rotation values');

    m1.setRotate(90*c, [1, 0, 0]);
    mfequal(m1.m, [
      1, 0,  0, 0,
      0, 0, -1, 0,
      0, 1,  0, 0
    ], '90deg around X');

    m1.setRotate(90*c, [0, 1, 0]);
    mfequal(m1.m, [
       0, 0, 1, 0,
       0, 1, 0, 0,
      -1, 0, 0, 0
    ], '90deg around Y');

    m1.setRotate(90*c, [0, 0, 1]);
    mfequal(m1.m, [
      0, -1, 0, 0,
      1,  0, 0, 0,
      0,  0, 1, 0
    ], '90deg around Z');

    var v1 = new vecJS.V3([1, 1, 1]).normalize(),
        v2 = v1.clone();
    mequal(v1.v, v2.v, 'setRotate does not change parameter');
    m1.setRotate(90*c, v1.v);
    mfequal(m1.m, [
       0.333333, -0.244017,  0.910684, 0,
       0.910684,  0.333333, -0.244017, 0,
      -0.244017,  0.910684,  0.333333, 0
    ], '90deg around arbitrary vector.');

    // even permutation
    m1.setRotate(120*c, v1.v);
    mfequal(m1.m, [
      0, 0, 1, 0,
      1, 0, 0, 0,
      0, 1, 0, 0
    ], '120deg around vector x=y=z.');
  },

  'setRotateX': function () {
    var m1 = new vecJS.M34(), m1b,
        c = Math.PI/180;

    m1b = m1.setRotateX(0);
    equal(m1, m1b, 'setRotateX returns this');
    mfequal(m1.m, [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0
    ], 'no rotation values');

    m1.setRotateX(90*c);
    mfequal(m1.m, [
      1, 0,  0, 0,
      0, 0, -1, 0,
      0, 1,  0, 0
    ], '90deg around X');

    m1.setRotateX(180*c);
    mfequal(m1.m, [
      1,  0,  0, 0,
      0, -1,  0, 0,
      0,  0, -1, 0
    ], '180deg around X');

    m1.setRotateX(360*c);
    mfequal(m1.m, [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0
    ], '360deg around X');
  },

  'setRotateY': function () {
    var m1 = new vecJS.M34(), m1b,
        c = Math.PI/180;

    m1b = m1.setRotateY(0);
    equal(m1, m1b, 'setRotateY returns this');
    mfequal(m1.m, [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0
    ], 'no rotation values');

    m1.setRotateY(90*c);
    mfequal(m1.m, [
       0, 0, 1, 0,
       0, 1, 0, 0,
      -1, 0, 0, 0
    ], '90deg around Y');

    m1.setRotateY(180*c);
    mfequal(m1.m, [
      -1, 0,  0, 0,
       0, 1,  0, 0,
       0, 0, -1, 0
    ], '180deg around Y');

    m1.setRotateY(360*c);
    mfequal(m1.m, [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0
    ], '360deg around Y');
  },

  'setRotateZ': function () {
    var m1 = new vecJS.M34(), m1b,
        c = Math.PI/180;

    m1b = m1.setRotateZ(0);
    equal(m1, m1b, 'setRotateZ returns this');
    mfequal(m1.m, [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0
    ], 'no rotation values');

    m1.setRotateZ(90*c);
    mfequal(m1.m, [
      0, -1, 0, 0,
      1,  0, 0, 0,
      0,  0, 1, 0
    ], '90deg around Z');

    m1.setRotateZ(180*c);
    mfequal(m1.m, [
      -1,  0, 0, 0,
       0, -1, 0, 0,
       0,  0, 1, 0
    ], '180deg around Z');

    m1.setRotateZ(360*c);
    mfequal(m1.m, [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0
    ], '360deg around Z');
  },

  'toString': function () {
    var m = new vecJS.M34([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    ok(m.toString(), 'arbitrary matrix');
  }
};

run_test_set(m34_tests);