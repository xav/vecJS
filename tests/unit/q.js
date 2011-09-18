module('Q');

test('constructor', function () {
  var v1 = new vecJS.Q();
  ok(v1, 'Q constructor');

  equals(v1.v[0], 0, 'first component 0');
  equals(v1.v[1], 0, 'second component 0');
  equals(v1.v[2], 0, 'third component 0');
  equals(v1.v[3], 0, 'fourth component 0');

  var v2 = new vecJS.Q([1, 2, 3, 4]);
  equals(v2.v[0], 1, 'set first component in constructor');
  equals(v2.v[1], 2, 'set second component in constructor');
  equals(v2.v[2], 3, 'set third component in constructor');
  equals(v2.v[3], 4, 'set fourth component in constructor');
});

test('set', function () {
  var v1 = new vecJS.Q();
  v1.set([4, 5, 6, 7]);
  equals(v1.v[0], 4, 'set first component');
  equals(v1.v[1], 5, 'set second component');
  equals(v1.v[2], 6, 'set third component');
  equals(v1.v[3], 7, 'set fourth component');
});

test('copyTo', function () {
  var v1 = new vecJS.Q([1, 2, 3, 4]), v1b,
      v2 = new vecJS.Q();

  v1b = v1.copyTo(v2);

  notEqual(v1, v2, 'copyTo does not overwrite object');
  equals(v1, v1b, 'copyTo return this');

  equals(v2.v[0], 1, 'copyTo first component');
  equals(v2.v[1], 2, 'copyTo second component');
  equals(v2.v[2], 3, 'copyTo third component');
  equals(v2.v[3], 4, 'copyTo fourth component');

  equals(v1.v[0], 1, 'copy does not modify self - first component');
  equals(v1.v[1], 2, 'copy does not modify self - second component');
  equals(v1.v[2], 3, 'copy does not modify self - third component');
  equals(v1.v[3], 4, 'copy does not modify self - fourth component');
});

test('clone', function () {
  var v1 = new vecJS.Q([1, 2, 3, 4]),
      v2 = v1.clone();

  notEqual(v1, v2, 'clone does not return this');
  notEqual(v1.v, v2.v, 'clone does not return the same object');

  equals(v2.v[0], 1, 'clone first component');
  equals(v2.v[1], 2, 'clone second component');
  equals(v2.v[2], 3, 'clone third component');
  equals(v2.v[3], 4, 'clone fourth component');

  equals(v1.v[0], 1, 'copy does not modify object - first component');
  equals(v1.v[1], 2, 'copy does not modify object - second component');
  equals(v1.v[2], 3, 'copy does not modify object - third component');
  equals(v1.v[3], 4, 'copy does not modify object - fourth component');
});

test('mulScalar', function () {
  var v1 = new vecJS.Q([10, 20, 30, 40]), v1b;

  v1b = v1.mulScalar(10);
  equals(v1, v1b, 'mulScalar return this');
  equals(v1.v[0], 100, 'mulScalar first component');
  equals(v1.v[1], 200, 'mulScalar second component');
  equals(v1.v[2], 300, 'mulScalar third component');
  equals(v1.v[3], 400, 'mulScalar fourth component');
});

test('divScalar', function () {
  var v1 = new vecJS.Q([10, 20, 30, 40]), v1b;

  v1b = v1.divScalar(10);
  equals(v1, v1b, 'divScalar return this');
  equals(v1.v[0], 1, 'divScalar first component');
  equals(v1.v[1], 2, 'divScalar second component');
  equals(v1.v[2], 3, 'divScalar third component');
  equals(v1.v[3], 4, 'divScalar fourth component');
});

test('mulM34', function () {
  //TODO: mulM34
});

test('mulM44', function () {
  //TODO: mulM44
});

test('mul', function () {
  //TODO: mulQuat
});

test('slerp', function () {
  //TODO: slerp
});

test('normalize', function () {
  //TODO: normalize
});

