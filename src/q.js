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

    if (Math.abs(sinHalfTheta) < 0.001){
      a[0] = (ax*0.5 + bx*0.5);
      a[1] = (ay*0.5 + by*0.5);
      a[2] = (az*0.5 + bz*0.5);
      a[3] = (aw*0.5 + bw*0.5);
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
