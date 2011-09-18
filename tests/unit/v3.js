module('V3');

test('constructor', function () {
  var v1 = new vecJS.V3();
  ok(v1, 'V3 constructor');

  equals(v1.v[0], 0, 'first component 0');
  equals(v1.v[1], 0, 'second component 0');
  equals(v1.v[2], 0, 'third component 0');

  var v2 = new vecJS.V3([1, 2, 3]);
  equals(v2.v[0], 1, 'set first component in constructor');
  equals(v2.v[1], 2, 'set second component in constructor');
  equals(v2.v[2], 3, 'set third component in constructor');
});

test('set', function () {
  var v1 = new vecJS.V3();
  v1.set([4,5,6]);
  equals(v1.v[0], 4, 'set first component');
  equals(v1.v[1], 5, 'set second component');
  equals(v1.v[2], 6, 'set third component');
});

test('copyTo', function () {
  var v1 = new vecJS.V3([1, 2, 3]), v1b,
      v2 = new vecJS.V3();

  v1b = v1.copyTo(v2);

  notEqual(v1, v2, 'copyTo does not overwrite object');
  equals(v1, v1b, 'copyTo return this');

  equals(v2.v[0], 1, 'copyTo first component');
  equals(v2.v[1], 2, 'copyTo second component');
  equals(v2.v[2], 3, 'copyTo third component');

  equals(v1.v[0], 1, 'copy does not modify self - first component');
  equals(v1.v[1], 2, 'copy does not modify self - second component');
  equals(v1.v[2], 3, 'copy does not modify self - third component');
});

test('clone', function () {
  var v1 = new vecJS.V3([1, 2, 3]),
      v2 = v1.clone();

  notEqual(v1, v2, 'clone does not return this');
  notEqual(v1.v, v2.v, 'clone does not return the same object');

  equals(v2.v[0], 1, 'clone first component');
  equals(v2.v[1], 2, 'clone second component');
  equals(v2.v[2], 3, 'clone third component');

  equals(v1.v[0], 1, 'copy does not modify object - first component');
  equals(v1.v[1], 2, 'copy does not modify object - second component');
  equals(v1.v[2], 3, 'copy does not modify object - third component');
});

test('add', function () {
  var v1 = new vecJS.V3([10, 20, 30]), v1b,
      v2 = new vecJS.V3([1, 2, 3]);

  v1b = v1.add(v2);
  notEqual(v1, v2, 'add does not overwrite object');
  equals(v1, v1b, 'add return this');

  equals(v1.v[0], 11, 'add first component');
  equals(v1.v[1], 22, 'add second component');
  equals(v1.v[2], 33, 'add third component');
  
  equals(v2.v[0], 1, 'add does not modify parameter - first component');
  equals(v2.v[1], 2, 'add does not modify parameter - second component');
  equals(v2.v[2], 3, 'add does not modify parameter - third component');
});

test('assignAdd', function () {
  var v1 = new vecJS.V3(), v1b,
      v2 = new vecJS.V3([10, 20, 30]),
      v3 = new vecJS.V3([1, 2, 3]);

  v1b = v1.assignAdd(v2, v3);
  notEqual(v1, v2, 'assignAdd does not overwrite object');
  notEqual(v1, v3, 'assignAdd does not overwrite object');
  equals(v1, v1b, 'assignAdd return this');

  equals(v1.v[0], 11, 'assignAdd first component');
  equals(v1.v[1], 22, 'assignAdd second component');
  equals(v1.v[2], 33, 'assignAdd third component');
  
  equals(v2.v[0], 10, 'assignAdd does not modify parameter 1 - first component');
  equals(v2.v[1], 20, 'assignAdd does not modify parameter 1 - second component');
  equals(v2.v[2], 30, 'assignAdd does not modify parameter 1 - third component');

  equals(v3.v[0], 1, 'assignAdd does not modify parameter 2 - first component');
  equals(v3.v[1], 2, 'assignAdd does not modify parameter 2 - second component');
  equals(v3.v[2], 3, 'assignAdd does not modify parameter 2 - third component');
});

test('sub', function () {
  var v1 = new vecJS.V3([10, 20, 30]), v1b,
      v2 = new vecJS.V3([1, 2, 3]);

  v1b = v1.sub(v2);
  notEqual(v1, v2, 'sub does not overwrite object');
  equals(v1, v1b, 'sub return this');

  equals(v1.v[0], 9, 'sub first component');
  equals(v1.v[1], 18, 'sub second component');
  equals(v1.v[2], 27, 'sub third component');
  
  equals(v2.v[0], 1, 'sub does not modify parameter - first component');
  equals(v2.v[1], 2, 'sub does not modify parameter - second component');
  equals(v2.v[2], 3, 'sub does not modify parameter - third component');
});

