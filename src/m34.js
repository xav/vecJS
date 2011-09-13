/*
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
* <div>
* This represents an affine 4x4 matrix, stored as a 3x4 matrix with the last
* row implied as [0, 0, 0, 1].  This is to avoid generally unneeded work,
* skipping part of the homogeneous coordinates calculations and the
* homogeneous divide.
* </div>
* <div>
* The matrix looks like:
* <table>
*   <tr><td>n11</td><td>n12</td><td>n13</td><td>n14</td></tr>
*   <tr><td>n21</td><td>n22</td><td>n23</td><td>n24</td></tr>
*   <tr><td>n31</td><td>n32</td><td>n33</td><td>n34</td></tr>
*   <tr><td>0  </td><td>0  </td><td>0  </td><td>1  </td></tr>
* </table>
* </div>
*
* @class An affine 4x4 matrix stored as a 3x4 matrix
*
* @param {number=} n11 The value for r1c1
* @param {number=} n12 The value for r1c2
* @param {number=} n13 The value for r1c3
* @param {number=} n14 The value for r1c4
* @param {number=} n21 The value for r2c1
* @param {number=} n22 The value for r2c2
* @param {number=} n23 The value for r2c3
* @param {number=} n24 The value for r2c4
* @param {number=} n31 The value for r3c1
* @param {number=} n32 The value for r3c2
* @param {number=} n33 The value for r3c3
* @param {number=} n34 The value for r3c4
*
* @property {number} n11 The value for r1c1
* @property {number} n12 The value for r1c2
* @property {number} n13 The value for r1c3
* @property {number} n14 The value for r1c4
* @property {number} n21 The value for r2c1
* @property {number} n22 The value for r2c2
* @property {number} n23 The value for r2c3
* @property {number} n24 The value for r2c4
* @property {number} n31 The value for r3c1
* @property {number} n32 The value for r3c2
* @property {number} n33 The value for r3c3
* @property {number} n34 The value for r3c4
*
* @constructor
*/
/**
* <div>
* This represents an affine 4x4 matrix, stored as a 3x4 matrix with the last
* row implied as [0, 0, 0, 1].  This is to avoid generally unneeded work,
* skipping part of the homogeneous coordinates calculations and the
* homogeneous divide.
* </div>
* <div>
* The matrix looks like:
* <table>
*   <tr><td>n11</td><td>n12</td><td>n13</td><td>n14</td></tr>
*   <tr><td>n21</td><td>n22</td><td>n23</td><td>n24</td></tr>
*   <tr><td>n31</td><td>n32</td><td>n33</td><td>n34</td></tr>
*   <tr><td>0  </td><td>0  </td><td>0  </td><td>1  </td></tr>
* </table>
* </div>
*
* @class An affine 4x4 matrix stored as a 3x4 matrix
*
* @param {number=} n11 The value for r1c1
* @param {number=} n12 The value for r1c2
* @param {number=} n13 The value for r1c3
* @param {number=} n14 The value for r1c4
* @param {number=} n21 The value for r2c1
* @param {number=} n22 The value for r2c2
* @param {number=} n23 The value for r2c3
* @param {number=} n24 The value for r2c4
* @param {number=} n31 The value for r3c1
* @param {number=} n32 The value for r3c2
* @param {number=} n33 The value for r3c3
* @param {number=} n34 The value for r3c4
*
* @property {number} n11 The value for r1c1
* @property {number} n12 The value for r1c2
* @property {number} n13 The value for r1c3
* @property {number} n14 The value for r1c4
* @property {number} n21 The value for r2c1
* @property {number} n22 The value for r2c2
* @property {number} n23 The value for r2c3
* @property {number} n24 The value for r2c4
* @property {number} n31 The value for r3c1
* @property {number} n32 The value for r3c2
* @property {number} n33 The value for r3c3
* @property {number} n34 The value for r3c4
*
* @constructor
*/
vecJS.M34 = function M34(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34) {
  this.n11 = (n11 === undefined) ? 1 : n11;
  this.n12 = n12 || 0;
  this.n13 = n13 || 0;
  this.n14 = n14 || 0;

  this.n21 = n21 || 0;
  this.n22 = n22 === undefined ? 1 : n22;
  this.n23 = n23 || 0;
  this.n24 = n24 || 0;

  this.n31 = n31 || 0;
  this.n32 = n32 || 0;
  this.n33 = n33 === undefined ? 1 : n33;
  this.n34 = n34 || 0;

  this.flat = null;
};

