module('V4');

var v4_tests = {
  'constructor': function () {
    var v1 = new vecJS.V4();
    ok(v1, 'V4 constructor');

    mequal(v1.v, [0, 0, 0, 0], 'empty constructor');

    var v2 = new vecJS.V4([1, 2, 3, 4]);
    mequal(v2.v, [1, 2, 3, 4], 'values in constructor');
  },

  'set': function () {
    var v1 = new vecJS.V4(), v1b;
    v1b = v1.set([1, 2, 3, 4]);
    equal(v1, v1b, 'set return this');
    mequal(v1.v, [1, 2, 3, 4], 'set values');
  },

  'copyTo': function () {
    var v1 = new vecJS.V4([1, 2, 3, 4]), v1b,
      v2 = new vecJS.V4();

    v1b = v1.copyTo(v2.v);

    notEqual(v1.v, v2.v, 'copyTo does not overwrite object');
    equal(v1, v1b, 'copyTo return this');

    mequal(v1.v, [1, 2, 3, 4], 'copyTo does not modify self');
    mequal(v2.v, [1, 2, 3, 4], 'copyTo values');
  },

  'clone': function () {
    var v1 = new vecJS.V4([1, 2, 3, 4]),
        v2 = v1.clone();

    notEqual(v1, v2, 'clone does not return this');
    notEqual(v1.v, v2.v, 'clone does not return the same object');

    mequal(v1.v, [1, 2, 3, 4], 'clone does not modify object');
    mequal(v2.v, [1, 2, 3, 4], 'clone values');
  },

  'add': function () {
    var v1 = new vecJS.V4([10, 20, 30, 40]), v1b,
      v2 = new vecJS.V4([1, 2, 3, 4]);

    v1b = v1.add(v2.v);
    notEqual(v1.v, v2.v, 'add does not overwrite object');
    equal(v1, v1b, 'add return this');

    mequal(v1.v, [11, 22, 33, 44], 'add values');
    mequal(v2.v, [1, 2, 3, 4], 'add does not modify parameter');
  },

  'assignAdd': function () {
    var v1 = new vecJS.V4(), v1b,
      v2 = new vecJS.V4([10, 20, 30, 40]),
      v3 = new vecJS.V4([1, 2, 3, 4]);

    v1b = v1.assignAdd(v2.v, v3.v);
    notEqual(v1.v, v2.v, 'assignAdd does not overwrite object');
    notEqual(v1.v, v3.v, 'assignAdd does not overwrite object');
    equal(v1, v1b, 'assignAdd return this');

    mequal(v1.v, [11, 22, 33, 44], 'assignAdd values');
    mequal(v2.v, [10, 20, 30, 40], 'assignAdd does not modify parameter 1');
    mequal(v3.v, [1, 2, 3, 4], 'assignAdd does not modify parameter 2');
  },

  'sub': function () {
    var v1 = new vecJS.V4([10, 20, 30, 40]), v1b,
      v2 = new vecJS.V4([1, 2, 3, 4]);

    v1b = v1.sub(v2.v);
    notEqual(v1.v, v2.v, 'sub does not overwrite object');
    equal(v1, v1b, 'sub return this');

    mequal(v1.v, [9, 18, 27, 36], 'sub values');
    mequal(v2.v, [1, 2, 3, 4], 'sub does not modify parameter');
  },

  'assignSub': function () {
    var v1 = new vecJS.V4(), v1b,
      v2 = new vecJS.V4([10, 20, 30, 40]),
      v3 = new vecJS.V4([1, 2, 3, 4]);

    v1b = v1.assignSub(v2.v, v3.v);
    notEqual(v1.v, v2.v, 'assignSub does not overwrite object');
    notEqual(v1.v, v3.v, 'assignSub does not overwrite object');
    equal(v1, v1b, 'assignSub return this');

    mequal(v1.v, [9, 18, 27, 36], 'assignSub values');
    mequal(v2.v, [10, 20, 30, 40], 'assignSub does not modify parameter 1');
    mequal(v3.v, [1, 2, 3, 4], 'assignSub does not modify parameter 2');
  },

  'addScalar': function () {
    var v1 = new vecJS.V4([10, 20, 30, 40]), v1b;

    v1b = v1.addScalar(3);
    equal(v1, v1b, 'addScalar return this');
    mequal(v1.v, [13, 23, 33, 43], 'addScalar values');
  },

  'subScalar': function () {
    var v1 = new vecJS.V4([10, 20, 30, 40]), v1b;

    v1b = v1.subScalar(3);
    equal(v1, v1b, 'subScalar return this');
    mequal(v1.v, [7, 17, 27, 37], 'subScalar values');
  },

  'mulScalar': function () {
    var v1 = new vecJS.V4([10, 20, 30, 40]), v1b;

    v1b = v1.mulScalar(10);
    equal(v1, v1b, 'mulScalar return this');
    mequal(v1.v, [100, 200, 300, 400], 'mulScalar values');
  },

  'divScalar': function () {
    var v1 = new vecJS.V4([10, 20, 30, 40]), v1b;

    v1b = v1.divScalar(10);
    equal(v1, v1b, 'divScalar return this');
    mequal(v1.v, [1, 2, 3, 4], 'divScalar values');
  },

  'mulM34': function () {
    var m1 = new vecJS.M34([
      1,  2,  3,  4,
      5,  6,  7,  8,
      9, 10, 11, 12
    ]),
    v1 = new vecJS.V4([1, 2, 3, 4]), v1b;

    v1b = v1.mulM34(m1.m);

    equal(v1, v1b, 'mulM return this');
    mequal(m1.m, [
      1,  2,  3,  4,
      5,  6,  7,  8,
      9, 10, 11, 12
    ], 'mulM does not change parameter')
    mequal(v1.v, [30, 70, 110, 4], 'mulM values');
  },

  'mulM44': function () {
    var m1 = new vecJS.M44([
       1,  2,  3,  4,
       5,  6,  7,  8,
       9, 10, 11, 12,
      13, 14, 15, 16
    ]),
    v1 = new vecJS.V4([1, 2, 3, 4]), v1b;

    v1b = v1.mulM44(m1.m);

    equal(v1, v1b, 'mulM return this');
    mequal(m1.m, [
       1,  2,  3,  4,
       5,  6,  7,  8,
       9, 10, 11, 12,
      13, 14, 15, 16
    ], 'mulM does not change parameter')
    mequal(v1.v, [30, 70, 110, 150], 'mulM values');
  },

  'dot': function () {
    var v1 = new vecJS.V4([1, 2, 3, 4]),
      v2 = new vecJS.V4([4, 3, 2, 1]);

    equal(v1.dot(v2.v), 20, 'dot result.');

    mequal(v1.v, [1, 2, 3, 4], 'dot does not modify object');
    mequal(v2.v, [4, 3, 2, 1], 'dot does not modify parameter');
  },

  'length': function () {
    equal(new vecJS.V4().length(), 0, 'null quaternion length');
    equal(new vecJS.V4([10, 0, 0, 0]).length(), 10, 'x quaternion length');
    equal(new vecJS.V4([0, 10, 0, 0]).length(), 10, 'y quaternion length');
    equal(new vecJS.V4([0, 0, 10, 0]).length(), 10, 'z quaternion length');
    equal(new vecJS.V4([0, 0, 0, 10]).length(), 10, 'z quaternion length');
    equal(new vecJS.V4([10, 10, 10, 10]).length(), Math.sqrt(400), 'arbitrary quaternion length');
  },

  'squaredLength': function () {
    equal(new vecJS.V4().squaredLength(), 0, 'null quaternion squared length');
    equal(new vecJS.V4([10, 0, 0, 0]).squaredLength(), 100, 'x quaternion squared length');
    equal(new vecJS.V4([0, 10, 0, 0]).squaredLength(), 100, 'y quaternion squared length');
    equal(new vecJS.V4([0, 0, 10, 0]).squaredLength(), 100, 'z quaternion squared length');
    equal(new vecJS.V4([0, 0, 0, 10]).squaredLength(), 100, 'z quaternion squared length');
    equal(new vecJS.V4([10, 10, 10, 10]).squaredLength(), 400, 'arbitrary quaternion squared length');
  },

  'normalize': function () {
    var v1 = new vecJS.V4([10, 100, 1000, 10000]), v1b;

    v1b = v1.normalize();
    equal(v1, v1b, 'normalize return this');
    ok(Math.abs(1 - v1.length()) < 1e-6, 'normalize makes unit vector');
  },

  'isUnit': function () {
    var v1 = new vecJS.V4([1, 2, 3, 4]);
    ok(!v1.isUnit(), 'isUnit returns false on non-unit vector');

    v1.normalize();
    ok(v1.isUnit(), 'isUnit on normalized vector');
  },

  'toString': function () {
    var v1 = new vecJS.V4([1, 2, 3, 4]);
    ok(v1.toString(), 'arbitrary vector');
  }
};

run_test_set(v4_tests);