test('assignSub', function () {
  var v1 = new vecJS.V3(), v1b,
      v2 = new vecJS.V3([10, 20, 30]),
      v3 = new vecJS.V3([1, 2, 3]);

  v1b = v1.assignSub(v2, v3);
  notEqual(v1, v2, 'assignSub does not overwrite object');
  notEqual(v1, v3, 'assignSub does not overwrite object');
  equals(v1, v1b, 'assignSub return this');

  equals(v1.v[0], 9, 'assignSub first component');
  equals(v1.v[1], 18, 'assignSub second component');
  equals(v1.v[2], 27, 'assignSub third component');
  
  equals(v2.v[0], 10, 'assignSub does not modify parameter 1 - first component');
  equals(v2.v[1], 20, 'assignSub does not modify parameter 1 - second component');
  equals(v2.v[2], 30, 'assignSub does not modify parameter 1 - third component');

  equals(v3.v[0], 1, 'assignSub does not modify parameter 2 - first component');
  equals(v3.v[1], 2, 'assignSub does not modify parameter 2 - second component');
  equals(v3.v[2], 3, 'assignSub does not modify parameter 2 - third component');
});

test('addScalar', function () {
  var v1 = new vecJS.V3([10, 20, 30]), v1b;

  v1b = v1.addScalar(3);
  equals(v1, v1b, 'addScalar return this');
  equals(v1.v[0], 13, 'addScalar first component');
  equals(v1.v[1], 23, 'addScalar second component');
  equals(v1.v[2], 33, 'addScalar third component');
});

test('subScalar', function () {
  var v1 = new vecJS.V3([10, 20, 30]), v1b;

  v1b = v1.subScalar(3);
  equals(v1, v1b, 'subScalar return this');
  equals(v1.v[0], 7, 'subScalar first component');
  equals(v1.v[1], 17, 'subScalar second component');
  equals(v1.v[2], 27, 'subScalar third component');
});

test('mulScalar', function () {
  var v1 = new vecJS.V3([10, 20, 30]), v1b;

  v1b = v1.mulScalar(10);
  equals(v1, v1b, 'mulScalar return this');
  equals(v1.v[0], 100, 'mulScalar first component');
  equals(v1.v[1], 200, 'mulScalar second component');
  equals(v1.v[2], 300, 'mulScalar third component');
});

test('divScalar', function () {
  var v1 = new vecJS.V3([10, 20, 30]), v1b;

  v1b = v1.divScalar(10);
  equals(v1, v1b, 'divScalar return this');
  equals(v1.v[0], 1, 'divScalar first component');
  equals(v1.v[1], 2, 'divScalar second component');
  equals(v1.v[2], 3, 'divScalar third component');
});

test('mulM34', function () {
  //TODO: mulM34
});

test('mulM44', function () {
  //TODO: mulM44
});

test('mulQuat', function () {
  //TODO: mulQuat
});

test('cross', function () {
  var v1 = new vecJS.V3([1, 2, 3]), v1b,
      v2 = new vecJS.V3([3, 2, 1]);

  v1b = v1.cross(v2);
  notEqual(v1, v2, 'cross does not overwrite object');
  equals(v1, v1b, 'cross return this');

  equals(v1.v[0], -4, 'cross first component');
  equals(v1.v[1], 8, 'cross second component');
  equals(v1.v[2], -4, 'cross third component');

  equals(v2.v[0], 3, 'cross does not modify parameter - first component');
  equals(v2.v[1], 2, 'cross does not modify parameter - second component');
  equals(v2.v[2], 1, 'cross does not modify parameter - third component');
});

test('assignCross', function () {
  var v1 = new vecJS.V3(), v1b,
      v2 = new vecJS.V3([1, 2, 3]),
      v3 = new vecJS.V3([3, 2, 1]);

  v1b = v1.assignCross(v2, v3);
  notEqual(v1, v2, 'assignCross does not overwrite object 1');
  notEqual(v1, v3, 'assignCross does not overwrite object 2');
  equals(v1, v1b, 'assignCross return this');

  equals(v1.v[0], -4, 'assignCross first component');
  equals(v1.v[1], 8, 'assignCross second component');
  equals(v1.v[2], -4, 'assignCross third component');

  equals(v2.v[0], 1, 'assignCross does not modify parameter 1 - first component');
  equals(v2.v[1], 2, 'assignCross does not modify parameter 1 - second component');
  equals(v2.v[2], 3, 'assignCross does not modify parameter 1 - third component');

  equals(v3.v[0], 3, 'assignCross does not modify parameter 2 - first component');
  equals(v3.v[1], 2, 'assignCross does not modify parameter 2 - second component');
  equals(v3.v[2], 1, 'assignCross does not modify parameter 2 - third component');
});

test('dot', function () {
  var v1 = new vecJS.V3([1, 2, 3]),
      v2 = new vecJS.V3([3, 2, 1]);

  equals(v1.dot(v2), 10, 'dot result.');

  equals(v1.v[0], 1, 'dot does not modify object - first component');
  equals(v1.v[1], 2, 'dot does not modify object - second component');
  equals(v1.v[2], 3, 'dot does not modify object - third component');

  equals(v2.v[0], 3, 'dot does not modify parameter - first component');
  equals(v2.v[1], 2, 'dot does not modify parameter - second component');
  equals(v2.v[2], 1, 'dot does not modify parameter - third component');
});

