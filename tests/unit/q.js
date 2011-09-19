module('Q');

var q_tests = {
  'constructor': function () {
    var q1 = new vecJS.Q();
    ok(q1, 'Q constructor');

    equals(q1.q[0], 0, 'first component 0');
    equals(q1.q[1], 0, 'second component 0');
    equals(q1.q[2], 0, 'third component 0');
    equals(q1.q[3], 0, 'fourth component 0');

    var q2 = new vecJS.Q([1, 2, 3, 4]);
    equals(q2.q[0], 1, 'set first component in constructor');
    equals(q2.q[1], 2, 'set second component in constructor');
    equals(q2.q[2], 3, 'set third component in constructor');
    equals(q2.q[3], 4, 'set fourth component in constructor');
  },

  'set': function () {
    var v1 = new vecJS.Q();
    v1.set([4, 5, 6, 7]);
    equals(v1.q[0], 4, 'set first component');
    equals(v1.q[1], 5, 'set second component');
    equals(v1.q[2], 6, 'set third component');
    equals(v1.q[3], 7, 'set fourth component');
  },
  
  'copyTo': function () {
    var v1 = new vecJS.Q([1, 2, 3, 4]), v1b,
      v2 = new vecJS.Q();

    v1b = v1.copyTo(v2);

    notEqual(v1, v2, 'copyTo does not overwrite object');
    equals(v1, v1b, 'copyTo return this');

    equals(v2.q[0], 1, 'copyTo first component');
    equals(v2.q[1], 2, 'copyTo second component');
    equals(v2.q[2], 3, 'copyTo third component');
    equals(v2.q[3], 4, 'copyTo fourth component');

    equals(v1.q[0], 1, 'copy does not modify self - first component');
    equals(v1.q[1], 2, 'copy does not modify self - second component');
    equals(v1.q[2], 3, 'copy does not modify self - third component');
    equals(v1.q[3], 4, 'copy does not modify self - fourth component');
  },

  'clone': function () {
    var v1 = new vecJS.Q([1, 2, 3, 4]),
      v2 = v1.clone();

    notEqual(v1, v2, 'clone does not return this');
    notEqual(v1.q, v2.q, 'clone does not return the same object');

    equals(v2.q[0], 1, 'clone first component');
    equals(v2.q[1], 2, 'clone second component');
    equals(v2.q[2], 3, 'clone third component');
    equals(v2.q[3], 4, 'clone fourth component');

    equals(v1.q[0], 1, 'copy does not modify object - first component');
    equals(v1.q[1], 2, 'copy does not modify object - second component');
    equals(v1.q[2], 3, 'copy does not modify object - third component');
    equals(v1.q[3], 4, 'copy does not modify object - fourth component');
  },

  'mulScalar': function () {
    var v1 = new vecJS.Q([10, 20, 30, 40]), v1b;

    v1b = v1.mulScalar(10);
    equals(v1, v1b, 'mulScalar return this');
    equals(v1.q[0], 100, 'mulScalar first component');
    equals(v1.q[1], 200, 'mulScalar second component');
    equals(v1.q[2], 300, 'mulScalar third component');
    equals(v1.q[3], 400, 'mulScalar fourth component');
  },

  'divScalar': function () {
    var v1 = new vecJS.Q([10, 20, 30, 40]), v1b;

    v1b = v1.divScalar(10);
    equals(v1, v1b, 'divScalar return this');
    equals(v1.q[0], 1, 'divScalar first component');
    equals(v1.q[1], 2, 'divScalar second component');
    equals(v1.q[2], 3, 'divScalar third component');
    equals(v1.q[3], 4, 'divScalar fourth component');
  },

  'mulM34': function () {
    //TODO: mulM34
  },

  'mulM44': function () {
    //TODO: mulM44
  },

  'mul': function () {
    //TODO: mulQuat
  },

  'slerp': function () {
    //TODO: slerp
  },

  'normalize': function () {
    //TODO: normalize
  }
};

run_test_set(q_tests);

