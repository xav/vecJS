module('M44');

var m44_tests = {
  'constructor': function () {
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

    notEqual(m1.m, m2.m, 'copyTo does not overwrite object');
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

  'fromQ': function () {
    var q1 = new vecJS.Q([1, 2, 3, 4]),
        q2 = q1.clone(),
        m1 = new vecJS.M44(), m1b,
        c = Math.PI / 180;

    m1b = m1.fromQ(q1);
    equal(m1, m1b, 'fromQ return this');
    mequal(q1.q, q2.q, 'fromQ does no modify parameter');

    m1.fromQ(q1.set([0, 0, 0, 1]).q);
    mfequal(m1.m, [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ], 'identity quaternion');

    m1.fromQ(q1.fromPitchYawRoll([90*c, 0, 0]).q);
    mfequal(m1.m, [
      1, 0,  0, 0,
      0, 0, -1, 0,
      0, 1,  0, 0,
      0, 0,  0, 1
    ], '90deg around X');

    m1.fromQ(q1.fromPitchYawRoll([0, 90*c, 0]).q);
    mfequal(m1.m, [
       0, 0, 1, 0,
       0, 1, 0, 0,
      -1, 0, 0, 0,
       0, 0, 0, 1
    ], '90deg around Y');

    m1.fromQ(q1.fromPitchYawRoll([0, 0, 90*c]).q);
    mfequal(m1.m, [
      0, -1, 0, 0,
      1,  0, 0, 0,
      0,  0, 1, 0,
      0,  0, 0, 1
    ], '90deg around Z');
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
    var m1 = new vecJS.M44([
          16, 15, 14, 13,
          12, 11, 10, 9,
          8,  7,  6,  5,
          4,  3,  2,  1
        ]),
        m1b,
        m2 = new vecJS.M44([
           1,  2,  3,  4,
           5,  6,  7,  8,
           9, 10, 11, 12,
          13, 14, 15, 16
        ]);

    m1b = m1.mul(m2.m);
    equal(m1, m1b, 'mul return this');
    mequal(m2.m, [
       1,  2,  3,  4,
       5,  6,  7,  8,
       9, 10, 11, 12,
      13, 14, 15, 16
    ], 'mul does no modify parameter');

    mfequal(m1.m, [
      386, 444, 502, 560,
      274, 316, 358, 400,
      162, 188, 214, 240,
       50,  60,  70,  80
    ], 'mul values');
  },

  'assignMul': function () {
    var m1 = new vecJS.M44(),m1b,
        m2 = new vecJS.M44([
          16, 15, 14, 13,
          12, 11, 10, 9,
          8,  7,  6,  5,
          4,  3,  2,  1
        ]),
        m3 = new vecJS.M44([
           1,  2,  3,  4,
           5,  6,  7,  8,
           9, 10, 11, 12,
          13, 14, 15, 16
        ]);

    m1b = m1.assignMul(m2.m, m3.m);
    equal(m1, m1b, 'assignMul return this');
    mequal(m2.m, [
      16, 15, 14, 13,
      12, 11, 10, 9,
      8,  7,  6,  5,
      4,  3,  2,  1
    ], 'mul does no modify parameter 1');
    mequal(m3.m, [
       1,  2,  3,  4,
       5,  6,  7,  8,
       9, 10, 11, 12,
      13, 14, 15, 16
    ], 'mul does no modify parameter 2');

    mfequal(m1.m, [
      386, 444, 502, 560,
      274, 316, 358, 400,
      162, 188, 214, 240,
       50,  60,  70,  80
    ], 'mul values');
  },

  'det': function () {
    var m1 = new vecJS.M44([
      1, 3,  8, 5,
      1, 3,  6, 1,
      1, 1,  1, 0,
      7, 3, 10, 2
    ]);
    equal(m1.det(), 88, 'det');
    mequal(m1.m, [
      1, 3,  8, 5,
      1, 3,  6, 1,
      1, 1,  1, 0,
      7, 3, 10, 2
    ], 'det does no modify object');
  },

  'transpose': function () {
    var m1 = new vecJS.M44([
      1,  2,  3,  4,
      5,  6,  7,  8,
      9, 10, 11, 12,
     13, 14, 15, 16
    ]), m1b;

    m1b = m1.transpose();

    equal(m1, m1b, 'transpose return this');
    mequal(m1.m, [
      1, 5,  9, 13,
      2, 6, 10, 14,
      3, 7, 11, 15,
      4, 8, 12, 16
    ], 'transpose values');
  },

  'invert': function () {
    var m1 = new vecJS.M44([
       1, 0, 1,  0,
       2, 1, 5,  7,
       0, 5, 2, -6,
      -1, 2, 1,  0
    ]), m1b,
    m2 = m1.clone();

    m1b = m1.invert();
    equal(m1, m1b, 'invert return this');
    mfequal(m1.m, [
      -2 - 11/18,  2/3,  7/9, -2 - 5/18,
      -3 -  1/9,   2/3,  7/9, -1 - 7/9,
       3 + 11/18, -2/3, -7/9,  2 + 5/18,
      -1 -  7/18,  1/3,  2/9, -13/18
    ], 'invert values');

    m1.mul(m2.m);
    mfequal(m1.m, [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ], 'm*inv(m) = identity');
  },

  'lookAtLH': function () {
    var m1 = new vecJS.M44(), m1b,
        eye = new vecJS.V3([8, -5, 5.75]),
        at = new vecJS.V3([-2, 13, -9]),
        up = new vecJS.V3([1, -3, 7]);

    m1b = m1.lookAtLH(eye.v, at.v, up.v);
    equal(m1, m1b, 'lookAtLH returns this');
    mequal(eye.v, [8, -5, 5.75], 'lookAtLH does not modify eye parameter');
    mequal(at.v,  [-2, 13, -9], 'lookAtLH does not modify center parameter');
    mequal(up.v,  [1, -3, 7], 'lookAtLH does not modify up parameter');

    mfequal(m1.m, [
      -0.822465, -0.409489, -0.394803, 0,
      -0.555856,  0.431286,  0.710645, 0,
      -0.120729,  0.803935, -0.582335, 0,
       4.494634,  0.809719, 10.060076, 1
    ], 'lookAtLH values');
  },
  
  'lookAtRH': function () {
    var m1 = new vecJS.M44(), m1b,
        eye = new vecJS.V3([8, -5, 5.75]),
        at = new vecJS.V3([-2, 13, -9]),
        up = new vecJS.V3([1, -3, 7]);

    m1b = m1.lookAtRH(eye.v, at.v, up.v);
    equal(m1, m1b, 'lookAtRH returns this');
    mequal(eye.v, [8, -5, 5.75], 'lookAtRH does not modify eye parameter');
    mequal(at.v,  [-2, 13, -9], 'lookAtRH does not modify center parameter');
    mequal(up.v,  [1, -3, 7], 'lookAtRH does not modify up parameter');

    mfequal(m1.m, [
      0.822465, -0.409489,  0.394803,  0,
      0.555856,  0.431286, -0.710645,  0,
      0.120729,  0.803935,  0.582335,  0,
      -4.494634, 0.809719, -10.060076, 1
    ], 'lookAtRH values');
  },

  'perspectiveFrustum': function () {
    //TODO: perspectiveFrustum
  },

  'perspectiveFov': function () {
    var m1 = new vecJS.M44(), m1b;

    m1b = m1.perspectiveFov(45*(Math.PI/180), 800/600, 1, 10);
    equal(m1, m1b, 'perspectiveFov returns this');
    //TODO: test perspectiveFov values
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
    ok(m.toString(), 'arbitrary matrix');
  }
};

run_test_set(m44_tests);