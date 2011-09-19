module('V3');

var v3_tests = {
  'constructor': function () {
    var v1 = new vecJS.V3();
    ok(v1, 'V3 constructor');

    mequals(v1.v, [0, 0, 0], 'empty constructor');

    var v2 = new vecJS.V3([1, 2, 3]);
    mequals(v2.v, [1, 2, 3], 'values in constructor');
  },

  'set': function () {
    var v1 = new vecJS.V3(), v1b;
    v1b = v1.set([4,5,6]);
    equals(v1, v1b, 'set return this');
    mequals(v1.v, [4, 5, 6], 'set values');
  },

  'copyTo': function () {
    var v1 = new vecJS.V3([1, 2, 3]), v1b,
      v2 = new vecJS.V3();

    v1b = v1.copyTo(v2);

    notEqual(v1, v2, 'copyTo does not overwrite object');
    equals(v1, v1b, 'copyTo return this');

    mequals(v1.v, [1, 2, 3], 'copyTo does not modify self');
    mequals(v2.v, [1, 2, 3], 'copyTo values');
  },

  'clone': function () {
    var v1 = new vecJS.V3([1, 2, 3]),
      v2 = v1.clone();

    notEqual(v1, v2, 'clone does not return this');
    notEqual(v1.v, v2.v, 'clone does not return the same object');

    mequals(v1.v, [1, 2, 3], 'clone does not modify object');
    mequals(v2.v, [1, 2, 3], 'clone values');
  },

  'add': function () {
    var v1 = new vecJS.V3([10, 20, 30]), v1b,
      v2 = new vecJS.V3([1, 2, 3]);

    v1b = v1.add(v2);
    notEqual(v1, v2, 'add does not overwrite object');
    equals(v1, v1b, 'add return this');

    mequals(v1.v, [11, 22, 33], 'add values');
    mequals(v2.v, [1, 2, 3], 'add does not modify parameter');
  },

  'assignAdd': function () {
    var v1 = new vecJS.V3(), v1b,
      v2 = new vecJS.V3([10, 20, 30]),
      v3 = new vecJS.V3([1, 2, 3]);

    v1b = v1.assignAdd(v2, v3);
    notEqual(v1, v2, 'assignAdd does not overwrite object');
    notEqual(v1, v3, 'assignAdd does not overwrite object');
    equals(v1, v1b, 'assignAdd return this');

    mequals(v1.v, [11, 22, 33], 'assignAdd values');
    mequals(v2.v, [10, 20, 30], 'assignAdd does not modify parameter 1');
    mequals(v3.v, [1, 2, 3], 'assignAdd does not modify parameter 2');
  },

  'sub': function () {
    var v1 = new vecJS.V3([10, 20, 30]), v1b,
      v2 = new vecJS.V3([1, 2, 3]);

    v1b = v1.sub(v2);
    notEqual(v1, v2, 'sub does not overwrite object');
    equals(v1, v1b, 'sub return this');

    mequals(v1.v, [9, 18, 27], 'sub values');
    mequals(v2.v, [1, 2, 3], 'sub does not modify parameter');
  },

  'assignSub': function () {
    var v1 = new vecJS.V3(), v1b,
      v2 = new vecJS.V3([10, 20, 30]),
      v3 = new vecJS.V3([1, 2, 3]);

    v1b = v1.assignSub(v2, v3);
    notEqual(v1, v2, 'assignSub does not overwrite object');
    notEqual(v1, v3, 'assignSub does not overwrite object');
    equals(v1, v1b, 'assignSub return this');

    mequals(v1.v, [9, 18, 27], 'assignSub values');
    mequals(v2.v, [10, 20, 30], 'assignSub does not modify parameter 1');
    mequals(v3.v, [1, 2, 3], 'assignSub does not modify parameter 2');
  },

  'addScalar': function () {
    var v1 = new vecJS.V3([10, 20, 30]), v1b;

    v1b = v1.addScalar(3);
    equals(v1, v1b, 'addScalar return this');
    mequals(v1.v, [13, 23, 33], 'addScalar values');
  },

  'subScalar': function () {
    var v1 = new vecJS.V3([10, 20, 30]), v1b;

    v1b = v1.subScalar(3);
    equals(v1, v1b, 'subScalar return this');
    mequals(v1.v, [7, 17, 27], 'subScalar values');
  },

  'mulScalar': function () {
    var v1 = new vecJS.V3([10, 20, 30]), v1b;

    v1b = v1.mulScalar(10);
    equals(v1, v1b, 'mulScalar return this');
    mequals(v1.v, [100, 200, 300], 'mulScalar values');
  },

  'divScalar': function () {
    var v1 = new vecJS.V3([10, 20, 30]), v1b;

    v1b = v1.divScalar(10);
    equals(v1, v1b, 'divScalar return this');
    mequals(v1.v, [1, 2, 3], 'divScalar values');
  },

  'mulM34': function () {
    //TODO: mulM34
  },

  'mulM44': function () {
    //TODO: mulM44
  },

  'mulQuat': function () {
    var q1 = new vecJS.Q().fromEuler([90*(Math.PI/180), 0, 0]),
        q2 = q1.clone(),
        v1 = new vecJS.V3([1, 2, 3]), v1b;

    v1b = v1.mulQuat(q1);

    equals(v1, v1b, 'mulQuat return this');
    mequals(q1.q, q2.q, 'mulQuat does not modify parameter');
    mfequals(v1.v, [1, -3, 2], 'mulQuat with 90deg around X');
  },

  'cross': function () {
    var v1 = new vecJS.V3([1, 2, 3]), v1b,
      v2 = new vecJS.V3([3, 2, 1]);

    v1b = v1.cross(v2);
    notEqual(v1, v2, 'cross does not overwrite object');
    equals(v1, v1b, 'cross return this');

    mequals(v1.v, [-4, 8, -4], 'cross values');
    mequals(v2.v, [3, 2, 1], 'cross does not modify parameter');
  },

  'assignCross': function () {
    var v1 = new vecJS.V3(), v1b,
      v2 = new vecJS.V3([1, 2, 3]),
      v3 = new vecJS.V3([3, 2, 1]);

    v1b = v1.assignCross(v2, v3);
    notEqual(v1, v2, 'assignCross does not overwrite object 1');
    notEqual(v1, v3, 'assignCross does not overwrite object 2');
    equals(v1, v1b, 'assignCross return this');

    mequals(v1.v, [-4, 8, -4], 'cross values');
    mequals(v2.v, [1, 2, 3], 'cross does not modify parameter 1');
    mequals(v3.v, [3, 2, 1], 'cross does not modify parameter 2');
  },

  'dot': function () {
    var v1 = new vecJS.V3([1, 2, 3]),
      v2 = new vecJS.V3([3, 2, 1]);

    equals(v1.dot(v2), 10, 'dot result.');

    mequals(v1.v, [1, 2, 3], 'dot does not modify object');
    mequals(v2.v, [3, 2, 1], 'dot does not modify parameter');
  },

  'lerp': function () {
    var v1 = new vecJS.V3(), v1b,
      v2 = new vecJS.V3([10, 100, 1000]),
      v3 = new vecJS.V3([20, 200, 2000]);

    v1b = v1.lerp(v2, v3, 0.5);
    notEqual(v1, v2, 'lerp does not overwrite object');
    notEqual(v1, v3, 'lerp does not overwrite object');
    equals(v1, v1b, 'lerp return this');

    mequals(v1.v, [15, 150, 1500], 'lerp values');
    mequals(v2.v, [10, 100, 1000], 'lerp does not modify parameter 1');
    mequals(v3.v, [20, 200, 2000], 'lerp does not modify parameter 2');
  },

  'length': function () {
    equals(new vecJS.V3().length(), 0, 'null vector length');
    equals(new vecJS.V3([10, 0, 0]).length(), 10, 'x vector length');
    equals(new vecJS.V3([0, 10, 0]).length(), 10, 'y vector length');
    equals(new vecJS.V3([0, 0, 10]).length(), 10, 'z vector length');
    equals(new vecJS.V3([10, 10, 10]).length(), Math.sqrt(300), 'arbitrary vector length');
  },

  'squaredLength': function () {
    equals(new vecJS.V3().squaredLength(), 0, 'null vector squared length');
    equals(new vecJS.V3([10, 0, 0]).squaredLength(), 100, 'x vector squared length');
    equals(new vecJS.V3([0, 10, 0]).squaredLength(), 100, 'y vector squared length');
    equals(new vecJS.V3([0, 0, 10]).squaredLength(), 100, 'z vector squared length');
    equals(new vecJS.V3([10, 10, 10]).squaredLength(), 300, 'arbitrary vector squared length');
  },

  'normalize': function () {
    var v1 = new vecJS.V3([10, 100, 1000]), v1b;

    v1b = v1.normalize();
    equals(v1, v1b, 'normalize return this');
    ok(Math.abs(1 - v1.length()) < 1e-6, 'normalize makes unit vector');
  },

  'distance': function () {
    var v1 = new vecJS.V3([10, 11, 12]),
      v2 = new vecJS.V3([20, 21, 22]);

    equals(v1.distance(v2), Math.sqrt(300), 'distance between vectors');

    mequals(v1.v, [10, 11, 12], 'distance does not modify object');
    mequals(v2.v, [20, 21, 22], 'distance does not modify parameter');
  },

  'squaredDistance': function () {
    var v1 = new vecJS.V3([10, 11, 12]),
      v2 = new vecJS.V3([20, 21, 22]);

    equals(v1.squaredDistance(v2), 300, 'squared distance between vectors');

    mequals(v1.v, [10, 11, 12], 'squaredDistance does not modify object');
    mequals(v2.v, [20, 21, 22], 'squaredDistance does not modify parameter');
  },

  'isUnit': function () {
    var v1 = new vecJS.V3([1, 2, 3]);
    ok(!v1.isUnit(), 'isUnit returns false on non-unit vector');

    v1.normalize();
    ok(v1.isUnit(), 'isUnit on normalized vector');
  },

  'toString': function () {
    var v1 = new vecJS.V3([1, 2, 3]);
    equals(v1.toString(), 'V3[1, 2, 3]', 'arbitrary vector');
  }
};

run_test_set(v3_tests);