module('Q');

var q_tests = {
  'constructor': function () {
    var q1 = new vecJS.Q();
    ok(q1, 'Q constructor');

    mequal(q1.q, [0, 0, 0, 0], 'empty constructor');

    var q2 = new vecJS.Q([1, 2, 3, 4]);
    mequal(q2.q, [1, 2, 3, 4], 'values in constructor');
  },

  'set': function () {
    var q1 = new vecJS.Q(), q1b;
    q1b = q1.set([4, 5, 6, 7]);

    equal(q1, q1b, 'set return this');
    mequal(q1.q, [4, 5, 6, 7], 'set values');
  },
  
  'copyTo': function () {
    var q1 = new vecJS.Q([1, 2, 3, 4]), q1b,
      q2 = new vecJS.Q();

    q1b = q1.copyTo(q2.q);

    notEqual(q1.q, q2.q, 'copyTo does not overwrite object');
    equal(q1, q1b, 'copyTo return this');

    mequal(q1.q, [1, 2, 3, 4], 'copy does not modify self');
    mequal(q2.q, [1, 2, 3, 4], 'copyTo values');
  },

  'clone': function () {
    var q1 = new vecJS.Q([1, 2, 3, 4]),
      q2 = q1.clone();

    notEqual(q1, q2, 'clone does not return this');
    notEqual(q1.q, q2.q, 'clone does not return the same object');

    mequal(q1.q, [1, 2, 3, 4], 'clone does not modify object');
    mequal(q2.q, [1, 2, 3, 4], 'clone values');
  },

  'fromMatrix': function () {
    var q1 = new vecJS.Q(), q1b,
      m1 = new vecJS.M34([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0
      ]);

    q1b = q1.fromMatrix(m1.m);
    equal(q1, q1b, 'fromMatrix return this');
    mequal(m1.m, [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0
    ], 'fromMatrix does not modify parameter');
    mfequal(q1.q, [0, 0, 0, 1], 'identity matrix');

    q1b = q1.fromMatrix([
      10, 11,  19,  2,
       5, 20, -21,  3,
       7, 16,  30, -4
    ]);
    mfequal(q1.q, [2.368682, 0.768221, -0.384111, 3.905125], 'test when the trace is >0');

    q1b = q1.fromMatrix([
      -10,  11,  19, 2,
        5, -60, -21, 3,
        7,  16,  40, -4
    ]);
    mfequal(q1.q, [1.233905, -0.237290, 5.267827, -0.284747], 'test the case when the greater element is (2,2)');

    q1b = q1.fromMatrix([
      -10, 11,  19,  2,
        5, 60, -21,  3,
        7, 16, -80, -4
    ]);
    mfequal(q1.q, [0.651031, 6.144103, -0.203447, 0.488273], 'test the case when the greater element is (1,1)');

    q1b = q1.fromMatrix([
      -10, 11,  19,  2,
        5, 10, -21,  3,
        7, 16, -0.9, -4
    ]);
    mfequal(q1.q, [1.709495, 2.339872, -0.534217, 1.282122], 'test the case when the trace is near 0 in a matrix which is not a rotation');

    q1b = q1.fromMatrix([
      -10, 11,  19,    2,
        5, 10, -21,    3,
        7, 16, -0.51, -4
    ]);
    mfequal(q1.q, [1.724923, 2.318944, -0.539039, 1.293692], 'test the case when the trace is 0.49 in a matrix which is not a rotation');

    q1b = q1.fromMatrix([
      -10, 11,  19,    2,
        5, 10, -21,    3,
        7, 16, -0.49, -4
    ]);
    mfequal(q1.q, [1.725726, 2.317865, -0.539289, 1.294294], 'test the case when the trace is 0.51 in a matrix which is not a rotation');

    q1b = q1.fromMatrix([
      -10, 11,  19,    2,
        5, 10, -21,    3,
        7, 16, -0.01, -4
    ]);
    mfequal(q1.q, [1.745328, 2.291833, -0.545415, 1.308996], 'test the case when the trace is 0.99 in a matrix which is not a rotation');

    q1b = q1.fromMatrix([
      -10, 11,  19,  2,
        5, 10, -21,  3,
        7, 16,   0, -4
    ]);
    mfequal(q1.q, [1.745743, 2.291288, -0.545545, 1.309307], 'test the case when the trace is 1 in a matrix which is not a rotation');

    q1b = q1.fromMatrix([
      -10, 11,  19,   2,
        5, 10, -21,   3,
        7, 16, 0.01, -4
    ]);
    mfequal(q1.q, [18.408188, 5.970223, -2.985111, 0.502494], 'test the case when the trace is 11 in a matrix which is not a rotation');

    q1b = q1.fromMatrix([
      -10, 11,  19,  2,
        5, 10, -21,  3,
        7, 16, 0.5, -4
    ]);
    mfequal(q1.q, [15.105186, 4.898980, -2.449490, 0.612372], 'test the case when the trace is 1.5 in a matrix which is not a rotation');

    q1b = q1.fromMatrix([
      -10, 11,  19,   2,
        5, 10, -21,   3,
        7, 16, 0.70, -4
    ]);
    mfequal(q1.q, [14.188852, 4.601790, -2.300895, 0.651920], 'test the case when the trace is 1.7 in a matrix which is not a rotation');

    q1b = q1.fromMatrix([
      -10, 11,  19,   2,
        5, 10, -21,   3,
        7, 16, 0.99, -4
    ]);
    mfequal(q1.q, [13.114303, 4.253287, -2.126644, 0.705337], 'test the case when the trace is 1.99 in a matrix which is not a rotation');

    q1b = q1.fromMatrix([
      -10, 11,  19,  2,
        5, 10, -21,  3,
        7, 16,   2, -4
    ]);
    mfequal(q1.q, [10.680980, 3.464102, -1.732051, 0.866025], 'test the case when the trace is 2 in a matrix which is not a rotation');
  },

  'fromPitchYawRoll': function () {
    var q1 = new vecJS.Q(), q1b,
        c = Math.PI/180;

    q1b = q1.fromPitchYawRoll([0, 0, 0]);
    equal(q1, q1b, 'fromPitchYawRoll return this');
    mequal(q1.q, [0, 0, 0, 1], 'fromPitchYawRoll reference orientation');

    q1.fromPitchYawRoll([90*c, 0, 0]);
    mfequal(q1.q, [0.707106, 0, 0, 0.707106], 'fromPitchYawRoll 90deg Pitch');
    q1.fromPitchYawRoll([180*c, 0, 0]);
    mfequal(q1.q, [1, 0, 0, 0], 'fromPitchYawRoll 180deg Pitch');

    q1.fromPitchYawRoll([0, 90*c, 0]);
    mfequal(q1.q, [0, 0.707106, 0, 0.707106], 'fromPitchYawRoll 90deg Yaw');
    q1.fromPitchYawRoll([0, 180*c, 0]);
    mfequal(q1.q, [0, 1, 0, 0], 'fromPitchYawRoll 180deg Yaw');

    q1.fromPitchYawRoll([0, 0, 90*c]);
    mfequal(q1.q, [0, 0, 0.707106, 0.707106], 'fromPitchYawRoll 90deg Roll');
    q1.fromPitchYawRoll([0, 0, 180*c]);
    mfequal(q1.q, [0, 0, 1, 0], 'fromPitchYawRoll 180deg Roll');

    q1.fromPitchYawRoll([180*c, 180*c, 0]);
    mfequal(q1.q, [0, 0, -1, 0], 'fromPitchYawRoll 180deg Pitch and Yaw');
    q1.fromPitchYawRoll([0, 180*c, 180*c]);
    mfequal(q1.q, [1, 0, 0, 0], 'fromPitchYawRoll 180deg Yaw and Roll');
    q1.fromPitchYawRoll([180*c, 0, 180*c]);
    mfequal(q1.q, [0, -1, 0, 0], 'fromPitchYawRoll 180deg Pitch and Roll');

    q1.fromPitchYawRoll([Math.PI/11, Math.PI/4, Math.PI/3]);
    mfequal(q1.q, [0.303261, 0.262299, 0.410073, 0.819190], 'fromPitchYawRoll arbitrary values');
  },

  'add': function () {
    //TODO: add
  },

  'sub': function () {
    //TODO: sub
  },
  'assignAdd': function () {
    //TODO: assignAdd
  },

  'assignSub': function () {
    //TODO: assignSub
  },

  'mulScalar': function () {
    var q1 = new vecJS.Q([10, 20, 30, 40]), q1b;

    q1b = q1.mulScalar(10);
    equal(q1, q1b, 'mulScalar return this');
    mequal(q1.q, [100, 200, 300, 400], 'mulScalar values');
  },

  'divScalar': function () {
    var q1 = new vecJS.Q([10, 20, 30, 40]), q1b;

    q1b = q1.divScalar(10);
    equal(q1, q1b, 'divScalar return this');
    mequal(q1.q, [1, 2, 3, 4], 'divScalar values');
  },

  'mul': function () {
    var q1 = new vecJS.Q([1, 2, 4, 10]), q1b,
        q2 = new vecJS.Q([-3, 4, -5, 7]);

    q1b = q1.mul(q2.q);

    equal(q1, q1b, 'mul return this');
    mequal(q1.q, [3, 61, -32, 85], 'mul values');
  },

  'dot': function () {
    var q1 = new vecJS.Q([1, 2, 4, 10]),
        q2 = new vecJS.Q([-3, 4, -5, 7]);

    equal(q1.dot(q2.q), 55, 'dot result.');

    mequal(q1.q, [1, 2, 4, 10], 'dot does not modify object');
    mequal(q2.q, [-3, 4, -5, 7], 'dot does not modify parameter');
  },

  'getRoll': function () {
    //TODO: getRoll
  },

  'getPitch': function () {
    //TODO: getPitch
  },

  'getYaw': function () {
    //TODO: getYaw
  },

  'slerp': function () {
    var q1 = new vecJS.Q(), q1b,
        q2 = new vecJS.Q([1, 2, 4, 10]),
        q3 = new vecJS.Q([-3, 4, -5, 7]);

    q1b = q1.slerp(q2.q, q3.q, 0.3);

    equal(q1, q1b, 'slerp return this');
    mfequal(q1.q, [-0.2, 2.6, 1.3, 9.1], 'slerp values');

    //TODO: test shortest path
  },

  'squad': function () {
    var q1 = new vecJS.Q(), q1b,
        a = new vecJS.Q([1, 2, 4, 10]),
        tga = new vecJS.Q([-3, 4, -5, 7]),
        tgb = new vecJS.Q([-1111, 111, -11, 1]),
        b = new vecJS.Q([91, -82, 7.3, -6.4]);

    q1b = q1.squad(a.q, tga.q, tgb.q, b.q, 0.3);
    equal(q1, q1b, 'squad return this');
    mfequal(q1.q, [-156.296005, 30.241998, -2.5022, 7.3576], 'squad values');
  },

  'squadTangent': function () {
    //TODO: squadTangent
  },

  'log': function () {
    var q1 = new vecJS.Q([1, 2, 4, 10]), q1b;

    q1b = q1.log();
    equal(q1, q1b, 'log return this');
    mequal(q1.q, [1, 2, 4, 0], 'log values for len > 1');

    q1 = new vecJS.Q([1/11, 2/11, 4/11, 10/11]).log();
    mfequal(q1.q, [0.093768, 0.187536, 0.375073, 0], 'log values for l = 1');
  },

  'exp': function () {
    var q1 = new vecJS.Q([1, 2, 4, 10]), q1b;
    q1b = q1.exp();
    equal(q1, q1b, 'exp return this');
    mfequal(q1.q, [-0.216381, -0.432763, -0.865527, -0.129449], 'exp values for len >= 1');

    q1 = new vecJS.Q([0.2, 0.1, 0.3, 0.9]).exp();
    mfequal(q1.q, [0.195366, 0.097683, 0.293049, 0.930813], 'exp values for l < 1');
  },

  'length': function () {
    equal(new vecJS.Q().length(), 0, 'null quaternion length');
    equal(new vecJS.Q([10, 0, 0, 0]).length(), 10, 'x quaternion length');
    equal(new vecJS.Q([0, 10, 0, 0]).length(), 10, 'y quaternion length');
    equal(new vecJS.Q([0, 0, 10, 0]).length(), 10, 'z quaternion length');
    equal(new vecJS.Q([0, 0, 0, 10]).length(), 10, 'w quaternion length');
    equal(new vecJS.Q([10, 10, 10, 10]).length(), Math.sqrt(400), 'arbitrary quaternion length');
  },

  'normalize': function () {
    var q1 = new vecJS.Q([1, 2, 3, 4]), q1b;

    q1b = q1.normalize();
    equal(q1, q1b, 'normalize return this');
    fequal(q1.length(), 1, 'normalize makes unit quaternion');
  },

  'isUnit': function () {
    var q1 = new vecJS.V3([1, 2, 3]);
    ok(!q1.isUnit(), 'isUnit returns false on non-unit quaternion');

    q1.normalize();
    ok(q1.isUnit(), 'isUnit on normalized quaternion');
  },

  'toString': function () {
    var q = new vecJS.Q([1, 2, 3, 4]);
    ok(q.toString(), 'arbitrary quaternion');
  },

  'squadSetup': function () {
    
  },
};

run_test_set(q_tests);

