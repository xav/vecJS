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
  cpy: function (v) {
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
  cpyto: function (v) {
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
  cln: function () {
    return new vecJS.V4(this.v);
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
  * Normalize this vector and assign the resulting unit vector to this instance.
  *
  * @return {!vecJS.V4} This instance.
  */
  normalize: function () {
    var l = sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    return l > 0 ? this.divideScalar(l) : this.set(0, 0, 0);
  },

  toString: function () {
    return 'V4[' + this.x + ', ' + this.y + ', ' + this.z + ', ' + this.w + ']';
  }
};
