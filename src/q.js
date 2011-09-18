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
* @class A 4 dimensional vector to represent a quaternion.
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
  * Copy this quaternion instance to the specified one.
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
  * Create a clone of the quaternion instance.
  *
  * @return {!vecJS.Q} A new quaternion instance which is a copy of this one.
  */
  clone: function () {
    return new vecJS.Q(this.q);
  },

  /**
   * Set the quaternion values from the specified 3x4 matrix.
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
  * Multiply the specified matrix with this quaternion and assign the result to this instance.
  *
  * @param {!vecJS.M34} m The matrix to multiply.
  *
  * @return {!vecJS.Q} This instance.
  */
  mulM34: function (m) {
    m = m.m;
    var q = this.q,
        qx = q[0], qy = q[1], qz = q[2], qw = q[3];

    q[0] = qx*m[0] + qy*m[1] + qz*m[2]  + qw*m[3];
    q[1] = qx*m[4] + qy*m[5] + qz*m[6]  + qw*m[7];
    q[2] = qx*m[8] + qy*m[9] + qz*m[10] + qw*m[11];

    return this;
  },
  /**
  * Multiply the specified matrix with this quaternion and assign the result to this instance.
  *
  * @param {!vecJS.M44} m The matrix to multiply.
  *
  * @return {!vecJS.Q} This instance.
  */
  mulM44: function (m) {
    m = m.m;
    var q = this.q,
        qx = q[0], qy = q[1], qz = q[2], qw = q[3];

    q[0] = qx*m[0]  + qy*m[1]  + qz*m[2]  + qw*m[3];
    q[1] = qx*m[4]  + qy*m[5]  + qz*m[6]  + qw*m[7];
    q[2] = qx*m[8]  + qy*m[9]  + qz*m[10] + qw*m[11];
    q[3] = qx*m[12] + qy*m[13] + qz*m[14] + qw*m[15];
    
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
   * @param {Number} l The interpolation amount between the two quaternions.
   */
  slerp: function (q, l) {
    q = q.q;
    var a = this.q,
        ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = q[0], by = q[1], bz = q[2], bw = q[3],
        halfTheta,
        sinHalfTheta,
        cosHalfTheta =  ax*bx + ay*by + az*bz + aw*bw,
        ra, rb;

    if (Math.abs(cosHalfTheta) >= 1.0){
      return this;
    }

    halfTheta = Math.acos(cosHalfTheta);
    sinHalfTheta = Math.sqrt(1.0 - cosHalfTheta*cosHalfTheta);

    if (Math.abs(sinHalfTheta) < 1e-3){
      a[0] = (ax + bx) * 0.5;
      a[1] = (ay + by) * 0.5;
      a[2] = (az + bz) * 0.5;
      a[3] = (aw + bw) * 0.5;
      return this;
    }

    ra = Math.sin((1 - l)*halfTheta) / sinHalfTheta;
    rb = Math.sin(l*halfTheta) / sinHalfTheta;

    a[0] = (ax*ra + bx*rb);
    a[1] = (ay*ra + by*rb);
    a[2] = (az*ra + bz*rb);
    a[3] = (aw*ra + bw*rb);

    return this;
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
