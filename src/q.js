/** @license
 * vecJS vector and matrix math library
 * Copyright (c) 2011, Xavier Basty
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
* @class A 4 dimensional vector representing a quaternion.
*
* @param {Array.<Number>=} q Array containing the [x,y,z,w] values to initialize with.
*
* @property {GLMatrixArray} q the quaternion [x,y,z,w] values.
*
* @constructor
*/
vecJS.Q = function Q(q) {
  /*@DEBUG*/
  if (q !== undefined && !dbg.isArray(q)) { throw 'q is not an array'; }
  if (q !== undefined && q.length !== 4) { throw 'q has an invalid size (' + (q.length) + ').'; }
  /*/@DEBUG*/
  if (this instanceof vecJS.Q) {
    var a = this.q = new GLMatrixArray(4);
    if (q) {
      a[0] = q[0];
      a[1] = q[1];
      a[2] = q[2];
      a[3] = q[3];
    }
  } else {
    return new vecJS.Q(q);
  }
};

vecJS.Q.prototype = {
  constructor: vecJS.Q,

  /**
  * Set the current instance values.
  *
   * @param {!Array} q The new [x,y,z,w] values ({@link vecJS.Q#q}).
  *
  * @return {!vecJS.Q} This instance.
  */
  set: function (q) {
    /*@DEBUG*/
    if (!dbg.isArray(q)) { throw 'q is not an array'; }
    if (q.length !== 4) { throw 'q has an invalid size (' + (q.length) + ').'; }
    /*/@DEBUG*/
    var a = this.q;
    a[0] = q[0];
    a[1] = q[1];
    a[2] = q[2];
    a[3] = q[3];
    return this;
  },
  /**
  * Copy this quaternion to the specified one.
  *
  * @param {!Array.<Number>} q The target quaternion ({@link vecJS.Q#q}).
  *
  * @return {!vecJS.Q} This instance.
  */
  copyTo: function (q) {
    /*@DEBUG*/
    if (!dbg.isArray(q)) { throw 'q is not an array'; }
    if (q.length !== 4) { throw 'q has an invalid size (' + (q.length) + ').'; }
    /*/@DEBUG*/
    var a = this.q;
    q[0] = a[0];
    q[1] = a[1];
    q[2] = a[2];
    q[3] = a[3];
    return this;
  },
  /**
  * Create a clone of this instance.
  *
  * @return {!vecJS.Q} A new quaternion instance which is a copy of this one.
  */
  clone: function () {
    return new vecJS.Q(this.q);
  },

  /**
   * Set the quaternion values from the specified matrix (3x4 or 4x4).
   *
   * @param {!Array.<Number>}m The rotation matrix to convert ({@link vecJS.M34#m} or {@link vecJS.M44#m}).
   *
   * @return {!vecJS.Q} This instance.
   */
  fromMatrix: function (m) {
    /*@DEBUG*/
    if (!dbg.isArray(m)) { throw 'm is not an array'; }
    if (m.length !== 12 && m.length != 16) { throw 'm has an invalid size (' + (m.length) + ').'; }
    /*/@DEBUG*/
    var q = this.q,
        m00 = m[0], m01 = m[1], m02 = m[2],
        m10 = m[4], m11 = m[5], m12 = m[6],
        m20 = m[8], m21 = m[9], m22 = m[10],
        d = m00 + m11 + m22 + 1,
        s;

    if (d > 1){
      s = 0.5 / Math.sqrt(d);
      q[0] = (m21 - m12) * s;
      q[1] = (m02 - m20) * s;
      q[2] = (m10 - m01) * s;
      q[3] = 0.25 / s;
    } else {
      if (m00 > m11 && m00 > m22) {
        // 1st element of diagonal is the greatest value.
        // Find scale according to 1st element, and double it
        s = 0.5 / Math.sqrt(1 + m00 - m11 - m22);

        q[0] = 0.25  / s;
        q[1] = (m10 + m01) * s;
        q[2] = (m20 + m02) * s;
        q[3] = (m21 - m12) * s;
      } else if (m11 > m22) {
        // 2nd element of diagonal is the greatest value.
        // Find scale according to 2nd element, and double it
        s = 0.5 / Math.sqrt(1 + m11 - m00 - m22);

        q[0] = (m10 + m01) * s;
        q[1] = 0.25 / s;
        q[2] = (m21 + m12) * s;
        q[3] = (m02 - m20) * s;
      } else {
        // 3rd element of diagonal is the greatest value
        // Find scale according to 3rd element, and double it
        s = 0.5 / Math.sqrt(1 + m22 - m00 - m11);

        q[0] = (m20 + m02) * s;
        q[1] = (m21 + m12) * s;
        q[2] = 0.25 / s;
        q[3] = (m10 - m01) * s;
      }
    }

    return this;
  },

  /**
   * Set the quaternion values from 3 orthonormal local axes.
   *
   * @param {!Array.<Number>} a The [pitch,yaw,roll] ([x,y,z]) angles in radians.
   *
   * @return {!vecJS.Q} This instance.
   */
  fromPitchYawRoll: function (a) {
    /*@DEBUG*/
    if (!dbg.isArray(a)) { throw 'a is not an array'; }
    if (a.length !== 3) { throw 'a has an invalid size (' + (a.length) + ').'; }
    /*/@DEBUG*/
    // qx = sin(yaw/2)*cos(pitch/2)*sin(roll/2) + cos(yaw/2)*sin(pitch/2)*cos(roll/2);
    // qy = sin(yaw/2)*cos(pitch/2)*cos(roll/2) - cos(yaw/2)*sin(pitch/2)*sin(roll/2);
    // qz = cos(yaw/2)*cos(pitch/2)*sin(roll/2) - sin(yaw/2)*sin(pitch/2)*cos(roll/2);
    // qw = cos(yaw/2)*cos(pitch/2)*cos(roll/2) + sin(yaw/2)*sin(pitch/2)*sin(roll/2);
    var q = this.q,
        ap = a[0]*0.5, ay = a[1]*0.5, ar = a[2]*0.5,
        sp = Math.sin(ap), cp = Math.cos(ap),
        sy = Math.sin(ay), cy = Math.cos(ay),
        sr = Math.sin(ar), cr = Math.cos(ar),
        cycr = cy * cr,
        sycr = sy * cr,
        cysr = cy * sr,
        sysr = sy * sr;

    q[0] = sysr*cp + cycr*sp;
    q[1] = sycr*cp - cysr*sp;
    q[2] = cysr*cp - sycr*sp;
    q[3] = cycr*cp + sysr*sp;

    return this.normalize();
  },

  /**
  * Add the specified quaternion to this one and assign the result to this instance.
  *
  * @param {!Array.<Number>} q The quaternion to add to this instance ({@link vecJS.Q#q}).
  *
  * @return {!vecJS.Q} This instance.
  */
  add: function (q) {
    /*@DEBUG*/
    if (!dbg.isArray(q)) { throw 'q is not an array'; }
    if (q.length !== 4) { throw 'q has an invalid size (' + (q.length) + ').'; }
    /*/@DEBUG*/
    var a = this.q;
    a[0] += q[0];
    a[1] += q[1];
    a[2] += q[2];
    a[3] += q[3];
    return this;
  },
  /**
  * Subtract the specified quaternion from this one and assign the result to this instance.
  *
  * @param {!Array.<Number>} q The quaternion to subtract from this instance ({@link vecJS.Q#q}).
  *
  * @return {!vecJS.Q} This instance.
  */
  sub: function (q) {
    /*@DEBUG*/
    if (!dbg.isArray(q)) { throw 'q is not an array'; }
    if (q.length !== 4) { throw 'q has an invalid size (' + (q.length) + ').'; }
    /*/@DEBUG*/
    var a = this.q;
    a[0] -= q[0];
    a[1] -= q[1];
    a[2] -= q[2];
    return this;
  },
  /**
  * Add b to a and assign the result to this instance.
  *
  * @param {!Array.<Number>} a The first term of the addition ({@link vecJS.Q#q}).
  * @param {!Array.<Number>} b The second term of the addition ({@link vecJS.Q#q}).
  *
  * @return {!vecJS.Q} This instance.
  */
  assignAdd: function (a, b) {
    /*@DEBUG*/
    if (!dbg.isArray(a)) { throw 'a is not an array'; }
    if (!dbg.isArray(b)) { throw 'b is not an array'; }
    if (a.length !== 4) { throw 'a has an invalid size (' + (a.length) + ').'; }
    if (b.length !== 4) { throw 'b has an invalid size (' + (b.length) + ').'; }
    /*/@DEBUG*/
    var q = this.q;
    q[0] = a[0] + b[0];
    q[1] = a[1] + b[1];
    q[2] = a[2] + b[2];
    q[2] = a[3] + b[3];
    return this;
  },
  /**
  * Subtract b from a and assign the result to this instance.
  *
  * @param {!Array.<Number>} a The first term of the subtraction ({@link vecJS.Q#q}).
  * @param {!Array.<Number>} b The second term of the subtraction ({@link vecJS.Q#q}).
  *
  * @return {!vecJS.Q} This instance.
  */
  assignSub: function (a, b) {
    /*@DEBUG*/
    if (!dbg.isArray(a)) { throw 'a is not an array'; }
    if (!dbg.isArray(b)) { throw 'b is not an array'; }
    if (a.length !== 4) { throw 'a has an invalid size (' + (a.length) + ').'; }
    if (b.length !== 4) { throw 'b has an invalid size (' + (b.length) + ').'; }
    /*/@DEBUG*/
    var q = this.q;
    q[0] = a[0] - b[0];
    q[1] = a[1] - b[1];
    q[2] = a[2] - b[2];
    q[2] = a[3] - b[3];
    return this;
  },

  /**
  * Multiply all the components of this instance by the specified number.
  *
  * @param {number} s The multiplier.
  *
  * @return {!vecJS.Q} This instance.
  */
  mulScalar: function (s) {
  /*@DEBUG*/
  if (!dbg.isNumber(s)) { throw 's is not a number'; }
  /*/@DEBUG*/
    var q = this.q;
    q[0] *= s;
    q[1] *= s;
    q[2] *= s;
    q[3] *= s;
    return this;
  },
  /**
  * Divide all the components of this instance by the specified number.
  *
  * @param {number} s The divider.
  *
  * @return {!vecJS.Q} This instance.
  */
  divScalar: function (s) {
  /*@DEBUG*/
  if (!dbg.isNumber(s)) { throw 's is not a number'; }
  /*/@DEBUG*/
    var q = this.q;
    q[0] /= s;
    q[1] /= s;
    q[2] /= s;
    q[3] /= s;
    return this;
  },

  /**
   * Perform a quaternion multiplication and assign the result to this instance.
   *
   * @param q {!Array.<Number>} The multiplier ({@link vecJS.Q#q}).
   *
   * @return {!vecJS.Q} This instance.
   */
  mul: function (q) {
    /*@DEBUG*/
    if (!dbg.isArray(q)) { throw 'q is not an array'; }
    if (q.length !== 4) { throw 'q has an invalid size (' + (q.length) + ').'; }
    /*/@DEBUG*/
    var a = this.q,
        ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = q[0], by = q[1], bz = q[2], bw = q[3];

    a[0] = ax*bw + aw*bx + az*by - ay*bz;
    a[1] = ay*bw + aw*by + ax*bz - az*bx;
    a[2] = az*bw + aw*bz + ay*bx - ax*by;
    a[3] = aw*bw - ax*bx - ay*by - az*bz;

    return this;
  },

  /**
  * Calculate the dot product of this quaternion and the specified one.
  *
  * @param {!Array.<Number>} q The second term of the dot product ({@link vecJS.Q#q}).
  *
  * @return {number} The result of the dot product.
  */
  dot: function (q) {
    /*@DEBUG*/
    if (!dbg.isArray(q)) { throw 'q is not an array'; }
    if (q.length !== 4) { throw 'q has an invalid size (' + (q.length) + ').'; }
    /*/@DEBUG*/
    var a = this.q;
    return a[0]*q[0] + a[1]*q[1] + a[2]*q[2] + a[3]*q[3];
  },

  /**
   * Calculate the local roll (x) element of this quaternion.
   *
   * @param {Boolean=} reprojectAxis By default the method returns the 'intuitive'
   * result that is, if you projected the local Y of the quaternion onto the X and
   * Y axes, the angle between them is returned. If set to false though, the
   * result is the actual yaw that will be used to implement the quaternion,
   * which is the shortest possible path to get to the same orientation and
   * may involve less axial rotation.
   *
   * @return {number} The quaternion roll element.
   */
  getRoll: function (reprojectAxis) {
    var q = this.q,
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],
        ty, tz;

    if (!reprojectAxis) {
      return Math.atan2(2*(qx*qy + qw*qz), qw*qw + qx*qx - qy*qy - qz*qz);
    }

    ty = 2*qy;
    tz = 2*qz;
    return Math.atan2(ty*qx + tz*qw, 1 - (ty*qy + tz*qz));

 },
  /**
   * Calculate the local pitch (y) element of this quaternion.
   *
   * @param {Boolean=} reprojectAxis By default the method returns the 'intuitive'
   * result that is, if you projected the local Z of the quaternion onto the X and
   * Y axes, the angle between them is returned. If set to true though, the
   * result is the actual yaw that will be used to implement the quaternion,
   * which is the shortest possible path to get to the same orientation and
   * may involve less axial rotation.
   *
   * @return {number} The quaternion pitch element.
   */
  getPitch: function (reprojectAxis) {
    var q = this.q,
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],
        tx, tz;

    if (!reprojectAxis) {
      return Math.atan2(2*(qy*qz + qw*qx), qw*qw - qx*qx - qy*qy + qz*qz);
    }

    tx = 2*qx;
    tz = 2*qz;
    return Math.atan2(tz*qy + tx*qw, 1 - (tx*qx + tz*qz));
  },
  /**
   * Calculate the local yaw (z) element of this quaternion.
   *
   * @param {Boolean=} reprojectAxis By default the method returns the 'intuitive'
   * result that is, if you projected the local Z of the quaternion onto the X and
   * Z axes, the angle between them is returned. If set to true though, the
   * result is the actual yaw that will be used to implement the quaternion,
   * which is the shortest possible path to get to the same orientation and
   * may involve less axial rotation.
   *
   * @return {number} The quaternion yaw element.
   */
  getYaw: function (reprojectAxis) {
    var q = this.q,
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],
        tx, ty, tz;

    if (!reprojectAxis) {
      return Math.asin(-2*(qx*qz - qw*qy));
    }

    tx = 2*qx;
    ty = 2*qy;
    tz = 2*qz;
    return Math.atan2(tz*x + ty*qw, 1 - (tx*qx + ty*qy));
  },

  /**
   * Perform a spherical linear interpolation between a & b and assign the result to this instance
   *
   * @param {!Array.<Number>} a The start quaternion ({@link vecJS.Q#q}).
   * @param {!Array.<Number>} b The end quaternion ({@link vecJS.Q#q}).
   * @param {Number} t The interpolation amount between the two quaternions (between 0 and 1).
   * @param {Boolean} shortest When true, the slerp interpolation will always use the "shortest path"
   *    between the Quaternions' orientations, by "flipping" the source Quaternion if needed
   */
  slerp: function (a, b, t, shortest) {
    /*@DEBUG*/
    if (!dbg.isArray(a)) { throw 'a is not an array'; }
    if (!dbg.isArray(b)) { throw 'b is not an array'; }
    if (!dbg.isNumber(t)) { throw 't is not aa number'; }
    if (a.length !== 4) { throw 'a has an invalid size (' + (a.length) + ').'; }
    if (b.length !== 4) { throw 'b has an invalid size (' + (b.length) + ').'; }
    /*/@DEBUG*/
    var q = this.q,
        ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = b[0], by = b[1], bz = b[2], bw = b[3],
        e = 1,
        dot = ax*bx + ay*by + az*bz + aw*bw,
        theta, sinTheta,
        c1 = 1 - t,
        c2 = t;

    if (dot < 0) {
      if (shortest) { e = -1 };
      dot = -dot;
    }
    if (1 - dot > 0.001) {
      // Spherical interpolation
      theta = Math.acos(dot);
      sinTheta = Math.sin(theta);
      c1 = Math.sin(theta * c1) / sinTheta;
      c2 = Math.sin(theta * c2) / sinTheta;
    }

    c2 *= e;
    q[0] = c1*ax + c2*bx;
    q[1] = c1*ay + c2*by;
    q[2] = c1*az + c2*bz;
    q[3] = c1*aw + c2*bw;

    return this;
  },

  /**
   * Interpolates between quaternions, using spherical quadrangle interpolation,
   * and assign the resulting quaternion to this instance.
   *
   * Use {@link vecJS.Q#squadTangent} to define the Quaternion tangents tgA and tgB.
   *
   * @param {!Array.<Number>} a The start quaternion ({@link vecJS.Q#q}).
   * @param {!Array.<Number>} tgA The first tangent ({@link vecJS.Q#q}).
   * @param {!Array.<Number>} tgB The second tangent ({@link vecJS.Q#q}).
   * @param {!Array.<Number>} b The end quaternion ({@link vecJS.Q#q}).
   * @param {Number} t
   */
  squad: function (a, tgA, tgB, b, t) {
    /*@DEBUG*/
    if (!dbg.isArray(a)) { throw 'a is not an array'; }
    if (!dbg.isArray(tgA)) { throw 'tgA is not an array'; }
    if (!dbg.isArray(tgB)) { throw 'tgB is not an array'; }
    if (!dbg.isArray(b)) { throw 'b is not an array'; }
    if (!dbg.isNumber(t)) { throw 't is not aa number'; }
    if (a.length !== 4) { throw 'a has an invalid size (' + (a.length) + ').'; }
    if (tgA.length !== 4) { throw 'tgA has an invalid size (' + (tgA.length) + ').'; }
    if (tgB.length !== 4) { throw 'tgB has an invalid size (' + (tgB.length) + ').'; }
    if (b.length !== 4) { throw 'b has an invalid size (' + (b.length) + ').'; }
    /*/@DEBUG*/
    return this.slerp(vecJS.Q._q1.slerp(a, b, t, true).q, vecJS.Q._q2.slerp(tgA, tgB, t, false).q, 2*t*(1-t), false);
  },

  /**
   * Calculate a tangent Quaternion for center, defined by before and after Quaternions.
   *
   * Useful for smooth spline interpolation of Quaternion with {@link vecJS.Q#squad} and {@link vecJS.Q#slerp}.
   *
   * @param {!Array.<Number>} before ({@link vecJS.Q#q}).
   * @param {!Array.<Number>} center ({@link vecJS.Q#q}).
   * @param {!Array.<Number>} after ({@link vecJS.Q#q}).
   */
  squadTangent: function(before, center, after) {
    /*@DEBUG*/
    if (!dbg.isArray(before)) { throw 'before is not an array'; }
    if (!dbg.isArray(center)) { throw 'center is not an array'; }
    if (!dbg.isArray(after)) { throw 'after is not an array'; }
    if (before.length !== 4) { throw 'before has an invalid size (' + (before.length) + ').'; }
    if (center.length !== 4) { throw 'center has an invalid size (' + (center.length) + ').'; }
    if (after.length !== 4) { throw 'after has an invalid size (' + (after.length) + ').'; }
    /*/@DEBUG*/
    var q = this.q,
        _q1 = vecJS.Q._q1, _q2 = vecJS.Q._q2,
        a = _q1.q, b = _q2.q;

    _q1.set(center).mulScalar(-1).mul(before).normalize().log();
    _q2.set(center).mulScalar(-1).mul(after).normalize().log();

    q[0] = -0.25 * (a[0] + b[0]);
    q[1] = -0.25 * (a[1] + b[1]);
    q[2] = -0.25 * (a[2] + b[2]);
    q[3] = -0.25 * (a[3] + b[3]);

    return this.assignMul(center, this.exp());
  },

  /**
   * Calculate the logarithm of this quaternion and assign it to this instance.
   *
   * @see vecJS.Q#exp
   *
   * @return {!vecJS.Q} This instance.
   */
  log: function () {
    var q = this.q,
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],
        l = qx*qx + qy*qy + qz*qz + qw*qw,
        c;

    if (l > 1 + @PRECISION) {
      q[3] = 0;
      return this;
    }

     if (l > 1 - @PRECISION) {
       l = Math.sqrt(qx*qx + qy*qy + qz*qz);
       c = Math.atan2(l, qw) / l;
       q[0] *= c;
       q[1] *= c;
       q[2] *= c;
       q[3] = 0;
       return this;
     }

    return this;
  },
  /**
   * Calculate the exponential of this quaternion and assign it to this instance.
   *
   * @see vecJS.Q#log
   *
   * @return {!vecJS.Q} This instance.
   */
  exp: function() {
    var q = this.q,
        qx = q[0], qy = q[1], qz = q[2],
        l = qx*qx + qy*qy + qz*qz,
        c;

    if (l < @PRECISION) {
      q[0] = 0;
      q[1] = 0;
      q[2] = 0;
      q[3] = 1;
      return this;
    }

    l = Math.sqrt(l);
    c = Math.sin(l) / l;
    q[0] *= c;
    q[1] *= c;
    q[2] *= c;
    q[3] = Math.cos(l);

    return this;
  },

  /**
   * Calculate the length (norm) of this quaternion.
   *
   * @return {number} The length of this quaternion.
   */
  length: function () {
    var q = this.q,
        qx = q[0], qy = q[1], qz = q[2], qw = q[3];
    return Math.sqrt(qx*qx + qy*qy + qz*qz + qw*qw);
  },
  /**
  * Calculate the squared length of this vector.
  *
  * @return {number} The squared length of this vector.
  */
  squaredLength: function () {
    var q = this.q,
        qx = q[0], qy = q[1], qz = q[2], qw = q[3];
    return qx*qx + qy*qy + qz*qz + qw*qw;
  },

  /**
  * Normalize this quaternion and assign the resulting unit quaternion to this instance.
  *
  * @return {!vecJS.Q} This instance.
  */
  normalize: function () {
    var q = this.q,
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],
        l = qx*qx + qy*qy + qz*qz + qw*qw;

    if (l == 1) {
      return this;
    }
    return l ? this.mulScalar(1 / Math.sqrt(l)) : this.set([0, 0, 0, 0]);
  },

  /**
   * Check if this instance is a unit-length quaternion.
   *
   * Should be a bit faster than checking if length == 1, since there is no square root.
   * vecJC Precision (@PRECISION) is used, so the quaternion length does not have to be exactly 1,
   * but something close enough.
   *
   * @return {boolean} True if this instance is a unit-length quaternion; otherwise, false.
   */
  isUnit: function () {
    var q = this.q,
        qx = q[0], qy = q[1], qz = q[2], qw = q[3];
    return Math.abs(1 - (qx*qx + qy*qy + qz*qz + qw*qw)) < @PRECISION;
  },

  /**
   * Return a string representation of the current instance.
   */
  toString: function () {
    var q = this.q;
    return 'Q[' + disp_f(q[0]) + ', ' + disp_f(q[1]) + ', ' + disp_f(q[2]) + ', ' + disp_f(q[3]) + ']';
  }
};