(function () {
  var _vx = new vecJS.V3(),
      _vy = new vecJS.V3(),
      _vz = new vecJS.V3();

  vecJS.M34.prototype = {
    constructor: vecJS.M34,
    
    /**
    * Set the current instance values.
    *
    * @param {number} n11 The value for r1c1
    * @param {number} n12 The value for r1c2
    * @param {number} n13 The value for r1c3
    * @param {number} n14 The value for r1c4
    * @param {number} n21 The value for r2c1
    * @param {number} n22 The value for r2c2
    * @param {number} n23 The value for r2c3
    * @param {number} n24 The value for r2c4
    * @param {number} n31 The value for r3c1
    * @param {number} n32 The value for r3c2
    * @param {number} n33 The value for r3c3
    * @param {number} n34 The value for r3c4
    *
    * @return {!vecJS.M34} This instance.
    */
    set: function (n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34) {
      this.n11 = n11; this.n12 = n12; this.n13 = n13; this.n14 = n14;
      this.n21 = n21; this.n22 = n22; this.n23 = n23; this.n24 = n24;
      this.n31 = n31; this.n32 = n32; this.n33 = n33; this.n34 = n34;
      return this;
    },
    /**
    * Copy the specified matrix to this instance.
    *
    * @param {!vecJS.M34} m The source matrix.
    *
    * @return {!vecJS.M34} This instance.
    */
    copy: function (m) {
      this.n11 = m.n11; this.n12 = m.n12; this.n13 = m.n13; this.n14 = m.n14;
      this.n21 = m.n21; this.n22 = m.n22; this.n23 = m.n23; this.n24 = m.n24;
      this.n31 = m.n31; this.n32 = m.n32; this.n33 = m.n33; this.n34 = m.n34;
      return this;
    },
    /**
    * Copy this matrix instance to the specified one.
    *
    * @param {!vecJS.M34} m The target matrix.
    *
    * @return {!vecJS.M34} This instance.
    */
    copyTo: function (m) {
      m.n11 = this.n11; m.n12 = this.n12; m.n13 = this.n13; m.n14 = this.n14;
      m.n21 = this.n21; m.n22 = this.n22; m.n23 = this.n23; m.n24 = this.n24;
      m.n31 = this.n31; m.n23 = this.n32; m.n33 = this.n33; m.n34 = this.n34;
      return this;
    },
    /**
    * Create a clone of the matrix instance.
    *
    * @return {!vecJS.M34} A new matrix instance which is a copy of this one.
    */
    clone: function () {
      return new vecJS.M34(
        this.n11, this.n12, this.n13, this.n14,
        this.n21, this.n22, this.n23, this.n24,
        this.n31, this.n32, this.n33, this.n34
      );
    },
    flatten: function() {
      var flat = this.flat = this.flat || new Array(16);
      flat[ 0] = this.n11;
      flat[ 1] = this.n21;
      flat[ 2] = this.n31;
      flat[ 3] = 0;

      flat[ 4] = this.n12;
      flat[ 5] = this.n22;
      flat[ 6] = this.n32;
      flat[ 7] = 0;

      flat[ 8] = this.n13;
      flat[ 9] = this.n23;
      flat[10] = this.n33;
      flat[11] = 0;

      flat[12] = this.n14;
      flat[13] = this.n24;
      flat[14] = this.n34;
      flat[15] = 1;

      return flat;
    },
    flattenTo: function(flat) {
      flat[ 0] = this.n11;
      flat[ 1] = this.n21;
      flat[ 2] = this.n31;
      flat[ 3] = 0;

      flat[ 4] = this.n12;
      flat[ 5] = this.n22;
      flat[ 6] = this.n32;
      flat[ 7] = 0;

      flat[ 8] = this.n13;
      flat[ 9] = this.n23;
      flat[10] = this.n33;
      flat[11] = 0;

      flat[12] = this.n14;
      flat[13] = this.n24;
      flat[14] = this.n34;
      flat[15] = 1;

      return this;
    },

    /**
    * Set this instance to an identity matrix.
    *
    * @return {!vecJS.M34} This instance.
    */
    identity: function () {
      this.n11 = 1; this.n12 = 0; this.n13 = 0; this.n14 = 0;
      this.n21 = 0; this.n22 = 1; this.n23 = 0; this.n24 = 0;
      this.n31 = 0; this.n32 = 0; this.n33 = 1; this.n34 = 0;
      return this;
    },

    /**
    * Multiply this matrix with the specified one and assign the result to this instance.
    *
    * @param {!vecJS.M34} m The matrix to multiply with this instance.
    *
    * @return {!vecJS.M34} This instance.
    */
    multiply: function (m) {
      var n11  = this.n11, n12  = this.n12, n13  = this.n13, n14  = this.n14,
          n21  = this.n21, n22  = this.n22, n23  = this.n23, n24  = this.n24,
          n31  = this.n31, n32  = this.n32, n33  = this.n33, n34  = this.n34,
          mn11 = m.n11,    mn12 = m.n12,    mn13 = m.n13,    mn14 = m.n14,
          mn21 = m.n21,    mn22 = m.n22,    mn23 = m.n23,    mn24 = m.n24,
          mn31 = m.n31,    mn32 = m.n32,    mn33 = m.n33,    mn34 = m.n34;

      this.n11 = n11 * mn11 + n12 * mn21 + n13 * mn31;
      this.n12 = n11 * mn12 + n12 * mn22 + n13 * mn32;
      this.n13 = n11 * mn13 + n12 * mn23 + n13 * mn33;
      this.n14 = n11 * mn14 + n12 * mn24 + n13 * mn34 + n14;

      this.n21 = n21 * mn11 + n22 * mn21 + n23 * mn31;
      this.n22 = n21 * mn12 + n22 * mn22 + n23 * mn32;
      this.n23 = n21 * mn13 + n22 * mn23 + n23 * mn33;
      this.n24 = n21 * mn14 + n22 * mn24 + n23 * mn34 + n24;

      this.n31 = n31 * mn11 + n32 * mn21 + n33 * mn31;
      this.n32 = n31 * mn12 + n32 * mn22 + n33 * mn32;
      this.n33 = n31 * mn13 + n32 * mn23 + n33 * mn33;
      this.n34 = n31 * mn14 + n32 * mn24 + n33 * mn34 + n34;

      return this;
    },

    /**
    * Multiply a and b and assign the result to this instance.
    *
    * @param {!vecJS.M34} a The first term of the multiplication.
    * @param {!vecJS.M34} b The second term of the multiplication.
    *
    * @return {!vecJS.M34} This instance.
    */
    assignMultiply: function (a, b) {
      var a11 = a.n11, a12 = a.n12, a13 = a.n13, a14 = a.n14,
          a21 = a.n21, a22 = a.n22, a23 = a.n23, a24 = a.n24,
          a31 = a.n31, a32 = a.n32, a33 = a.n33, a34 = a.n34,
          b11 = b.n11, b12 = b.n12, b13 = b.n13, b14 = b.n14,
          b21 = b.n21, b22 = b.n22, b23 = b.n23, b24 = b.n24,
          b31 = b.n31, b32 = b.n32, b33 = b.n33, b34 = b.n34;

      this.n11 = a11 * b11 + a12 * b21 + a13 * b31;
      this.n12 = a11 * b12 + a12 * b22 + a13 * b32;
      this.n13 = a11 * b13 + a12 * b23 + a13 * b33;
      this.n14 = a11 * b14 + a12 * b24 + a13 * b34 + a14;

      this.n21 = a21 * b11 + a22 * b21 + a23 * b31;
      this.n22 = a21 * b12 + a22 * b22 + a23 * b32;
      this.n23 = a21 * b13 + a22 * b23 + a23 * b33;
      this.n24 = a21 * b14 + a22 * b24 + a23 * b34 + a24;

      this.n31 = a31 * b11 + a32 * b21 + a33 * b31;
      this.n32 = a31 * b12 + a32 * b22 + a33 * b32;
      this.n33 = a31 * b13 + a32 * b23 + a33 * b33;
      this.n34 = a31 * b14 + a32 * b24 + a33 * b34 + a34;

      return this;
    },

    /**
    * Calculate the determinant of this matrix.
    *
    * @return {number} The matrix determinant.
    */
    det: function () {
    // based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
      return (
        -this.n13 * this.n22 * this.n31
        + this.n12 * this.n23 * this.n31
        + this.n13 * this.n21 * this.n32
        - this.n11 * this.n23 * this.n32
        - this.n12 * this.n21 * this.n33
        + this.n11 * this.n22 * this.n33
      );
    },
    /**
    * Set this instance to its transpose matrix.
    *
    * @return {!vecJS.M34} This instance.
    */
    transpose: function () {
      var b;
      b = this.n21; this.n21 = this.n12; this.n12 = b;
      b = this.n31; this.n31 = this.n13; this.n13 = b;
      b = this.n32; this.n32 = this.n23; this.n23 = b;
      this.n14 = 0;
      this.n24 = 0;
      this.n34 = 0;

      return this;
    },

    /**
    * Set this matrix to its inverse
    *
    * @return {!vecJS.M34} This instance.
    */
    invert: function () {
      var a11 = this.n11, a12 = this.n12, a13 = this.n13, a14 = this.n14,
          a21 = this.n21, a22 = this.n22, a23 = this.n23, a24 = this.n24,
          a31 = this.n31, a32 = this.n32, a33 = this.n33, a34 = this.n34,
          b00 = a11 * a22 - a12 * a21,
          b01 = a11 * a23 - a13 * a21,
          b02 = a11 * a24 - a14 * a21,
          b03 = a12 * a23 - a13 * a22,
          b04 = a12 * a24 - a14 * a22,
          b05 = a13 * a24 - a14 * a23,
          invDet = 1 / (b00 * a33 - b01 * a32 + b03 * a31);

        this.n11 = ( a22 * b01 - a23 * a32) * invDet;
        this.n12 = (-a12 * b01 + a13 * a32) * invDet;
        this.n13 = b03 * invDet;
        this.n14 = (-a32 * b05 + a33 * b04 - a34 * b03) * invDet;

        this.n21 = (-a21 * b01 + a23 * a31) * invDet;
        this.n22 = ( a11 * b01 - a13 * a31) * invDet;
        this.n23 = (-b01) * invDet;
        this.n24 = ( a31 * b05 - a33 * b02 + a34 * b01) * invDet;

        this.n31 = ( a21 * a32 - a22 * a31) * invDet;
        this.n32 = (-a11 * a32 + a12 * a31) * invDet;
        this.n33 = b00 * invDet;
        this.n34 = (-a31 * b04 + a32 * b02 - a34 * b00) * invDet;

        return this;
    },

    /**
    * Translate the current transformation matrix by the specified values along the three axis.
    *
    * This is equivalent to multiplying this matrix with a pure translation matrix.
    *
    * @param {number} dx The x translation.
    * @param {number} dy The y translation.
    * @param {number} dz The z translation.
    *
    * @return {!vecJS.M34} This instance.
    */
    translate: function (dx, dy, dz) {
      this.n14 = this.n11 * dx + this.n12 * dy + this.n13 * dz + this.n14;
      this.n24 = this.n21 * dx + this.n22 * dy + this.n23 * dz + this.n24;
      this.n34 = this.n31 * dx + this.n32 * dy + this.n33 * dz + this.n34;
      return this;
    },
    /**
    * Scale the current transformation matrix by the specified values along the three axis.
    *
    * This is equivalent to multiplying this matrix with a pure scaling matrix.
    *
    * @param {number} sx The x scaling factor.
    * @param {number} sy The y scaling factor.
    * @param {number} sz The z scaling factor.
    *
    * @return {!vecJS.M34} This instance.
    */
    scale: function (sx, sy, sz) {
      this.n11 *= sx;
      this.n12 *= sy;
      this.n13 *= sz;

      this.n21 *= sx;
      this.n22 *= sy;
      this.n23 *= sz;

      this.n31 *= sx;
      this.n32 *= sy;
      this.n33 *= sz;

      return this;
    },
    /**
    * Rotate the current transformation matrix around the X axis.
    *
    * This is equivalent to multiplying this matrix with a pure X-rotation matrix.
    *
    * @param {number} theta The rotation angle in radians.
    *
    * @return {!vecJS.M34} This instance.
    */
    rotateX: function (theta) {
      var n12  = this.n12, n13  = this.n13,
          n22  = this.n22, n23  = this.n23,
          n32  = this.n32, n33  = this.n33,
          c = cos(theta),
          s = sin(theta);
      this.n12 = n12 * c + n13 * s;
      this.n13 = n13 * c - n12 * s;
      this.n22 = n22 * c + n23 * s;
      this.n23 = n23 * c - n22 * s;
      this.n32 = n32 * c + n33 * s;
      this.n33 = n33 * c - n32 * s;
      return this;
    },
    /**
    * Rotate the current transformation matrix around the Y axis.
    *
    * This is equivalent to multiplying this matrix with a pure Y-rotation matrix.
    *
    * @param {number} theta The rotation angle in radians.
    *
    * @return {!vecJS.M34} This instance.
    */
    rotateY: function (theta) {
      var n11  = this.n11, n13  = this.n13,
          n21  = this.n21, n23  = this.n23,
          n31  = this.n31, n33  = this.n33,
          c = cos(theta),
          s = sin(theta);
      this.n11 = n11 * c - n13 * s;
      this.n13 = n11 * s + n13 * c;
      this.n21 = n21 * c - n23 * s;
      this.n23 = n21 * s + n23 * c;
      this.n31 = n31 * c - n33 * s;
      this.n33 = n31 * s + n33 * c;
      return this;
    },
    /**
    * Rotate the current transformation matrix around the Z axis.
    *
    * This is equivalent to multiplying this matrix with a pure Z-rotation matrix.
    *
    * @param {number} theta The rotation angle in radians.
    *
    * @return {!vecJS.M34} This instance.
    */
    rotateZ: function (theta) {
      var n11  = this.n11, n12  = this.n12,
          n21  = this.n21, n22  = this.n22,
          n31  = this.n31, n32  = this.n32,
          c = cos(theta),
          s = sin(theta);

      this.n11 = n11 * c + n12 * s;
      this.n12 = n12 * c - n11 * s;
      this.n21 = n21 * c + n22 * s;
      this.n22 = n22 * c - n21 * s;
      this.n31 = n31 * c + n32 * s;
      this.n32 = n32 * c - n31 * s;
      return this;
    },

    /**
    * Set this matrix to a pure translation matrix.
    *
    * @param {number} dx The X translation.
    * @param {number} dy The Y translation.
    * @param {number} dz The X translation.
    *
    * @return {!vecJS.M34} This instance.
    */
    setTranslate: function (dx, dy, dz) {
      return this.set(
        1, 0, 0, dx,
        0, 1, 0, dy,
        0, 0, 1, dz
      );
    },
    /**
    * Set this matrix to a pure scaling matrix.
    *
    * @param {number} sx The x scaling factor.
    * @param {number} sy The y scaling factor.
    * @param {number} sz The z scaling factor.
    *
    * @return {!vecJS.M34} This instance.
    */
    setScale: function (sx, sy, sz) {
      return this.set(
        sx, 0,  0, 0,
        0, sy,  0, 0,
        0,  0, sz, 0
      );
    },
    /**
    * Set this matrix to a pure X-rotation matrix.
    *
    * @param {number} theta The rotation angle in radians.
    *
    * @return {!vecJS.M34} This instance.
    */
    setRotateX: function (theta) {
      var c = cos(theta),
          s = sin(theta);
      return this.set(
        1, 0,  0, 0,
        0, c, -s, 0,
        0, s,  c, 0
      );
    },
    /**
    * Set this matrix to a pure Y-rotation matrix.
    *
    * @param {number} theta The rotation angle in radians.
    *
    * @return {!vecJS.M34} This instance.
    */
    setRotateY: function (theta) {
      var c = cos(theta),
          s = sin(theta);
      return this.set(
         c, 0, s, 0,
         0, 1, 0, 0,
        -s, 0, c, 0
      );
    },
    /**
    * Set this matrix to a pure Z-rotation matrix.
    *
    * @param {number} theta The rotation angle in radians.
    *
    * @return {!vecJS.M34} This instance.
    */
    setRotateZ: function (theta) {
      var c = cos(theta),
          s = sin(theta);
      return this.set(
        c, -s, 0, 0,
        s,  c, 0, 0,
        0,  0, 1, 0
      );
    },

    /**
    * Create a look-at rotation matrix with the given eye position, focal point, and up axis and assign it to this instance.
    *
    * @param {!vecJS.V3} eye Position of the viewer
    * @param {!vecJS.V3} center Point the viewer is looking at
    * @param {!vecJS.V3} up Pointing "up"
    *
    * @return {!vecJS.M34} This instance.
    */
    lookAt: function (eye, center, up) {
      if (eye.x === center.x && eye.y === center.y && eye.z === center.z) {
          return this.identity();
      }
      _vz.copy(eye).sub(center).normalize();
      _vx.copy(up).cross(_vz).normalize();
      _vy.copy(_vz).cross(_vx).normalize();
      this.n11 = _vx.x; this.n12 = _vx.y; this.n13 = _vx.z; this.n14 = -_vx.dot(eye);
      this.n21 = _vy.x; this.n22 = _vy.y; this.n23 = _vy.z; this.n24 = -_vy.dot(eye);
      this.n31 = _vz.x; this.n32 = _vz.y; this.n33 = _vz.z; this.n34 = -_vz.dot(eye);
      return this;
    },

    toString: function () {
      return 'M34\n' +
        '[' + this.n11 + ', ' + this.n12 + ', ' + this.n13 + ', ' + this.n14 + ']\n' +
        '[' + this.n21 + ', ' + this.n22 + ', ' + this.n23 + ', ' + this.n24 + ']\n' +
        '[' + this.n31 + ', ' + this.n32 + ', ' + this.n33 + ', ' + this.n34 + ']\n';
    }
  };
})();
