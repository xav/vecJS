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
        0, 0, 1, 0,
        1, 0, 0, 0,
        0, 1, 0, 0
      ]);

    q1b = q1.fromMatrix(m1.m);
    equal(q1, q1b, 'fromMatrix return this');
    mequal(m1.m, [
      0, 0, 1, 0,
      1, 0, 0, 0,
      0, 1, 0, 0
    ], 'fromMatrix does not modify parameter');

    mfequal(q1.q, [0.5, 0.5, 0.5, 0.5], 'fromMatrix values');
  },

  'fromEuler': function () {
    var q1 = new vecJS.Q(), q1b,
        c = Math.PI/180;

    q1b = q1.fromEuler([0, 0, 0]);
    equal(q1, q1b, 'fromEuler return this');
    mequal(q1.q, [0, 0, 0, 1], 'fromEuler reference orientation');

    q1b = q1.fromEuler([90*c, 0, 0]);
    mfequal(q1.q, [0.707106, 0, 0, 0.707106], 'fromEuler 90deg around X');
    q1b = q1.fromEuler([180*c, 0, 0]);
    mfequal(q1.q, [1, 0, 0, 0], 'fromEuler 180deg around X');

    q1b = q1.fromEuler([0, 90*c, 0]);
    mfequal(q1.q, [0, 0.707106, 0, 0.707106], 'fromEuler 90deg around Y');
    q1b = q1.fromEuler([0, 180*c, 0]);
    mfequal(q1.q, [0, 1, 0, 0], 'fromEuler 180deg around Y');

    q1b = q1.fromEuler([0, 0, 90*c]);
    mfequal(q1.q, [0, 0, 0.707106, 0.707106], 'fromEuler 90deg around Z');
    q1b = q1.fromEuler([0, 0, 180*c]);
    mfequal(q1.q, [0, 0, 1, 0], 'fromEuler 180deg around Z');

    q1b = q1.fromEuler([180*c, 180*c, 0]);
    mfequal(q1.q, [0, 0, -1, 0], 'fromEuler 180deg around X&Y');
    q1b = q1.fromEuler([0, 180*c, 180*c]);
    mfequal(q1.q, [-1, 0, 0, 0], 'fromEuler 180deg around Y&Z');
    q1b = q1.fromEuler([180*c, 0, 180*c]);
    mfequal(q1.q, [0, 1, 0, 0], 'fromEuler 180deg around X&Z');
  },

  'add': function () {
    //TODO: add
  },

  'sub': function () {
    //TODO: sub
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
    //TODO: slerp
  },

  'squad': function () {
    //TODO: squad
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

/*
q = [1, 2, 4, 10];
r = [-3, 4, -5, 7];
t = [-1111, 111, -11, 1];
u = [91, -82, 7.3, -6.4];
 */

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
  }
};

run_test_set(q_tests);