/*
q0 = |Q0 + Q1| < |Q0 - Q1| ? -Q0 : Q0
q2 = |Q1 + Q2| < |Q1 - Q2| ? -Q2 : Q2
q3 = |Q2 + Q3| < |Q2 - Q3| ? -Q3 : Q3
*/
vecJS.Q.squadSetup = function (a, b, c, q0, q1, q2, q3) {
  /*@DEBUG*/
  if (!(a instanceof vecJS.Q)){ throw 'a is not a vecJS.Q'; }
  if (!(b instanceof vecJS.Q)){ throw 'b is not a vecJS.Q'; }
  if (!(c instanceof vecJS.Q)){ throw 'c is not a vecJS.Q'; }
  if (!(q0 instanceof vecJS.Q)){ throw 'q0 is not a vecJS.Q'; }
  if (!(q1 instanceof vecJS.Q)){ throw 'q1 is not a vecJS.Q'; }
  if (!(q2 instanceof vecJS.Q)){ throw 'q2 is not a vecJS.Q'; }
  if (!(q3 instanceof vecJS.Q)){ throw 'q3 is not a vecJS.Q'; }
  /*/@DEBUG*/
  var _q1 = vecJS.Q._q1,
      _q2 = vecJS.Q._q2,
      _q3 = vecJS.Q._q3;
  q0 = q0.clone();
  q2 = q2.clone();
  q3 = q3.clone();

  if (_q1.assignAdd(q0.q, q1.q).squaredLength() > _q1.assignSub(q0.q, q1.q).squaredLength()) { q0.mulScalar(-1); }
  if (_q1.assignAdd(q1.q, q2.q).squaredLength() > _q1.assignSub(q1.q, q2.q).squaredLength()) { q2.mulScalar(-1); }
  if (_q1.assignAdd(q2.q, q3.q).squaredLength() > _q1.assignSub(q2.q, q3.q).squaredLength()) { q3.mulScalar(-1); }

  _q1
    .set(q1.q)
    .exp()
    .assignAdd(
      _q1.clone().mulQ(q2.q).log().q,
      _q1.clone().mulQ(q0.q).log().q
    )
    .mulScalar(-0.25)
    .exp();

  _q2
    .set(q2.q)
    .exp()
    .assignAdd(
      _q2.clone().mulQ(q3.q).log().q,
      _q2.clone().mulQ(q1.q).log().q
    )
    .mulScalar(-0.25)
    .exp();

  a.set(q1.q).mulQ(_q1.q);    // A = q1 * e[-0.25 *( Ln[Exp(q1)*q2] + Ln[Exp(q1)*q0] ) ]
  b.set(q2.q).mulQ(_q2.q);    // B = q2 * e[-0.25 *( Ln[Exp(q2)*q3] + Ln[Exp(q2)*q1] ) ]
  c.set(q2.q);              // C = q2
};

vecJS.Q._q1 = new vecJS.Q();
vecJS.Q._q2 = new vecJS.Q();
