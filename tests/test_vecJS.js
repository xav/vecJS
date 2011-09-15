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