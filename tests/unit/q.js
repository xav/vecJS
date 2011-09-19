module('Q');

var q_tests = {
  'constructor': function () {
    var q1 = new vecJS.Q();
    ok(q1, 'Q constructor');

    mequals(q1.q, [0, 0, 0, 0], 'empty constructor');

    var q2 = new vecJS.Q([1, 2, 3, 4]);
    mequals(q2.q, [1, 2, 3, 4], 'constructor');
  },

  'set': function () {
    var q1 = new vecJS.Q();
    q1.set([4, 5, 6, 7]);
    mequals(q1.q, [4, 5, 6, 7], 'set values');
  },
  
  'copyTo': function () {
    var q1 = new vecJS.Q([1, 2, 3, 4]), q1b,
      q2 = new vecJS.Q();

    q1b = q1.copyTo(q2);

    notEqual(q1, q2, 'copyTo does not overwrite object');
    equals(q1, q1b, 'copyTo return this');

    mequals(q1.q, [1, 2, 3, 4], 'copy does not modify self');
    mequals(q2.q, [1, 2, 3, 4], 'copyTo values');
  },

  'clone': function () {
    var q1 = new vecJS.Q([1, 2, 3, 4]),
      q2 = q1.clone();

    notEqual(q1, q2, 'clone does not return this');
    notEqual(q1.q, q2.q, 'clone does not return the same object');

    mequals(q1.q, [1, 2, 3, 4], 'clone does not modify object');
    mequals(q2.q, [1, 2, 3, 4], 'clone values');
  },

  'fromMatrix': function () {
  },

  'fromEuler': function () {
    var q1 = new vecJS.Q(), q1b,
        c = Math.PI/180;

    q1b = q1.fromEuler([0, 0, 0]);
    equals(q1, q1b, 'fromEuler return this');
    mequals(q1.q, [0, 0, 0, 1], 'fromEuler reference orientation');

    q1b = q1.fromEuler([90*c, 0, 0]);
    mfequals(q1.q, [0.707106, 0, 0, 0.707106], 'fromEuler 90deg around X');
    q1b = q1.fromEuler([180*c, 0, 0]);
    mfequals(q1.q, [1, 0, 0, 0], 'fromEuler 180deg around X');

    q1b = q1.fromEuler([0, 90*c, 0]);
    mfequals(q1.q, [0, 0.707106, 0, 0.707106], 'fromEuler 90deg around Y');
    q1b = q1.fromEuler([0, 180*c, 0]);
    mfequals(q1.q, [0, 1, 0, 0], 'fromEuler 180deg around Y');

    q1b = q1.fromEuler([0, 0, 90*c]);
    mfequals(q1.q, [0, 0, 0.707106, 0.707106], 'fromEuler 90deg around Z');
    q1b = q1.fromEuler([0, 0, 180*c]);
    mfequals(q1.q, [0, 0, 1, 0], 'fromEuler 180deg around Z');

    q1b = q1.fromEuler([180*c, 180*c, 0]);
    mfequals(q1.q, [0, 0, -1, 0], 'fromEuler 180deg around X&Y');
    q1b = q1.fromEuler([0, 180*c, 180*c]);
    mfequals(q1.q, [-1, 0, 0, 0], 'fromEuler 180deg around Y&Z');
    q1b = q1.fromEuler([180*c, 0, 180*c]);
    mfequals(q1.q, [0, 1, 0, 0], 'fromEuler 180deg around X&Z');
  },

  'add': function () {
  },

  'sub': function () {
  },
  
  'mulScalar': function () {
    var q1 = new vecJS.Q([10, 20, 30, 40]), q1b;

    q1b = q1.mulScalar(10);
    equals(q1, q1b, 'mulScalar return this');
    equals(q1.q[0], 100, 'mulScalar first component');
    equals(q1.q[1], 200, 'mulScalar second component');
    equals(q1.q[2], 300, 'mulScalar third component');
    equals(q1.q[3], 400, 'mulScalar fourth component');
  },

  'divScalar': function () {
    var q1 = new vecJS.Q([10, 20, 30, 40]), q1b;

    q1b = q1.divScalar(10);
    equals(q1, q1b, 'divScalar return this');
    equals(q1.q[0], 1, 'divScalar first component');
    equals(q1.q[1], 2, 'divScalar second component');
    equals(q1.q[2], 3, 'divScalar third component');
    equals(q1.q[3], 4, 'divScalar fourth component');
  },

  'mul': function () {
  },

  'dot': function () {
  },

  'slerp': function () {
  },

  'squad': function () {
  },

  'squadTangent': function () {
  },

  'log': function () {
  },

  'exp': function () {
  },

  'length': function () {
    equals(new vecJS.Q().length(), 0, 'null quaternion length');
    equals(new vecJS.Q([10, 0, 0, 0]).length(), 10, 'x quaternion length');
    equals(new vecJS.Q([0, 10, 0, 0]).length(), 10, 'y quaternion length');
    equals(new vecJS.Q([0, 0, 10, 0]).length(), 10, 'z quaternion length');
    equals(new vecJS.Q([0, 0, 0, 10]).length(), 10, 'w quaternion length');
    equals(new vecJS.Q([10, 10, 10, 10]).length(), Math.sqrt(400), 'arbitrary quaternion length');
  },

  'normalize': function () {
    var q1 = new vecJS.Q([1, 2, 3, 4]), q1b;

    q1b = q1.normalize();
    equals(q1, q1b, 'normalize return this');
    fequals(q1.length(), 1, 'normalize makes unit quaternion');
  },

  'toString': function () {
    var q = new vecJS.Q([1, 2, 3, 4]);
    equals(q.toString(), 'Q[1, 2, 3, 4]', 'arbitrary quaternion string');
  }
};

run_test_set(q_tests);

