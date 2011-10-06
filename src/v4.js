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
* @class A 4 dimensional vector to use with homogenous coordinates.
*
* @param {Array.<Number>=} v The [x,y,z,w] values to initialize with.
*
* @property {GLMatrixArray} v the vector [x,y,z,w] values.
*
* @constructor
*/
vecJS.V4 = function V4(v) {
  var a = this.v = new GLMatrixArray(4);
  if (v) {
    a[0] = v[0];
    a[1] = v[1];
    a[2] = v[2];
    a[3] = v[3];
  }
};

vecJS.V4.prototype = {
  constructor: vecJS.V4,

  /**
  * Set the current instance values.
  *
  * @param {!Array.<Number>} v The new values
  *
  * @return {!vecJS.V4} This instance.
  */
  set: function (v) {
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
  * @param {!Array.<Number>} v The target vector ({@link vecJS.V4#v}).
  *
  * @return {!vecJS.V4} This instance.
  */
  copyTo: function (v) {
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
  * Add the specified vector to this one and assign the result to this instance.
  *
  * @param {!Array.<Number>} v The vector to add to this instance ({@link vecJS.V4#v}).
  *
  * @return {!vecJS.V4} This instance.
  */
  add: function (v) {
    var a = this.v;
    a[0] += v[0];
    a[1] += v[1];
    a[2] += v[2];
    a[3] += v[3];
    return this;
  },
  /**
  * Subtract the specified vector from this one and assign the result to this instance.
  *
  * @param {!Array.<Number>} v The vector to subtract from this instance ({@link vecJS.V4#v}).
  *
  * @return {!vecJS.V4} This instance.
  */
  sub: function (v) {
    var a = this.v;
    a[0] -= v[0];
    a[1] -= v[1];
    a[2] -= v[2];
    a[3] -= v[3];
    return this;
  },

  /**
  * Add b to a and assign the result to this instance.
  *
  * @param {!Array.<Number>} a The first term of the addition ({@link vecJS.V4#v}).
  * @param {!Array.<Number>} b The second term of the addition ({@link vecJS.V4#v}).
  *
  * @return {!vecJS.V4} This instance.
  */
  assignAdd: function (a, b) {
    var v = this.v;
    v[0] = a[0] + b[0];
    v[1] = a[1] + b[1];
    v[2] = a[2] + b[2];
    v[3] = a[3] + b[3];
    return this;
  },
  /**
  * Subtract b from a and assign the result to this instance.
  *
  * @param {!Array.<Number>} a The first term of the subtraction ({@link vecJS.V4#v}).
  * @param {!Array.<Number>} b The second term of the subtraction ({@link vecJS.V4#v}).
  *
  * @return {!vecJS.V4} This instance.
  */
  assignSub: function (a, b) {
    var v = this.v;
    v[0] = a[0] - b[0];
    v[1] = a[1] - b[1];
    v[2] = a[2] - b[2];
    v[3] = a[3] - b[3];
    return this;
  },

  /**
  * Add the specified number to all the components of this instance.
  *
  * @param {number} s The number to add.
  *
  * @return {!vecJS.V4} This instance.
  */
  addScalar: function (s) {
    var v = this.v;
    v[0] += s;
    v[1] += s;
    v[2] += s;
    v[3] += s;
    return this;
  },
  /**
  * Subtract the specified number from all the components of this instance.
  *
  * @param {number} s The number to subtract.
  *
  * @return {!vecJS.V4} This instance.
  */
  subScalar: function (s) {
    var v = this.v;
    v[0] -= s;
    v[1] -= s;
    v[2] -= s;
    v[3] -= s;
    return this;
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
  * @param {!Array.<Number>} m The matrix to multiply ({@link vecJS.M34#m}).
  *
  * @return {!vecJS.V4} This instance.
  */
  mulM34: function (m) {
    var v = this.v,
        vx = v[0], vy = v[1], vz = v[2], vw = v[3];

    v[0] = vx*m[0] + vy*m[1] + vz*m[2]  + vw*m[3];
    v[1] = vx*m[4] + vy*m[5] + vz*m[6]  + vw*m[7];
    v[2] = vx*m[8] + vy*m[9] + vz*m[10] + vw*m[11];

    return this;
  },

  /**
  * Multiply the specified matrix with this vector and assign the result to this instance.
  *
  * @param {!Array.<Number>} m The matrix to multiply ({@link vecJS.M34#m}).
  *
  * @return {!vecJS.V4} This instance.
  */
  mulM44: function (m) {
    var v = this.v,
        vx = v[0], vy = v[1], vz = v[2], vw = v[3];

    v[0] = vx*m[0]  + vy*m[1]  + vz*m[2]  + vw*m[3];
    v[1] = vx*m[4]  + vy*m[5]  + vz*m[6]  + vw*m[7];
    v[2] = vx*m[8]  + vy*m[9]  + vz*m[10] + vw*m[11];
    v[3] = vx*m[12] + vy*m[13] + vz*m[14] + vw*m[15];

    return this;
  },

  /**
  * Calculate the dot product of this vector and the specified one.
  *
  * @param {!Array.<Number>} v The second term of the dot product ({@link vecJS.V4#v}).
  *
  * @return {number} The result of the dot product.
  */
  dot: function (v) {
    var a = this.v;
    return a[0]*v[0] + a[1]*v[1] + a[2]*v[2] + a[3]*v[3];
  },

  /**
  * Normalize this vector and assign the resulting unit vector to this instance.
  *
  * @return {!vecJS.V4} This instance.
  */
  normalize: function () {
    var v = this.v,
        vx = v[0], vy = v[1], vz = v[2], vw = v[3],
        l = vx*vx + vy*vy + vz*vz + vw*vw;
    if (l == 1) {
      return this;
    }
    return l ? this.mulScalar(1 / Math.sqrt(l)) : this.set([0, 0, 0]);
  },

  /**
  * Calculate the length of this vector.
  *
  * @return {number} The length of this vector.
  */
  length: function () {
    var v = this.v,
        vx = v[0], vy = v[1], vz = v[2], vw = v[3];
    return Math.sqrt(vx*vx + vy*vy + vz*vz + vw*vw);
  },
  /**
  * Calculate the squared length of this vector.
  *
  * @return {number} The squared length of this vector.
  */
  squaredLength: function () {
    var v = this.v,
        vx = v[0], vy = v[1], vz = v[2], vw = v[3];
    return vx*vx + vy*vy + vz*vz + vw*vw;
  },

  /**
   * Check if this instance is a unit-length vector.
   *
   * Should be a bit faster than checking if length == 1, since there is no square root.
   * vecJC Precision (@PRECISION) is used, so the vector length does not have to be exactly 1,
   * but something close enough.
   *
   * @return {boolean} True if this instance is a unit-length vector; otherwise, false.
   */
  isUnit: function () {
    var v = this.v,
        vx = v[0], vy = v[1], vz = v[2], vw = v[3];
    return Math.abs(1 - (vx*vx + vy*vy + vz*vz + vw*vw)) < @PRECISION;
  },

  /**
   * Return a string representation of the current instance.
   */
  toString: function () {
    var v = this.v;
    return 'V4[' + disp_f(v[0]) + ', ' + disp_f(v[1]) + ', ' + disp_f(v[2]) + ', ' + disp_f(v[3]) + ']';
  }
};
