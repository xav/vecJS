/*
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
* @param {number=} x The X component.
* @param {number=} y The Y component.
* @param {number=} z The Z component.
* @param {number=} w The W component.
*
* @property {number} x The X component.
* @property {number} y The Y component.
* @property {number} z The Z component.
* @property {number} w The W component.
*
* @constructor
*/
vecJS.V4 = function V4(x, y, z, w) {
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
  this.w = w || 1;
};

vecJS.V4.prototype = {
  constructor: vecJS.V4,
  
  /**
  * Set the current instance values.
  *
  * @param {number} x The X component.
  * @param {number} y The Y component.
  * @param {number} z The Z component.
  * @param {number} w The W component.
  *
  * @return {!vecJS.V4} This instance.
  */
  set: function (x, y, z, w) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    return this;
  },
  copy: function (v) {
    /**
     * Copy the specified vector to this instance.
     *
     * @param {!(vecJS.V4|vecJS.V3)} v The source vector.
     *
     * @return {!vecJS.V4} This instance.
     */
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
    this.w = v.w === undefined ? 1 : v.w;
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
    v.x = this.x;
    v.y = this.y;
    v.z = this.z;
    v.w = this.w;
    return this;
  },
  /**
  * Create a clone of the vector instance.
  *
  * @return {!vecJS.V4} A new vector instance which is a copy of this one.
  */
  clone: function () {
    return new vecJS.V4(this.x, this.y, this.z, this.w);
  },

  /**
  * Add the specified vector to this one and assign the result to this instance.
  *
  * @param {!vecJS.V4} v The vector to add to this instance.
  *
  * @return {!vecJS.V4} This instance.
  */
  add: function (v) {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    this.w += v.w;
    return this;
  },
  /**
  * Subtract the specified vector from this one and assign the result to this instance.
  *
  * @param {!vecJS.V4} v The vector to subtract from this instance.
  *
  * @return {!vecJS.V4} This instance.
  */
  sub: function (v) {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
    this.w -= v.w;
    return this;
  },

  /**
  * Add b to a and assign the result to this instance.
  *
  * @param {!vecJS.V4} a The first term of the addition.
  * @param {!vecJS.V4} b The second term of the addition.
  *
  * @return {!vecJS.V4} This instance.
  */
  assignAdd: function (a, b) {
    this.x = a.x + b.x;
    this.y = a.y + b.y;
    this.z = a.z + b.z;
    this.w = a.w + b.w;
    return this;
  },
  /**
  * Subtract b from a and assign the result to this instance.
  *
  * @param {!vecJS.V4} a The first term of the subtraction.
  * @param {!vecJS.V4} b The second term of the subtraction.
  *
  * @return {!vecJS.V4} This instance.
  */
  assignSub: function (a, b) {
    this.x = a.x - b.x;
    this.y = a.y - b.y;
    this.z = a.z - b.z;
    this.w = a.w - b.w;
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
    this.x += s;
    this.y += s;
    this.z += s;
    this.w += s;
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
    this.x -= s;
    this.y -= s;
    this.z -= s;
    this.w -= s;
    return this;
  },
  /**
  * Multiply all the components of this instance by the specified number.
  *
  * @param {number} s The multiplier.
  *
  * @return {!vecJS.V4} This instance.
  */
  multiplyScalar: function (s) {
    this.x *= s;
    this.y *= s;
    this.z *= s;
    this.w *= s;
    return this;
  },
  /**
  * Divide all the components of this instance by the specified number.
  *
  * @param {number} s The divider.
  *
  * @return {!vecJS.V4} This instance.
  */
  divideScalar: function (s) {
    this.x /= s;
    this.y /= s;
    this.z /= s;
    this.w /= s;
    return this;
  },

  /**
  * Multiply the specified matrix with this vector and assign the result to this instance.
  *
  * @param {!vecJS.M34} m The matrix to multiply.
  *
  * @return {!vecJS.V4} This instance.
  */
  multiplyM34: function (m) {
    var vx = this.x,
        vy = this.y,
        vz = this.z,
        vw = this.w;

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
  multiplyM44: function (m) {
    var vx = this.x,
        vy = this.y,
        vz = this.z,
        vw = this.w;

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
    var l = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    return l > 0 ? this.divideScalar(l) : this.set(0, 0, 0);
  },

  toString: function () {
    return 'V4[' + this.x + ', ' + this.y + ', ' + this.z + ', ' + this.w + ']';
  }
};
