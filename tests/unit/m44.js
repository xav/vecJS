module('M44');

test("constructor",function () {
  var i,j;

  var m1 = new vecJS.M44();
  ok(m1, 'M44 constructor');
});

test('set', function () {
});

test('copy', function () {
});

test('copyTo', function () {
});

test('clone', function () {
});

test('fromQuat', function () {
});

test("identity",function () {
  var m1 = new vecJS.M44().identity();
  function testIdentity(m) {
    for (var i = 0 ; i < 4 ; i++) {
      for (var j = 0 ; j < 4 ; j++) {
        if (m1.m[i + 4*j] !== (i===j ? 1.0 : 0.0) )
          return false;
      }
    }
    return true;
  }

  ok(testIdentity(m1), 'identity matrix');
});

test('mul', function () {
});

test('assignMul', function () {
});

test('transpose', function () {
});

test('invert', function () {
});

test('lookAt', function () {
});

test('frustum', function () {
});

test('perspective', function () {
});

test('orthogonal', function () {
});
