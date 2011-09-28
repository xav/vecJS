module('V3');

var v3_tests = {
  'constructor': function () {
    var v1 = new vecJS.V3();
    ok(v1, 'V3 constructor');

    mequal(v1.v, [0, 0, 0], 'empty constructor');

    var v2 = new vecJS.V3([1, 2, 3]);
    mequal(v2.v, [1, 2, 3], 'values in constructor');
  },

  'set': function () {
    var v1 = new vecJS.V3(), v1b;
    v1b = v1.set([4,5,6]);
    equal(v1, v1b, 'set return this');
    mequal(v1.v, [4, 5, 6], 'set values');
  },

  'copyTo': function () {
    var v1 = new vecJS.V3([1, 2, 3]), v1b,
      v2 = new vecJS.V3();

    v1b = v1.copyTo(v2.v);

    notEqual(v1, v2, 'copyTo does not overwrite object');
    equal(v1, v1b, 'copyTo return this');

    mequal(v1.v, [1, 2, 3], 'copyTo does not modify self');
    mequal(v2.v, [1, 2, 3], 'copyTo values');
  },

  'clone': function () {
    var v1 = new vecJS.V3([1, 2, 3]),
      v2 = v1.clone();

    notEqual(v1, v2, 'clone does not return this');
    notEqual(v1.v, v2.v, 'clone does not return the same object');

    mequal(v1.v, [1, 2, 3], 'clone does not modify object');
    mequal(v2.v, [1, 2, 3], 'clone values');
  },

  'loadTranslation': function () {
    var v1 = new vecJS.V3(), v1b,
        m1 = new vecJS.M34([
      1,  2,  3,  4,
      5,  6,  7,  8,
      9, 10, 11, 12
    ]);

    v1b = v1.loadTranslation(m1.m);

    equal(v1, v1b, 'loadTranslation return this');
    mequal(m1.m, [
      1,  2,  3,  4,
      5,  6,  7,  8,
      9, 10, 11, 12
    ], 'loadTranslation does not modify object');
    mequal(v1.v, [4, 8, 12], 'loadTranslation values');
  },

  'loadScale': function() {
    //TODO: loadScale
  },

  'add': function () {
    var v1 = new vecJS.V3([10, 20, 30]), v1b,
      v2 = new vecJS.V3([1, 2, 3]);

    v1b = v1.add(v2.v);
    notEqual(v1, v2, 'add does not overwrite object'); //TODO: Replace this pattern with v1.v and v2.v on all files
    equal(v1, v1b, 'add return this');

    mequal(v1.v, [11, 22, 33], 'add values');
    mequal(v2.v, [1, 2, 3], 'add does not modify parameter');
  },

  'assignAdd': function () {
    var v1 = new vecJS.V3(), v1b,
      v2 = new vecJS.V3([10, 20, 30]),
      v3 = new vecJS.V3([1, 2, 3]);

    v1b = v1.assignAdd(v2.v, v3.v);
    notEqual(v1, v2, 'assignAdd does not overwrite object');
    notEqual(v1, v3, 'assignAdd does not overwrite object');
    equal(v1, v1b, 'assignAdd return this');

    mequal(v1.v, [11, 22, 33], 'assignAdd values');
    mequal(v2.v, [10, 20, 30], 'assignAdd does not modify parameter 1');
    mequal(v3.v, [1, 2, 3], 'assignAdd does not modify parameter 2');
  },

  'sub': function () {
    var v1 = new vecJS.V3([10, 20, 30]), v1b,
      v2 = new vecJS.V3([1, 2, 3]);

    v1b = v1.sub(v2.v);
    notEqual(v1, v2, 'sub does not overwrite object');
    equal(v1, v1b, 'sub return this');

    mequal(v1.v, [9, 18, 27], 'sub values');
    mequal(v2.v, [1, 2, 3], 'sub does not modify parameter');
  },

  'assignSub': function () {
    var v1 = new vecJS.V3(), v1b,
      v2 = new vecJS.V3([10, 20, 30]),
      v3 = new vecJS.V3([1, 2, 3]);

    v1b = v1.assignSub(v2.v, v3.v);
    notEqual(v1, v2, 'assignSub does not overwrite object');
    notEqual(v1, v3, 'assignSub does not overwrite object');
    equal(v1, v1b, 'assignSub return this');

    mequal(v1.v, [9, 18, 27], 'assignSub values');
    mequal(v2.v, [10, 20, 30], 'assignSub does not modify parameter 1');
    mequal(v3.v, [1, 2, 3], 'assignSub does not modify parameter 2');
  },

  'addScalar': function () {
    var v1 = new vecJS.V3([10, 20, 30]), v1b;

    v1b = v1.addScalar(3);
    equal(v1, v1b, 'addScalar return this');
    mequal(v1.v, [13, 23, 33], 'addScalar values');
  },

  'subScalar': function () {
    var v1 = new vecJS.V3([10, 20, 30]), v1b;

    v1b = v1.subScalar(3);
    equal(v1, v1b, 'subScalar return this');
    mequal(v1.v, [7, 17, 27], 'subScalar values');
  },

  'mulScalar': function () {
    var v1 = new vecJS.V3([10, 20, 30]), v1b;

    v1b = v1.mulScalar(10);
    equal(v1, v1b, 'mulScalar return this');
    mequal(v1.v, [100, 200, 300], 'mulScalar values');
  },

  'divScalar': function () {
    var v1 = new vecJS.V3([10, 20, 30]), v1b;

    v1b = v1.divScalar(10);
    equal(v1, v1b, 'divScalar return this');
    mequal(v1.v, [1, 2, 3], 'divScalar values');
  },

  'mulM': function () {
    var m1 = new vecJS.M34([
      1,  2,  3,  4,
      5,  6,  7,  8,
      9, 10, 11, 12
    ]),
    v1 = new vecJS.V3([1, 2, 3]), v1b;

    v1b = v1.mulM(m1.m);

    equal(v1, v1b, 'mulM return this');
    mequal(m1.m, [
      1,  2,  3,  4,
      5,  6,  7,  8,
      9, 10, 11, 12
    ], 'mulM does not change parameter')
    mequal(v1.v, [18, 46, 74], 'mulM values');
  },

  'mulQ': function () {
    var q1 = new vecJS.Q().fromEuler([90*(Math.PI/180), 0, 0]),
        q2 = q1.clone(),
        v1 = new vecJS.V3([1, 2, 3]), v1b;

    v1b = v1.mulQ(q1.q);

    equal(v1, v1b, 'mulQ return this');
    mequal(q1.q, q2.q, 'mulQ does not modify parameter');
    mfequal(v1.v, [1, -3, 2], 'mulQ with 90deg around X');
  },

  'cross': function () {
    var v1 = new vecJS.V3([1, 2, 3]), v1b,
      v2 = new vecJS.V3([3, 2, 1]);

    v1b = v1.cross(v2.v);
    notEqual(v1, v2, 'cross does not overwrite object');
    equal(v1, v1b, 'cross return this');

    mequal(v1.v, [-4, 8, -4], 'cross values');
    mequal(v2.v, [3, 2, 1], 'cross does not modify parameter');
  },

  'assignCross': function () {
    var v1 = new vecJS.V3(), v1b,
      v2 = new vecJS.V3([1, 2, 3]),
      v3 = new vecJS.V3([3, 2, 1]);

    v1b = v1.assignCross(v2.v, v3.v);
    notEqual(v1, v2, 'assignCross does not overwrite object 1');
    notEqual(v1, v3, 'assignCross does not overwrite object 2');
    equal(v1, v1b, 'assignCross return this');

    mequal(v1.v, [-4, 8, -4], 'cross values');
    mequal(v2.v, [1, 2, 3], 'cross does not modify parameter 1');
    mequal(v3.v, [3, 2, 1], 'cross does not modify parameter 2');
  },

  'dot': function () {
    var v1 = new vecJS.V3([1, 2, 3]),
      v2 = new vecJS.V3([3, 2, 1]);

    equal(v1.dot(v2.v), 10, 'dot result.');

    mequal(v1.v, [1, 2, 3], 'dot does not modify object');
    mequal(v2.v, [3, 2, 1], 'dot does not modify parameter');
  },

  'lerp': function () {
    var v1 = new vecJS.V3(), v1b,
      v2 = new vecJS.V3([10, 100, 1000]),
      v3 = new vecJS.V3([20, 200, 2000]);

    v1b = v1.lerp(v2.v, v3.v, 0.5);
    notEqual(v1, v2, 'lerp does not overwrite object');
    notEqual(v1, v3, 'lerp does not overwrite object');
    equal(v1, v1b, 'lerp return this');

    mequal(v1.v, [15, 150, 1500], 'lerp values');
    mequal(v2.v, [10, 100, 1000], 'lerp does not modify parameter 1');
    mequal(v3.v, [20, 200, 2000], 'lerp does not modify parameter 2');
  },

  'length': function () {
    equal(new vecJS.V3().length(), 0, 'null vector length');
    equal(new vecJS.V3([10, 0, 0]).length(), 10, 'x vector length');
    equal(new vecJS.V3([0, 10, 0]).length(), 10, 'y vector length');
    equal(new vecJS.V3([0, 0, 10]).length(), 10, 'z vector length');
    equal(new vecJS.V3([10, 10, 10]).length(), Math.sqrt(300), 'arbitrary vector length');
  },

  'squaredLength': function () {
    equal(new vecJS.V3().squaredLength(), 0, 'null vector squared length');
    equal(new vecJS.V3([10, 0, 0]).squaredLength(), 100, 'x vector squared length');
    equal(new vecJS.V3([0, 10, 0]).squaredLength(), 100, 'y vector squared length');
    equal(new vecJS.V3([0, 0, 10]).squaredLength(), 100, 'z vector squared length');
    equal(new vecJS.V3([10, 10, 10]).squaredLength(), 300, 'arbitrary vector squared length');
  },

  'normalize': function () {
    var v1 = new vecJS.V3([10, 100, 1000]), v1b;

    v1b = v1.normalize();
    equal(v1, v1b, 'normalize return this');
    ok(Math.abs(1 - v1.length()) < 1e-6, 'normalize makes unit vector');
  },

  'distance': function () {
    var v1 = new vecJS.V3([10, 11, 12]),
      v2 = new vecJS.V3([20, 21, 22]);

    equal(v1.distance(v2.v), Math.sqrt(300), 'distance between vectors');

    mequal(v1.v, [10, 11, 12], 'distance does not modify object');
    mequal(v2.v, [20, 21, 22], 'distance does not modify parameter');
  },

  'squaredDistance': function () {
    var v1 = new vecJS.V3([10, 11, 12]),
      v2 = new vecJS.V3([20, 21, 22]);

    equal(v1.squaredDistance(v2.v), 300, 'squared distance between vectors');

    mequal(v1.v, [10, 11, 12], 'squaredDistance does not modify object');
    mequal(v2.v, [20, 21, 22], 'squaredDistance does not modify parameter');
  },

  'isUnit': function () {
    var v1 = new vecJS.V3([1, 2, 3]);
    ok(!v1.isUnit(), 'isUnit returns false on non-unit vector');

    v1.normalize();
    ok(v1.isUnit(), 'isUnit on normalized vector');
  },

  'toString': function () {
    var v1 = new vecJS.V3([1, 2, 3]);
    equal(v1.toString(), 'V3[1, 2, 3]', 'arbitrary vector');
  }
};

run_test_set(v3_tests);