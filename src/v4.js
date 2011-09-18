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
* @class A 4 dimensional vector to use with homogenous coordinates. Can also be used as a quaternion.
*
 * @param {Array=} arr Array containing values to initialize with.
 *
 * @property {GLMatrixArray} v the vector values.
*
* @constructor
*/
vecJS.V4 = function V4(arr) {
  var v = this.v = new GLMatrixArray(4);
  if (arr) {
    v[0] = arr[0];
    v[1] = arr[1];
    v[2] = arr[2];
    v[3] = arr[3];
  }
};

vecJS.V4.prototype = {
  constructor: vecJS.V4,
  
  /**
  * Set the current instance values.
  *
   * @param {!Array} arr The new values
  *
  * @return {!vecJS.V4} This instance.
  */
  set: function (arr) {
    var v = this.v;
    v[0] = arr[0];
    v[1] = arr[1];
    v[2] = arr[2];
    v[3] = arr[3];
    return this;
  },
  /**
   * Copy the specified vector to this instance.
   *
   * @param {vecJS.V4} v The source vector.
   *
   * @return {!vecJS.V4} This instance.
   */
  copy: function (v) {
    v = v.v;
    var a = this.v;
    a[0] = v[0];
    a[1] = v[1];
    a[2] = v[2];
    a[3] = v[3];
    return this;
  },
  /**
  * Copy this vector instance to the specified one.
  *
  * @param {!vecJS.V4} v The target vector.
  *
  * @return {!vecJS.V4} This instance.
  */
  copyTo: function (v) {
    v = v.v;
    var a = this.v;
    v[0] = a[0];
    v[1] = a[1];
    v[2] = a[2];
    v[3] = a[3];
    return this;
  },
  /**
  * Create a clone of the vector instance.
  *
  * @return {!vecJS.V4} A new vector instance which is a copy of this one.
  */
  clone: function () {
    return new vecJS.V4(this.v);
  },

/**
  * Multiply all the components of this instance by the specified number.
  *
  * @param {number} s The multiplier.
  *
  * @return {!vecJS.V4} This instance.
  */
  mulScalar: function (s) {
    var v = this.v;
    v[0] *= s;
    v[1] *= s;
    v[2] *= s;
    v[3] *= s;
    return this;
  },
  /**
  * Divide all the components of this instance by the specified number.
  *
  * @param {number} s The divider.
  *
  * @return {!vecJS.V4} This instance.
  */
  divScalar: function (s) {
    var v = this.v;
    v[0] /= s;
    v[1] /= s;
    v[2] /= s;
    v[3] /= s;
    return this;
  },

  /**
  * Multiply the specified matrix with this vector and assign the result to this instance.
  *
  * @param {!vecJS.M34} m The matrix to multiply.
  *
  * @return {!vecJS.V4} This instance.
  */
  mulM34: function (m) {
    m = m.m;
    var v = this.v,
        vx = v[0], vy = v[1], vz = v[2], vw = v[3];

    this.x = m.n11 * vx + m.n12 * vy + m.n13 * vz + m.n14 * vw;
    this.y = m.n21 * vx + m.n22 * vy + m.n23 * vz + m.n24 * vw;
    this.z = m.n31 * vx + m.n32 * vy + m.n33 * vz + m.n34 * vw;
    return this;
  },
  /**
  * Multiply the specified matrix with this vector and assign the result to this instance.
  *
  * @param {!vecJS.M44} m The matrix to multiply.
  *
  * @return {!vecJS.V4} This instance.
  */
  mulM44: function (m) {
    m = m.m;
    var v = this.v,
        vx = v[0], vy = v[1], vz = v[2], vw = v[3];

    this.x = m.n11 * vx + m.n12 * vy + m.n13 * vz + m.n14 * vw;
    this.y = m.n21 * vx + m.n22 * vy + m.n23 * vz + m.n24 * vw;
    this.z = m.n31 * vx + m.n32 * vy + m.n33 * vz + m.n34 * vw;
    this.w = m.n41 * vx + m.n42 * vy + m.n43 * vz + m.n44 * vw;
    
    return this;
  },

  /**
   * Perform a quaternion multiplication and assign the result to this instance.
   *
   * @param v
   *
   * @return {!vecJS.V4} This instance.
   */
  mulQuat: function (v) {
    v = v.v;
    var a = this.v,
        ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = v[0], by = v[1], bz = v[2], bw = v[3];

    a[0] = ax*bw + aw*bx + ay*bz - az*by;
    a[1] = ay*bw + aw*by + az*bx - ax*bz;
    a[2] = az*bw + aw*bz + ax*by - ay*bx;
    a[3] = aw*bw - ax*bx - ay*by - az*bz;

    return this;
  },

  /**
   * Performs a spherical linear interpolation and assign the result to this instance
   *
   * @param {!vecJS.V4} q The quaternion to interpolate with this one.
   * @param {Number} l The interpolation amount between the two vectors.
   */
  slerp: function (q, l) {
    var v = this.v,
        ax = v[0], ay = v[1], az = v[2], aw = v[3],
        bx = v[0], by = v[1], bz = v[2], bw = v[3],
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
      v[0] = (ax*0.5 + bx*0.5);
      v[1] = (ay*0.5 + by*0.5);
      v[2] = (az*0.5 + bz*0.5);
      v[3] = (aw*0.5 + bw*0.5);
      return this;
    }

    ra = Math.sin((1 - l)*halfTheta) / sinHalfTheta;
    rb = Math.sin(l*halfTheta) / sinHalfTheta;

    v[0] = (ax*ra + bx*rb);
    v[1] = (ay*ra + by*rb);
    v[2] = (az*ra + bz*rb);
    v[3] = (aw*ra + bw*rb);

    return this;
  },


  /**
  * Normalize this vector and assign the resulting unit vector to this instance.
  *
  * @return {!vecJS.V4} This instance.
  */
  normalize: function () {
    var v = this.v,
        vx = v[0], vy = v[1], vz = v[2], vw = v[3],
        l = Math.sqrt(vx*vx + vy*vy + vz*vz);
    return l > 0 ? this.mulScalar(1/l) : this.set([0, 0, 0, 0]);
  },

  toString: function () {
    return 'V4[' + this.x + ', ' + this.y + ', ' + this.z + ', ' + this.w + ']';
  }
};