test('lerp', function () {
  var v1 = new vecJS.V3([10, 100, 1000]), v1b,
      v2 = new vecJS.V3([20, 200, 2000]);

  v1b = v1.lerp(v2, 0.5);
  notEqual(v1, v2, 'lerp does not overwrite object');
  equals(v1, v1b, 'lerp return this');

  equals(v1.v[0], 15, 'lerp first component');
  equals(v1.v[1], 150, 'lerp second component');
  equals(v1.v[2], 1500, 'lerp third component');

  equals(v2.v[0], 20, 'dot does not modify parameter - first component');
  equals(v2.v[1], 200, 'dot does not modify parameter - second component');
  equals(v2.v[2], 2000, 'dot does not modify parameter - third component');
});

test('assignLerp', function () {
  var v1 = new vecJS.V3(), v1b,
      v2 = new vecJS.V3([10, 100, 1000]),
      v3 = new vecJS.V3([20, 200, 2000]);

  v1b = v1.assignLerp(v2, v3, 0.5);
  notEqual(v1, v2, 'assignLerp does not overwrite object');
  notEqual(v1, v3, 'assignLerp does not overwrite object');
  equals(v1, v1b, 'assignLerp return this');

  equals(v1.v[0], 15, 'assignLerp first component');
  equals(v1.v[1], 150, 'assignLerp second component');
  equals(v1.v[2], 1500, 'assignLerp third component');

  equals(v2.v[0], 10, 'assignLerp does not modify parameter 1 - first component');
  equals(v2.v[1], 100, 'assignLerp does not modify parameter 1 - second component');
  equals(v2.v[2], 1000, 'assignLerp does not modify parameter 1 - third component');

  equals(v3.v[0], 20, 'assignLerp does not modify parameter 2 - first component');
  equals(v3.v[1], 200, 'assignLerp does not modify parameter 2 - second component');
  equals(v3.v[2], 2000, 'assignLerp does not modify parameter 2 - third component');
});

test('length', function () {
  equals(new vecJS.V3().length(), 0, 'null vector length');
  equals(new vecJS.V3([10, 0, 0]).length(), 10, 'x vector length');
  equals(new vecJS.V3([0, 10, 0]).length(), 10, 'y vector length');
  equals(new vecJS.V3([0, 0, 10]).length(), 10, 'z vector length');
  equals(new vecJS.V3([10, 10, 10]).length(), Math.sqrt(300), 'arbitrary vector length');
});

test('squaredLength', function () {
  equals(new vecJS.V3().squaredLength(), 0, 'null vector squared length');
  equals(new vecJS.V3([10, 0, 0]).squaredLength(), 100, 'x vector squared length');
  equals(new vecJS.V3([0, 10, 0]).squaredLength(), 100, 'y vector squared length');
  equals(new vecJS.V3([0, 0, 10]).squaredLength(), 100, 'z vector squared length');
  equals(new vecJS.V3([10, 10, 10]).squaredLength(), 300, 'arbitrary vector squared length');
});

test('normalization', function () {
  var v1 = new vecJS.V3([10, 100, 1000]), v1b;

  v1b = v1.normalize();
  equals(v1, v1b, 'normalize return this');
  ok(Math.abs(1 - v1.length()) < 1e-6, 'normalize makes unit vector');
});

test('distance', function () {
  var v1 = new vecJS.V3([10, 11, 12]),
      v2 = new vecJS.V3([20, 21, 22]);

  equals(v1.distance(v2), Math.sqrt(300), 'distance between vectors');

  equals(v1.v[0], 10, 'distance does not modify object - first component');
  equals(v1.v[1], 11, 'distance does not modify object - second component');
  equals(v1.v[2], 12, 'distance does not modify object - third component');

  equals(v2.v[0], 20, 'distance does not modify parameter - first component');
  equals(v2.v[1], 21, 'distance does not modify parameter - second component');
  equals(v2.v[2], 22, 'distance does not modify parameter - third component');
});

test('distance', function () {
  var v1 = new vecJS.V3([10, 11, 12]),
      v2 = new vecJS.V3([20, 21, 22]);

  equals(v1.squaredDistance(v2), 300, 'squared distance between vectors');

  equals(v1.v[0], 10, 'squaredDistance does not modify object - first component');
  equals(v1.v[1], 11, 'squaredDistance does not modify object - second component');
  equals(v1.v[2], 12, 'squaredDistance does not modify object - third component');

  equals(v2.v[0], 20, 'squaredDistance does not modify parameter - first component');
  equals(v2.v[1], 21, 'squaredDistance does not modify parameter - second component');
  equals(v2.v[2], 22, 'squaredDistance does not modify parameter - third component');
});

