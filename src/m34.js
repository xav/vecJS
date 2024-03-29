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
* <div>
* This represents an affine 4x4 matrix, stored as a 3x4 matrix with the last
* row implied as [0, 0, 0, 1].  This is to avoid generally unneeded work,
* skipping part of the homogeneous coordinates calculations and the
* homogeneous divide.
* </div>
* <div>
* The matrix looks like:
* <table>
*   <tr><td>[0]</td><td>[1]</td><td>[ 2]</td><td>[ 3]</td></tr>
*   <tr><td>[4]</td><td>[5]</td><td>[ 6]</td><td>[ 7]</td></tr>
*   <tr><td>[8]</td><td>[9]</td><td>[10]</td><td>[11]</td></tr>
*   <tr><td> 0 </td><td> 0 </td><td>  0 </td><td>  1 </td></tr>
* </table>
* </div>
*
* @class An affine 4x4 matrix stored as a 3x4 matrix
*
* @param {Array.<Number>=} m Array containing values to initialize with.
*
* @property {GLMatrixArray} m the matrix values.
*
* @constructor
*/
vecJS.M34 = function M34(m) {
  /*@DEBUG*/
  if (m !== undefined && !dbg.isArray(m)) { throw 'v is not an array'; }
  if (m !== undefined && m.length !== 12) { throw 'm has an invalid size (' + (m.length) + ').'; }
  /*/@DEBUG*/
  if (this instanceof vecJS.M34) {
    var a = this.m = new GLMatrixArray(12);
    if (m) {
      a[0]  = m[0];  a[1]  = m[1];  a[2]  = m[2] ; a[3]  = m[3];
      a[4]  = m[4];  a[5]  = m[5];  a[6]  = m[6] ; a[7]  = m[7];
      a[8]  = m[8];  a[9]  = m[9];  a[10] = m[10]; a[11] = m[11];
    }
  } else {
    return new vecJS.M34(m);
  }
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
    * @param {!Array.<Number>} m The new values ({@link vecJS.M34#m}).
    *
    * @return {!vecJS.M34} This instance.
    */
    set: function (m) {
      /*@DEBUG*/
      if (!dbg.isArray(m)) { throw 'm is not an array'; }
      if (m.length !== 12) { throw 'm has an invalid size (' + (m.length) + ').'; }
      /*/@DEBUG*/
      var a = this.m;
      a[0]  = m[0];  a[1]  = m[1];  a[2]  = m[2] ; a[3]  = m[3];
      a[4]  = m[4];  a[5]  = m[5];  a[6]  = m[6] ; a[7]  = m[7];
      a[8]  = m[8];  a[9]  = m[9];  a[10] = m[10]; a[11] = m[11];
      return this;
    },
    /**
    * Copy this matrix instance to the specified one.
    *
    * @param {!Array.<Number>} m The target matrix ({@link vecJS.M34#m}).
    *
    * @return {!vecJS.M34} This instance.
    */
    copyTo: function (m) {
      /*@DEBUG*/
      if (!dbg.isArray(m)) { throw 'm is not an array'; }
      if (m.length !== 12 && m.length !== 16) { throw 'm has an invalid size (' + (m.length) + ').'; }
      /*/@DEBUG*/
      var a = this.m;

      m[0]  = a[0];  m[1]  = a[1];  m[2]  = a[2] ; m[3]  = a[3];
      m[4]  = a[4];  m[5]  = a[5];  m[6]  = a[6] ; m[7]  = a[7];
      m[8]  = a[8];  m[9]  = a[9];  m[10] = a[10]; m[11] = a[11];

      return this;
    },
    /**
    * Create a clone of the matrix instance.
    *
    * @return {!vecJS.M34} A new matrix instance which is a copy of this one.
    */
    clone: function () {
      return new vecJS.M34(this.m);
    },

    /**
     * Set the matrix values from the specified quaternion.
     *
     * @param {!Array.<Number>} q The source quaternion (assumed to be unit) ({@link vecJS.Q#q}).
     *
    * @return {!vecJS.M34} This instance.
     */
    fromQ: function (q) {
      /*@DEBUG*/
      if (!dbg.isArray(q)) { throw 'q is not an array'; }
      if (q.length !== 4) { throw 'q has an invalid size (' + (q.length) + ').'; }
      /*/@DEBUG*/
      var x = q[0], y = q[1], z = q[2], w = q[3],
          x2 = x + x, y2 = y + y, z2 = z + z,
          xx = x*x2, xy = x*y2, xz = x*z2,
          yy = y*y2, yz = y*z2, zz = z*z2,
          wx = w*x2, wy = w*y2, wz = w*z2,
          m = this.m;

      m[0] = 1 - (yy + zz);
      m[1] = xy - wz;
      m[2] = xz + wy;

      m[4]  = xy + wz;
      m[5]  = 1 - (xx + zz);
      m[6]  = yz - wx;

      m[8]  = xz - wy;
      m[9]  = yz + wx;
      m[10] = 1 - (xx + yy);

      m[3] = m[7] = m[11] = 0;

      return this;
    },

    /**
    * Set this instance to an identity matrix.
    *
    * @return {!vecJS.M34} This instance.
    */
    identity: function () {
      var a = this.m;

      a[0]  = 1; a[1]  = 0; a[2]  = 0; a[3]  = 0;
      a[4]  = 0; a[5]  = 1; a[6]  = 0; a[7]  = 0;
      a[8]  = 0; a[9]  = 0; a[10] = 1; a[11] = 0;

      return this;
    },

    /**
    * Multiply this matrix with the specified one and assign the result to this instance.
    *
    * @param {!Array.<Number>} m The matrix to multiply with this instance ({@link vecJS.M34#m}).
    *
    * @return {!vecJS.M34} This instance.
    */
    mul: function (m) {
      /*@DEBUG*/
      if (!dbg.isArray(m)) { throw 'm is not an array'; }
      if (m.length !== 12) { throw 'm has an invalid size (' + (m.length) + ').'; }
      /*/@DEBUG*/
      var a = this.m,
          a00 = a[0], a01 = a[1], a02 = a[2],  a03 = a[3],
          a10 = a[4], a11 = a[5], a12 = a[6],  a13 = a[7],
          a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
          b00 = m[0], b01 = m[1], b02 = m[2],  b03 = m[3],
          b10 = m[4], b11 = m[5], b12 = m[6],  b13 = m[7],
          b20 = m[8], b21 = m[9], b22 = m[10], b23 = m[11];

      a[0]  = a00*b00 + a01*b10 + a02*b20;
      a[1]  = a00*b01 + a01*b11 + a02*b21;
      a[2]  = a00*b02 + a01*b12 + a02*b22;
      a[3]  = a00*b03 + a01*b13 + a02*b23 + a03;

      a[4]  = a10*b00 + a11*b10 + a12*b20;
      a[5]  = a10*b01 + a11*b11 + a12*b21;
      a[6]  = a10*b02 + a11*b12 + a12*b22;
      a[7]  = a10*b03 + a11*b13 + a12*b23 + a13;

      a[8]  = a20*b00 + a21*b10 + a22*b20;
      a[9]  = a20*b01 + a21*b11 + a22*b21;
      a[10] = a20*b02 + a21*b12 + a22*b22;
      a[11] = a20*b03 + a21*b13 + a22*b23 + a23;

      return this;
    },

    /**
    * Multiply a and b and assign the result to this instance.
    *
    * @param {!Array.<Number>} a The first term of the multiplication ({@link vecJS.M34#m}).
    * @param {!Array.<Number>} b The second term of the multiplication ({@link vecJS.M34#m}).
    *
    * @return {!vecJS.M34} This instance.
    */
    assignMul: function (a, b) {
      /*@DEBUG*/
      if (!dbg.isArray(a)) { throw 'a is not an array'; }
      if (!dbg.isArray(b)) { throw 'b is not an array'; }
      if (a.length !== 12) { throw 'a has an invalid size (' + (a.length) + ').'; }
      if (b.length !== 12) { throw 'b has an invalid size (' + (b.length) + ').'; }
      /*/@DEBUG*/
      var m = this.m,
          a00 = a[0], a01 = a[1], a02 = a[2],  a03 = a[3],
          a10 = a[4], a11 = a[5], a12 = a[6],  a13 = a[7],
          a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
          b00 = b[0], b01 = b[1], b02 = b[2],  b03 = b[3],
          b10 = b[4], b11 = b[5], b12 = b[6],  b13 = b[7],
          b20 = b[8], b21 = b[9], b22 = b[10], b23 = b[11];

      m[0]  = a00*b00 + a01*b10 + a02*b20;
      m[1]  = a00*b01 + a01*b11 + a02*b21;
      m[2]  = a00*b02 + a01*b12 + a02*b22;
      m[3]  = a00*b03 + a01*b13 + a02*b23 + a03;

      m[4]  = a10*b00 + a11*b10 + a12*b20;
      m[5]  = a10*b01 + a11*b11 + a12*b21;
      m[6]  = a10*b02 + a11*b12 + a12*b22;
      m[7]  = a10*b03 + a11*b13 + a12*b23 + a13;

      m[8]  = a20*b00 + a21*b10 + a22*b20;
      m[9]  = a20*b01 + a21*b11 + a22*b21;
      m[10] = a20*b02 + a21*b12 + a22*b22;
      m[11] = a20*b03 + a21*b13 + a22*b23 + a23;

      return this;
    },

    /**
    * Calculate the determinant of this matrix.
    *
    * @return {number} The matrix determinant.
    */
    det: function () {
    // based on http://www.euclideanspace.com/maths/algebra/matrix/functions/determinant/fourD/index.htm
      var m = this.m,
        m00 = m[0], m01 = m[1], m02 = m[2],
        m10 = m[4], m11 = m[5], m12 = m[6],
        m20 = m[8], m21 = m[9], m22 = m[10];

      return - m02 * m11 * m20
             + m01 * m12 * m20
             + m02 * m10 * m21
             - m00 * m12 * m21
             - m01 * m10 * m22
             + m00 * m11 * m22;
    },
    /**
    * Set this instance to its transpose matrix.
    *
    * @return {!vecJS.M34} This instance.
    */
    transpose: function () {
      var b,
          m = this.m;
      b = m[4]; m[4] = m[1]; m[1] = b;
      b = m[8]; m[8] = m[2]; m[2] = b;
      b = m[9]; m[9] = m[6]; m[6] = b;
      m[3] = m[7] = m[11] = 0;

      return this;
    },

    /**
    * Set this matrix to its inverse (it is assumed that the matrix is invertible).
    *
    * You can check that the matrix is invertible by verifying that
    * the determinant is not 0.
    *
    * @param {number=} d The matrix determinant if you already calculated it.
    * If not specified, it will be calculated.
    *
    * @return {!vecJS.M34} This instance.
    */
    invert: function (d) {
      /*@DEBUG*/
      if (d !== undefined && !dbg.isNumber(m)) { throw 'd is not a number'; }
      /*/@DEBUG*/
      var m = this.m,
          m00 = m[0], m01 = m[1], m02 = m[2],  m03 = m[3],
          m10 = m[4], m11 = m[5], m12 = m[6],  m13 = m[7],
          m20 = m[8], m21 = m[9], m22 = m[10], m23 = m[11];
      d = 1 / (d || (- m02*m11*m20 + m01*m12*m20 + m02*m10*m21 - m00*m12*m21 - m01*m10*m22 + m00*m11*m22));

      // based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
      m[0]  = d * (m11*m22 - m12*m21);
      m[1]  = d * (m02*m21 - m01*m22);
      m[2]  = d * (m01*m12 - m02*m11);
      m[3]  = d * (m03*m12*m21 - m02*m13*m21 - m03*m11*m22 + m01*m13*m22 + m02*m11*m23 - m01*m12*m23);

      m[4]  = d * (m12*m20 - m10*m22);
      m[5]  = d * (m00*m22 - m02*m20);
      m[6]  = d * (m02*m10 - m00*m12);
      m[7]  = d * (m02*m13*m20 - m03*m12*m20 + m03*m10*m22 - m00*m13*m22 - m02*m10*m23 + m00*m12*m23);
      
      m[8]  = d * (m10*m21 - m11*m20);
      m[9]  = d * (m01*m20 - m00*m21);
      m[10] = d * (m00*m11 - m01*m10);
      m[11] = d * (m03*m11*m20 - m01*m13*m20 - m03*m10*m21 + m00*m13*m21 + m01*m10*m23 - m00*m11*m23);

      return this;
    },

    /**
    * Translate the current transformation matrix by the specified values along the three axis.
    *
    * This is equivalent to multiplying this matrix with a pure translation matrix.
    *
    * @param {!Array.<Number>} v The x,y,z translation values ({@link vecJS.V3#v}).
    *
    * @return {!vecJS.M34} This instance.
    */
    translate: function (v) {
      /*@DEBUG*/
      if (!dbg.isArray(v)) { throw 'v is not an array'; }
      if (v.length !== 3) { throw 'v has an invalid size (' + (v.length) + ').'; }
      /*/@DEBUG*/
      var m = this.m,
          dx = v[0],
          dy = v[1],
          dz = v[2];
      m[3]  = m[0]*dx + m[1]*dy + m[2] *dz + m[3];
      m[7]  = m[4]*dx + m[5]*dy + m[6] *dz + m[7];
      m[11] = m[8]*dx + m[9]*dy + m[10]*dz + m[11];
      return this;
    },
    /**
    * Scale the current transformation matrix by the specified values along the three axis.
    *
    * This is equivalent to multiplying this matrix with a pure scaling matrix.
    *
    * @param {number} v The x,y,z scaling factors ({@link vecJS.V3#v}).
    *
    * @return {!vecJS.M34} This instance.
    */
    scale: function (v) {
      /*@DEBUG*/
      if (!dbg.isArray(v)) { throw 'v is not an array'; }
      if (v.length !== 3) { throw 'v has an invalid size (' + (v.length) + ').'; }
      /*/@DEBUG*/
      var m = this.m,
          sx = v[0],
          sy = v[1],
          sz = v[2];
      
      m[0]  *= sx;
      m[1]  *= sy;
      m[2]  *= sz;

      m[4]  *= sx;
      m[5]  *= sy;
      m[6]  *= sz;

      m[8]  *= sx;
      m[9]  *= sy;
      m[10] *= sz;

      return this;
    },
    /**
     * Rotate the current transformation matrix around an arbitrary axis.
     * If rotating around a primary axis (X,Y,Z) one of the specialized rotation
     * functions should be used instead for better performances.
     * 
     * @param {number} theta The rotation angle in radians.
     * @param {!Array.<Number>} v The axis to rotate around (assumed to be unit) ({@link vecJS.V3#v}).
     *
     * @return {!vecJS.M34} This instance.
     */
    rotate: function (theta, v) {
      /*@DEBUG*/
      if (!dbg.isNumber(theta)) { throw 'theta is not a number'; }
      if (!dbg.isArray(v)) { throw 'v is not an array'; }
      if (v.length !== 3) { throw 'v has an invalid size (' + (v.length) + ').'; }
      /*/@DEBUG*/
      var m = this.m,
          vx = v[0], vy = v[1], vz = v[2],
          s = Math.sin(theta), c = Math.cos(theta),
          t = 1 - c,
          a00 = m[0], a01 = m[1], a02 = m[2],
          a10 = m[4], a11 = m[5], a12 = m[6],
          a20 = m[8], a21 = m[9], a22 = m[10],
          b00 = vx*vx*t + c,    b01 = vy*vx*t + vz*s, b02 = vz*vx*t - vy*s,
          b10 = vx*vy*t - vz*s, b11 = vy*vy*t + c,    b12 = vz*vy*t + vx*s,
          b20 = vx*vz*t + vy*s, b21 = vy*vz*t - vx*s, b22 = vz*vz*t + c;

      m[0]  = a00*b00 + a10*b01 + a20*b02;
      m[1]  = a01*b00 + a11*b01 + a21*b02;
      m[2]  = a02*b00 + a12*b01 + a22*b02;

      m[4]  = a00*b10 + a10*b11 + a20*b12;
      m[5]  = a01*b10 + a11*b11 + a21*b12;
      m[6]  = a02*b10 + a12*b11 + a22*b12;

      m[8]  = a00*b20 + a10*b21 + a20*b22;
      m[9]  = a01*b20 + a11*b21 + a21*b22;
      m[10] = a02*b20 + a12*b21 + a22*b22;

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
      /*@DEBUG*/
      if (!dbg.isNumber(theta)) { throw 'theta is not a number'; }
      /*/@DEBUG*/
      var m = this.m,
          a01  = m[1], a02  = m[2],
          a11  = m[5], a12  = m[6],
          a21  = m[9], a22  = m[10],
          c = Math.cos(theta),
          s = Math.sin(theta);
      m[1]  = a01*c + a02*s;
      m[2]  = a02*c - a01*s;
      m[5]  = a11*c + a12*s;
      m[6]  = a12*c - a11*s;
      m[9]  = a21*c + a22*s;
      m[10] = a22*c - a21*s;
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
      /*@DEBUG*/
      if (!dbg.isNumber(theta)) { throw 'theta is not a number'; }
      /*/@DEBUG*/
      var m = this.m,
          a00  = m[0], a02  = m[2],
          a10  = m[4], a12  = m[6],
          a20  = m[8], a22  = m[10],
          c = Math.cos(theta),
          s = Math.sin(theta);
      m[0] = a00*c - a02*s;
      m[2] = a00*s + a02*c;
      m[4] = a10*c - a12*s;
      m[6] = a10*s + a12*c;
      m[8] = a20*c - a22*s;
      m[10] = a20*s + a22*c;
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
      /*@DEBUG*/
      if (!dbg.isNumber(theta)) { throw 'theta is not a number'; }
      /*/@DEBUG*/
      var m = this.m,
          a00  = m[0], a01  = m[1],
          a10  = m[4], a11  = m[5],
          a20  = m[8], a21  = m[9],
          c = Math.cos(theta),
          s = Math.sin(theta);

      m[0] = a00*c + a01*s;
      m[1] = a01*c - a00*s;
      m[4] = a10*c + a11*s;
      m[5] = a11*c - a10*s;
      m[8] = a20*c + a21*s;
      m[9] = a21*c - a20*s;
      return this;
    },

    /**
    * Set this matrix to a pure translation matrix.
    *
    * @param {!Array.<Number>} v The x,y,z translation values ({@link vecJS.V3#v}).
    * @param {Boolean} overwriteRotation Set to <c>true</c> to set the rotation part to an identity matrix
    *
    * @return {!vecJS.M34} This instance.
    */
    setTranslate: function (v, overwriteRotation) {
      /*@DEBUG*/
      if (!dbg.isArray(v)) { throw 'v is not an array'; }
      if (v.length !== 3) { throw 'v has an invalid size (' + (v.length) + ').'; }
      /*/@DEBUG*/
      var m = this.m;
      m[3]  = v[0];
      m[7]  = v[1];
      m[11] = v[2];

      if (overwriteRotation) {
        m[0] = m[5] = m[10] = 1;
        m[1] = m[2] = m[4] = m[6] = m[8] = m[9] = 0;
      }

      return this;
    },
    /**
    * Set this matrix to a pure scaling matrix.
    *
    * @param {!Array.<Number>} v The x,y,z scaling factors ({@link vecJS.V3#v}).
    *
    * @return {!vecJS.M34} This instance.
    */
    setScale: function (v) {
      /*@DEBUG*/
      if (!dbg.isArray(v)) { throw 'v is not an array'; }
      if (v.length !== 3) { throw 'v has an invalid size (' + (v.length) + ').'; }
      /*/@DEBUG*/
      return this.set([
        v[0], 0,    0,    0,
        0,    v[1], 0,    0,
        0,    0,    v[2], 0
      ]);
    },
    /**
     * Set this matrix to  rotation around an arbitrary axis.
     * If rotating around a primary axis (X,Y,Z) one of the specialized rotation
     * functions should be used instead for performance
     *
     * @param {number} theta The rotation angle in radians.
     * @param {!Array.<Number>} v The axis to rotate around (assumed to be unit) ({@link vecJS.V3#v}).
     *
     * @return {!vecJS.M34} This instance.
     */
    setRotate: function (theta, v) {
      /*@DEBUG*/
      if (!dbg.isNumber(theta)) { throw 'theta is not a number'; }
      if (!dbg.isArray(v)) { throw 'v is not an array'; }
      if (v.length !== 3) { throw 'v has an invalid size (' + (v.length) + ').'; }
      /*/@DEBUG*/
      // From http://en.wikipedia.org/wiki/Rotation_matrix#Rotation_matrix_from_axis_and_angle
      var m = this.m,
          vx = v[0], vy = v[1], vz = v[2],
          s = Math.sin(theta), c = Math.cos(theta),
          t = 1 - c;

      m[0]  = vx*vx*t + c;
      m[1]  = vy*vx*t + vz*s;
      m[2]  = vz*vx*t - vy*s;

      m[4]  = vx*vy*t - vz*s;
      m[5]  = vy*vy*t + c;
      m[6]  = vz*vy*t + vx*s;

      m[8]  = vx*vz*t + vy*s;
      m[9]  = vy*vz*t - vx*s;
      m[10] = vz*vz*t + c;

      m[3] = m[7] = m[11] = 0;

      return this;
    },
    /**
    * Set this matrix to a pure X-rotation matrix.
    *
    * @param {number} theta The rotation angle in radians.
    *
    * @return {!vecJS.M34} This instance.
    */
    setRotateX: function (theta) {
      /*@DEBUG*/
      if (!dbg.isNumber(theta)) { throw 'theta is not a number'; }
      /*/@DEBUG*/
      var c = Math.cos(theta),
          s = Math.sin(theta);
      return this.set([
        1, 0,  0, 0,
        0, c, -s, 0,
        0, s,  c, 0
      ]);
    },
    /**
    * Set this matrix to a pure Y-rotation matrix.
    *
    * @param {number} theta The rotation angle in radians.
    *
    * @return {!vecJS.M34} This instance.
    */
    setRotateY: function (theta) {
      /*@DEBUG*/
      if (!dbg.isNumber(theta)) { throw 'theta is not a number'; }
      /*/@DEBUG*/
      var c = Math.cos(theta),
          s = Math.sin(theta);
      return this.set([
         c, 0, s, 0,
         0, 1, 0, 0,
        -s, 0, c, 0
      ]);
    },
    /**
    * Set this matrix to a pure Z-rotation matrix.
    *
    * @param {number} theta The rotation angle in radians.
    *
    * @return {!vecJS.M34} This instance.
    */
    setRotateZ: function (theta) {
      /*@DEBUG*/
      if (!dbg.isNumber(theta)) { throw 'theta is not a number'; }
      /*/@DEBUG*/
      var c = Math.cos(theta),
          s = Math.sin(theta);
      return this.set([
        c, -s, 0, 0,
        s,  c, 0, 0,
        0,  0, 1, 0
      ]);
    },

    /**
     * Return a string representation of the current instance.
     */
    toString: function () {
      var m = this.m;
      return 'M34\n' +
        disp_f(m[0])  + '  ' +
        disp_f(m[1])  + '  ' +
        disp_f(m[2])  + '  ' +
        disp_f(m[3])  + '\n' +

        disp_f(m[4])  + '  ' +
        disp_f(m[5])  + '  ' +
        disp_f(m[6])  + '  ' +
        disp_f(m[7])  + '\n' +

        disp_f(m[8])  + '  ' +
        disp_f(m[9])  + '  ' +
        disp_f(m[10]) + '  ' +
        disp_f(m[11]);
    }
  };
})();
