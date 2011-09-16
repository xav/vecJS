/*
 * Test glMatrix using qunit.js/qunit.css.
 */

var vecJS_runtests = function() {

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

  test('copy', function () {
    var v1 = new vecJS.V3([1, 2, 3]),
        v2a = new vecJS.V3(), v2b,
        v3a = new vecJS.V3(), v3b;

    v2b = v2a.cpy(v1);

    notEqual(v1, v2a, 'cpy does not overwrite object');
    equals(v2a, v2b, 'cpy return this');
    equals(v1.v[0], v2a.v[0], 'cpy first component');
    equals(v1.v[1], v2a.v[1], 'cpy second component');
    equals(v1.v[2], v2a.v[2], 'cpy third component');

    v3b = v1.cpyto(v3a);
    notEqual(v3a, v3b, 'cpyto does not overwrite object');
    equals(v1, v3b, 'cpyto return this');
    equals(v1.v[0], v3a.v[0], 'cpyto first component');
    equals(v1.v[1], v3a.v[1], 'cpyto second component');
    equals(v1.v[2], v3a.v[2], 'cpyto third component');
  });

  module('V4');

  module('M34');

  module('M44');
  
  test("constructor",function () {
    var i,j;

    var m1 = new vecJS.M44();
    ok(m1, 'M44 constructor');
  });

  test("constructor",function () {
    var m1 = new vecJS.M44().idt();
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
};