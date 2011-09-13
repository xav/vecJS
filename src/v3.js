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
* @class A 3 dimensional vector.
*
* @param {number=} x The X component.
* @param {number=} y The Y component.
* @param {number=} z The Z component.
*
* @property {number} x The X component.
* @property {number} y The Y component.
* @property {number} z The Z component.
*
* @constructor
*/
vecJS.V3 = function V3(x, y, z) {
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
};

vecJS.V3.prototype = {
  constructor: vecJS.V3,

  /**
  * Set the current instance values.
  *
  * @param {number} x The X component.
  * @param {number} y The Y component.
  * @param {number} z The Z component.
  *
  * @return {!vecJS.V3} This instance.
  */
  set: function (x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  },
  /**
  * Copy the specified vector to this instance.
  *
  * @param {!vecJS.V3} v The source vector.
  *
  * @return {!vecJS.V3} This instance.
  */
  copy: function (v) {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
    return this;
  },
  /**
  * Copy this vector instance to the specified one.
  *
  * @param {!vecJS.V3} v The target vector.
  *
  * @return {!vecJS.V3} This instance.
  */
  copyTo: function (v) {
    v.x = this.x;
    v.y = this.y;
    v.z = this.z;
    return this;
  },
  /**
  * Create a clone of the vector instance.
  *
  * @return {!vecJS.V3} A new vector instance wich is a copy of this one.
  */
  clone: function () {
    return new vecJS.V3(this.x, this.y, this.z);
  },

  /**
  * Add the specified vector to this one and assign the result to this instance.
  *
  * @param {!vecJS.V3} v The vector to add to this instance.
  *
  * @return {!vecJS.V3} This instance.
  */
  add: function (v) {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    return this;
  },
  /**
  * Subtract the specified vector from this one and assign the result to this instance.
  *
  * @param {!vecJS.V3} v The vector to subtract from this instance.
  *
  * @return {!vecJS.V3} This instance.
  */
  sub: function (v) {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
    return this;
  },

  /**
  * Add b to a and assign the result to this instance.
  *
  * @param {!vecJS.V3} a The first term of the addition.
  * @param {!vecJS.V3} b The second term of the addition.
  *
  * @return {!vecJS.V3} This instance.
  */
  assignAdd: function (a, b) {
    this.x = a.x + b.x;
    this.y = a.y + b.y;
    this.z = a.z + b.z;
    return this;
  },
  /**
  * Subtract b from a and assign the result to this instance.
  *
  * @param {!vecJS.V3} a The first term of the subtraction.
  * @param {!vecJS.V3} b The second term of the subtraction.
  *
  * @return {!vecJS.V3} This instance.
  */
  assignSub: function (a, b) {
    this.x = a.x - b.x;
    this.y = a.y - b.y;
    this.z = a.z - b.z;
    return this;
  },

  /**
  * Add the specified number to all the components of this instance.
  *
  * @param {number} s The number to add.
  *
  * @return {!vecJS.V3} This instance.
  */
  addScalar: function (s) {
    this.x += s;
    this.y += s;
    this.z += s;
    return this;
  },
  /**
  * Subtract the specified number from all the components of this instance.
  *
  * @param {number} s The number to subtract.
  *
  * @return {!vecJS.V3} This instance.
  */
  subScalar: function (s) {
    this.x -= s;
    this.y -= s;
    this.z -= s;
    return this;
  },
  /**
  * Multiply all the components of this instance by the specified number.
  *
  * @param {number} s The multiplier.
  *
  * @return {!vecJS.V3} This instance.
  */
  multiplyScalar: function (s) {
    this.x *= s;
    this.y *= s;
    this.z *= s;
    return this;
  },
  /**
  * Divide all the components of this instance by the specified number.
  *
  * @param {number} s The divider.
  *
  * @return {!vecJS.V3} This instance.
  */
  divideScalar: function (s) {
    this.x /= s;
    this.y /= s;
    this.z /= s;
    return this;
  },

  /**
  * Calculate the cross product of this vector and the specified one and assign the result to this instance.
  *
  * @param {!vecJS.V3} v The second term of the cross product.
  *
  * @return {!vecJS.V3} This instance.
  */
  cross: function (v) {
    var tx = this.x,
        ty = this.y,
        tz = this.z;

    this.x = ty * v.z - tz * v.y;
    this.y = tz * v.x - tx * v.z;
    this.z = tx * v.y - ty * v.x;

    return this;
  },

  /**
  * Calculate the cross product of the two specified vectors and assign the result to this instance.
  *
  * @param {!vecJS.V3} a The first term of the cross product.
  * @param {!vecJS.V3} b The second term of the cross product.
  *
  * @return {!vecJS.V3} This instance.
  */
  assignCross: function (a, b) {
    this.x = a.y * b.z - a.z * b.y;
    this.y = a.z * b.x - a.x * b.z;
    this.z = a.x * b.y - a.y * b.x;
    
    return this;
  },

  /**
   * Performs a linear interpolation between this vector and the specified one.
   *
   * @param {!vecJS.V3} v The vector to interpolate with this one.
   * @param {Number} l The interpolation amount between the two vectors.
   *
   * @return {!vecJS.V3} This instance.
   */
  lerp: function (v, l) {
    this.x += l * (v.x - this.x);
    this.y += l * (v.y - this.y);
    this.z += l * (v.z - this.z);

    return this;
  },
  /**
   * Performs a linear interpolation between a and b and assign the result to this instance.
   *
   * @param {!vecJS.V3} a The first vector.
   * @param {!vecJS.V3} b The second vector.
   * @param {number} l The interpolation amount between the two vectors.
   *
   * @return {!vecJS.V3} This instance.
   */
  assignLerp: function (a, b, l) {
    this.x += a.x + l * (b.x - a.x);
    this.y += a.y + l * (b.y - a.y);
    this.z += a.z + l * (b.z - a.z);

    return this;
  },

  /**
  * Calculate the dot product of this vector and the specified one.
  *
  * @param {!vecJS.V3} v The second term of the dot product.
  *
  * @return {number} The result of the dot product.
  */
  dot: function (v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  },

  /**
  * Multiply the specified matrix with this vector and assign the result to this instance.
  *
  * @param {!vecJS.M34} m The matrix to multiply.
  *
  * @return {!vecJS.V3} This instance.
  */
  multiplyM34: function (m) {
    var vx = this.x,
        vy = this.y,
        vz = this.z;
    this.x = m.n11 * vx + m.n12 * vy + m.n13 * vz + m.n14;
    this.y = m.n21 * vx + m.n22 * vy + m.n23 * vz + m.n24;
    this.z = m.n31 * vx + m.n32 * vy + m.n33 * vz + m.n34;
    return this;
  },
  /**
  * Multiply the specified matrix with this vector and assign the result to this instance.
  *
  * @param {!vecJS.M44} m The matrix to multiply.
  *
  * @return {!vecJS.V3} This instance.
  */
  multiplyM44: function (m) {
    var vx = this.x,
        vy = this.y,
        vz = this.z,
        d = 1 / (m.n41 * vx + m.n42 * vy + m.n43 * vz + m.n44);
    this.x = (m.n11 * vx + m.n12 * vy + m.n13 * vz + m.n14) * d;
    this.y = (m.n21 * vx + m.n22 * vy + m.n23 * vz + m.n24) * d;
    this.z = (m.n31 * vx + m.n32 * vy + m.n33 * vz + m.n34) * d;
    return this;
  },

  /**
  * Normalize this vector and assign the resulting unit vector to this instance.
  *
  * @return {!vecJS.V3} This instance.
  */
  normalize: function () {
    var l = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    return l > 0 ? this.divideScalar(l) : this.set(0, 0, 0);
  },

  /**
  * Calculate the length of this vector.
  *
  * @return {number} The length of this vector.
  */
  length: function () {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  },
  /**
  * Calculate the squared length of this vector.
  *
  * @return {number} The squared length of this vector.
  */
  squaredLength: function () {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  },

  /**
  * Calculate the distance between the tip of this vector and the tip of the specified one.
  *
  * @param {!vecJS.V3} v The other vector.
  *
  * @return {number} The distance between the tips of two vectors.
  */
  distance: function (v) {
    var dx = this.x - v.x,
        dy = this.y - v.y,
        dz = this.z - v.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  },
  /**
  * Calculate the squared distance between the tip of this vector and the tip of the specified one.
  *
  * @param {!vecJS.V3} v The other vector.
  *
  * @return {number} The squared distance between the tips of two vectors.
  */
  squaredDistance: function (v) {
    var dx = this.x - v.x,
        dy = this.y - v.y,
        dz = this.z - v.z;
    return dx * dx + dy * dy + dz * dz;
  },

  toString: function () {
    return 'V3[' + this.x + ', ' + this.y + ', ' + this.z + ']';
  }
};
