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
 * @param {Array=} arr Array containing the [x,y,z,w] values to initialize with.
 *
 * @property {GLMatrixArray} q the quaternion [x,y,z,w] values.
*
* @constructor
*/
vecJS.Q = function Q(arr) {
  var q = this.q = new GLMatrixArray(4);
  if (arr) {
    q[0] = arr[0];
    q[1] = arr[1];
    q[2] = arr[2];
    q[3] = arr[3];
  }
};

(function () {
  vecJS.Q.prototype = {
    constructor: vecJS.Q,

    /**
    * Set the current instance values.
    *
     * @param {!Array} arr The new [x,y,z,w] values
    *
    * @return {!vecJS.Q} This instance.
    */
    set: function (arr) {
      var q = this.q;
      q[0] = arr[0];
      q[1] = arr[1];
      q[2] = arr[2];
      q[3] = arr[3];
      return this;
    },
    /**
    * Copy this quaternion to the specified one.
    *
    * @param {!vecJS.Q} q The target quaternion.
    *
    * @return {!vecJS.Q} This instance.
    */
    copyTo: function (q) {
      q = q.q;
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
     * @param {!(vecJS.M34|vecJS.M44)}m The source quaternion
     *
     * @return {!vecJS.Q} This instance.
     */
    fromMatrix: function (m) {
      m=m.m;
      var q = this.q,
          m00 = m[0], m01 = m[1], m02 = m[2],
          m10 = m[4], m11 = m[5], m12 = m[6],
          m20 = m[8], m21 = m[9], m22 = m[10],
          d = m00 + m11 + m22 + 1,
          s;

      if (d > 0) {
        s = Math.sqrt(d) * 2;
        q[0] = (m21 - m12) / s;
        q[1] = (m02 - m20) / s;
        q[2] = (m10 - m01) / s;
        q[3] = 0.25 * s;
      } else {
        if (m00 > m11 && m00 > m22) {
          // 1st element of diagonal is the greatest value.
          // Find scale according to 1st element, and double it
          s = Math.sqrt(1 + m00 - m11 - m22) * 2;

          q[0] = 0.25 * s;
          q[1] = (m01 + m10) / s;
          q[2] = (m20 + m02) / s;
          q[3] = (m21 - m12) / s;
        } else if (m11 > m22) {
          // 2nd element of diagonal is the greatest value.
          // Find scale according to 2nd element, and double it
          s = Math.sqrt(1 + m11 - m00 - m22) * 2;

          q[0] = (m01 + m10) / s;
          q[1] = 0.25 * s;
          q[2] = (m12 + m21) / s;
          q[3] = (m02 - m20) / s;
        } else {
          // 3rd element of diagonal is the greatest value
          // Find scale according to 3rd element, and double it
          s = Math.sqrt(1 + m22 - m00 - m11) * 2;

          q[0] = (m02 + m20) / s;
          q[1] = (m12 + m21) / s;
          q[2] = 0.25 * s;
          q[3] = (m10 - m01) / s;
        }
      }

      return this.normalize();
    },

    /**
     * Set the quaternion values from the specified Euler angles.
     *
     * @param {!Array} arr The values of the [x,y,z] angles in radians.
     *
     * @return {!vecJS.Q} This instance.
     */
    fromEuler: function (arr) {
      var q = this.q,

          ax = arr[0] * 0.5, ay = arr[1] * 0.5, az = arr[2] * 0.5,
          sr = Math.sin(ax), cr = Math.cos(ax),
          sp = Math.sin(ay), cp = Math.cos(ay),
          sy = Math.sin(az), cy = Math.cos(az),
          cpcy = cp * cy,
          spcy = sp * cy,
          cpsy = cp * sy,
          spsy = sp * sy;

      q[0] = sr*cpcy - cr*spsy;
      q[1] = cr*spcy + sr*cpsy;
      q[2] = cr*cpsy - sr*spcy;
      q[3] = cr*cpcy + sr*spsy;

      return this.normalize();
    },

    /**
    * Add the specified quaternion to this one and assign the result to this instance.
    *
    * @param {!vecJS.Q} q The quaternion to add to this instance.
    *
    * @return {!vecJS.Q} This instance.
    */
    add: function (q) {
      q = q.q;
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
    * @param {!vecJS.Q} q The quaternion to subtract from this instance.
    *
    * @return {!vecJS.Q} This instance.
    */
    sub: function (q) {
      q = q.q;
      var a = this.q;
      a[0] -= q[0];
      a[1] -= q[1];
      a[2] -= q[2];
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
     * @param q
     *
     * @return {!vecJS.Q} This instance.
     */
    mul: function (q) {
      q = q.q;
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
    * @param {!vecJS.Q} q The second term of the dot product.
    *
    * @return {number} The result of the dot product.
    */
    dot: function (q) {
      q = q.q;
      var a = this.q;
      return a[0]*q[0] + a[1]*q[1] + a[2]*q[2] + a[3]*q[3];
    },

    /**
     * Performs a spherical linear interpolation and assign the result to this instance
     *
     * @param {!vecJS.Q} q The quaternion to interpolate with this one.
     * @param {Number} t The interpolation amount between the two quaternions (between 0 and 1).
     * @param {Boolean} shortest When true, the slerp interpolation will always use the "shortest path"
     * between the Quaternions' orientations, by "flipping" the source Quaternion if needed
     */
    slerp: function (q, t, shortest) {
      q = q.q;
      var a = this.q,
          ax = a[0], ay = a[1], az = a[2], aw = a[3],
          bx = q[0], by = q[1], bz = q[2], bw = q[3],
          cosAngle =  ax*bx + ay*by + az*bz + aw*bw,
          angle, sinAngle,
          c1, c2;

      if ((1 - Math.abs(cosAngle)) < 0.01) {
        c1 = 1 - t;
        c2 = t;
      } else {
        // Spherical interpolation
        angle = Math.acos(cosAngle);
        sinAngle = Math.sin(angle);
        c1 = Math.sin(angle * (1 - t)) / sinAngle;
        c2 = Math.sin(angle * t) / sinAngle;
      }

      // Use the shortest path
      if (shortest && (cosAngle < 0.0)) {
        c1 = -c1;
      }

      a[0] = c1*ax + c2*bx;
      a[1] = c1*ay + c2*by;
      a[2] = c1*az + c2*az;
      a[3] = c1*aw + c2*aw;

      return this;
    },

    /**
     * Perform a spherical linear interpolation between a & b and assign the result to this instance
     *
     * @param {!vecJS.Q} a The start quaternion.
     * @param {!vecJS.Q} b The end quaternion.
     * @param {Number} t The interpolation amount between the two quaternions (between 0 and 1).
     * @param {Boolean} shortest When true, the slerp interpolation will always use the "shortest path"
     * between the Quaternions' orientations, by "flipping" the source Quaternion if needed
     */
    assignSlerp: function (a, b, t, shortest) {
      a = a.q;
      b = b.q;
      var q = this.q,
          ax = a[0], ay = a[1], az = a[2], aw = a[3],
          bx = b[0], by = b[1], bz = b[2], bw = b[3],
          cosAngle =  ax*bx + ay*by + az*bz + aw*bw,
          angle, sinAngle,
          c1, c2;

      if ((1 - Math.abs(cosAngle)) < 0.01) {
        c1 = 1 - t;
        c2 = t;
      } else {
        // Spherical interpolation
        angle = Math.acos(cosAngle);
        sinAngle = Math.sin(angle);
        c1 = Math.sin(angle * (1 - t)) / sinAngle;
        c2 = Math.sin(angle * t) / sinAngle;
      }

      // Use the shortest path
      if (shortest && (cosAngle < 0.0)) {
        c1 = -c1;
      }

      q[0] = c1*ax + c2*bx;
      q[1] = c1*ay + c2*by;
      q[2] = c1*az + c2*az;
      q[3] = c1*aw + c2*aw;

      return this;
    },

    /**
     * Perform a slerp interpolation of the two Quaternions a & b, at time t,
     * using tangents tgA and tgB and assign the result to this instance.
     *
     * Use {@link vecJS.Q#assignSquadTangent} to define the Quaternion tangents tgA and tgB.
     *
     * @param {!vecJS.Q} a The start quaternion.
     * @param {!vecJS.Q} tgA The first tangent.
     * @param {!vecJS.Q} tgB The second tangent.
     * @param {!vecJS.Q} b The end quaternion.
     * @param {Number} t
     */
    assignSquad: function (a, tgA, tgB, b, t) {
      q1.assignSlerp(a, b, t, true);
      q2.assignSlerp(tgA, tgB, t, false);
      this.assignSlerp(q1, q2, 2*t*(1-t), false);
    },

    /**
     * Calculate a tangent Quaternion for center, defined by before and after Quaternions.
     *
     * Useful for smooth spline interpolation of Quaternion with squad and slerp.
     *
     * @param before
     * @param center
     * @param after
     */
    assignSquadTangent: function(before, center, after) {
      var q = this.q,
          a = q1.q, b = q2.q;
      
      q1.set(center.q).mulScalar(-1).mul(before).normalize().log();
      q2.set(center.q).mulScalar(-1).mul(after).normalize().log();

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

      if (l < 1e-6) {
        q[3] = 0;
        return this;
      }

      c = Math.acos(q[3]) / Math.sqrt(l);
      q[0] *= c;
      q[1] *= c;
      q[2] *= c;
      q[3] = 0;

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
          qx = q[0], qy = q[1], qz = q[2], qw = q[3],
          t = qx*qx + qy*qy + qz*qz + qw*qw,
          c;

      if (l < 1e-6) {
        q[3] = 1;
        return this;
      }

      t = Math.sqrt(t);
      c = Math.sin(t) / t;
      q[0] *= c;
      q[1] *= c;
      q[2] *= c;
      q[3] = Math.cos(t);

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

    toString: function () {
      var q = this.q;
      return 'Q[' + q[0] + ', ' + q[1] + ', ' + q[2] + ', ' + q[3] + ']';
    }
  };

  var q1 = new vecJS.Q(),
      q2 = new vecJS.Q();
})();
