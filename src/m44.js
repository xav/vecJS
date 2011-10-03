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
* The matrix indexes are arranged like this:
* <table>
*   <tr><td> 0</td><td> 1</td><td> 2</td><td> 3</td></tr>
*   <tr><td> 4</td><td> 5</td><td> 6</td><td> 7</td></tr>
*   <tr><td> 8</td><td> 9</td><td>10</td><td>11</td></tr>
*   <tr><td>12</td><td>13</td><td>14</td><td>15</td></tr>
* </table>
*
* @class An affine 4x4 matrix.
*
* @param {Array.<Number>=} m Array containing values to initialize with ({@link vecJS.M44#m}).
*
* @property {GLMatrixArray} m the matrix values.
*
* @constructor
*/
vecJS.M44 = function M44(m) {
  var a = this.m = new GLMatrixArray(16);
  if (m) {
    a[0]  = m[0];  a[1]  = m[1];  a[2]  = m[2] ; a[3]  = m[3];
    a[4]  = m[4];  a[5]  = m[5];  a[6]  = m[6] ; a[7]  = m[7];
    a[8]  = m[8];  a[9]  = m[9];  a[10] = m[10]; a[11] = m[11];
    a[12] = m[12]; a[13] = m[13]; a[14] = m[14]; a[15] = m[15];
  }
};

(function () {
  var _vx = new vecJS.V3(),
      _vy = new vecJS.V3(),
      _vz = new vecJS.V3();

  vecJS.M44.prototype = {
    constructor: vecJS.M44,
    
    /**
    * Set the current instance values.
    *
    * @param {!Array.<Number>} m The new values ({@link vecJS.M44#m}).
    *
    * @return {!vecJS.M44} This instance.
    */
    set: function (m) {
      var a = this.m;
      a[0]  = m[0];  a[1]  = m[1];  a[2]  = m[2] ; a[3]  = m[3];
      a[4]  = m[4];  a[5]  = m[5];  a[6]  = m[6] ; a[7]  = m[7];
      a[8]  = m[8];  a[9]  = m[9];  a[10] = m[10]; a[11] = m[11];
      a[12] = m[12]; a[13] = m[13]; a[14] = m[14]; a[15] = m[15];
      return this;
    },
    /**
    * Copy this matrix instance to the specified one.
    *
    * @param {!Array.<Number>} m The target matrix ({@link vecJS.M44#m}).
    *
    * @return {!vecJS.M44} This instance.
    */
    copyTo: function (m) {
      var a = this.m;

      m[0]  = a[0];  m[1]  = a[1];  m[2]  = a[2] ; m[3]  = a[3];
      m[4]  = a[4];  m[5]  = a[5];  m[6]  = a[6] ; m[7]  = a[7];
      m[8]  = a[8];  m[9]  = a[9];  m[10] = a[10]; m[11] = a[11];
      m[12] = a[12]; m[13] = a[13]; m[14] = a[14]; m[15] = a[15];

      return this;
    },
    /**
    * Create a clone of the matrix instance.
    *
    * @return {!vecJS.M44} A new matrix instance which is a copy of this one.
    */
    clone: function () {
      return new vecJS.M44(this.m);
    },

    /**
     * Set the matrix values from the specified quaternion.
     *
     * @param {!Array.<Number>} q The source quaternion ({@link vecJS.Q#q}).
     *
    * @return {!vecJS.M44} This instance.
     */
    fromQ: function (q) {
      var x = q[0], y = q[1], z = q[2], w = q[3],
          x2 = x + x, y2 = y + y, z2 = z + z,
          xx = x*x2, xy = x*y2, xz = x*z2,
          yy = y*y2, yz = y*z2, zz = z*z2,
          wx = w*x2, wy = w*y2, wz = w*z2,
          m = this.m;

      m[0] = 1 - (yy + zz);
      m[1] = xy - wz;
      m[2] = xz + wy;
      m[3] = 0;

      m[4] = xy + wz;
      m[5] = 1 - (xx + zz);
      m[6] = yz - wx;
      m[7] = 0;

      m[8] = xz - wy;
      m[9] = yz + wx;
      m[10] = 1 - (xx + yy);
      m[11] = 0;

      m[12] = 0;
      m[13] = 0;
      m[14] = 0;
      m[15] = 1;

      return this;
    },

    /**
    * Set this instance to an identity matrix.
    *
    * @return {!vecJS.M44} This instance.
    */
    identity: function () {
      var a = this.m;

      a[0]  = 1; a[1]  = 0; a[2]  = 0; a[3]  = 0;
      a[4]  = 0; a[5]  = 1; a[6]  = 0; a[7]  = 0;
      a[8]  = 0; a[9]  = 0; a[10] = 1; a[11] = 0;
      a[12] = 0; a[13] = 0; a[14] = 0; a[15] = 1;

      return this;
    },

    /**
    * Multiply this matrix with the specified one and assign the result to this instance.
    *
    * @param {!Array.<Number>} m The matrix to multiply with this instance ({@link vecJS.M44#m}).
    *
    * @return {!vecJS.M44} This instance.
    */
    mul: function (m) {
      var a = this.m,
          a00 = a[0],  a01 = a[1],  a02 = a[2],  a03 = a[3],
          a10 = a[4],  a11 = a[5],  a12 = a[6],  a13 = a[7],
          a20 = a[8],  a21 = a[9],  a22 = a[10], a23 = a[11],
          a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],
          b00 = m[0],  b01 = m[1],  b02 = m[2],  b03 = m[3],
          b10 = m[4],  b11 = m[5],  b12 = m[6],  b13 = m[7],
          b20 = m[8],  b21 = m[9],  b22 = m[10], b23 = m[11],
          b30 = m[12], b31 = m[13], b32 = m[14], b33 = m[15];

      a[0]  = a00*b00 + a01*b10 + a02*b20 + a03*b30;
      a[1]  = a00*b01 + a01*b11 + a02*b21 + a03*b31;
      a[2]  = a00*b02 + a01*b12 + a02*b22 + a03*b32;
      a[3]  = a00*b03 + a01*b13 + a02*b23 + a03*b33;

      a[4]  = a10*b00 + a11*b10 + a12*b20 + a13*b30;
      a[5]  = a10*b01 + a11*b11 + a12*b21 + a13*b31;
      a[6]  = a10*b02 + a11*b12 + a12*b22 + a13*b32;
      a[7]  = a10*b03 + a11*b13 + a12*b23 + a13*b33;

      a[8]  = a20*b00 + a21*b10 + a22*b20 + a23*b30;
      a[9]  = a20*b01 + a21*b11 + a22*b21 + a23*b31;
      a[10] = a20*b02 + a21*b12 + a22*b22 + a23*b32;
      a[11] = a20*b03 + a21*b13 + a22*b23 + a23*b33;

      a[12] = a30*b00 + a31*b10 + a32*b20 + a33*b30;
      a[13] = a30*b01 + a31*b11 + a32*b21 + a33*b31;
      a[14] = a30*b02 + a31*b12 + a32*b22 + a33*b32;
      a[15] = a30*b03 + a31*b13 + a32*b23 + a33*b33;

      return this;
    },

    /**
    * Multiply a and b and assign the result to this instance.
    *
    * @param {!Array.<Number>} a The first term of the multiplication ({@link vecJS.M44#m}).
    * @param {!Array.<Number>} b The second term of the multiplication ({@link vecJS.M44#m}).
    *
    * @return {!vecJS.M44} This instance.
    */
    assignMul: function (a, b) {
      var m = this.m,
          a00 = a[0],  a01 = a[1],  a02 = a[2],  a03 = a[3],
          a10 = a[4],  a11 = a[5],  a12 = a[6],  a13 = a[7],
          a20 = a[8],  a21 = a[9],  a22 = a[10], a23 = a[11],
          a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],
          b00 = b[0],  b01 = b[1],  b02 = b[2],  b03 = b[3],
          b10 = b[4],  b11 = b[5],  b12 = b[6],  b13 = b[7],
          b20 = b[8],  b21 = b[9],  b22 = b[10], b23 = b[11],
          b30 = b[12], b31 = b[13], b32 = b[14], b33 = b[15];

      m[0]  = a00*b00 + a01*b10 + a02*b20 + a03*b30;
      m[1]  = a00*b01 + a01*b11 + a02*b21 + a03*b31;
      m[2]  = a00*b02 + a01*b12 + a02*b22 + a03*b32;
      m[3]  = a00*b03 + a01*b13 + a02*b23 + a03*b33;

      m[4]  = a10*b00 + a11*b10 + a12*b20 + a13*b30;
      m[5]  = a10*b01 + a11*b11 + a12*b21 + a13*b31;
      m[6]  = a10*b02 + a11*b12 + a12*b22 + a13*b32;
      m[7]  = a10*b03 + a11*b13 + a12*b23 + a13*b33;

      m[8]  = a20*b00 + a21*b10 + a22*b20 + a23*b30;
      m[9]  = a20*b01 + a21*b11 + a22*b21 + a23*b31;
      m[10] = a20*b02 + a21*b12 + a22*b22 + a23*b32;
      m[11] = a20*b03 + a21*b13 + a22*b23 + a23*b33;

      m[12] = a30*b00 + a31*b10 + a32*b20 + a33*b30;
      m[13] = a30*b01 + a31*b11 + a32*b21 + a33*b31;
      m[14] = a30*b02 + a31*b12 + a32*b22 + a33*b32;
      m[15] = a30*b03 + a31*b13 + a32*b23 + a33*b33;

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
        m00 = m[0],  m01 = m[1],  m02 = m[2],  m03 = m[3],
        m10 = m[4],  m11 = m[5],  m12 = m[6],  m13 = m[7],
        m20 = m[8],  m21 = m[9],  m22 = m[10], m23 = m[11],
        m30 = m[12], m31 = m[13], m32 = m[14], m33 = m[15];

      return m03*m12*m21*m30 - m02*m13*m21*m30 - m03*m11*m22*m30 + m01*m13*m22*m30 +
             m02*m11*m23*m30 - m01*m12*m23*m30 - m03*m12*m20*m31 + m02*m13*m20*m31 +
             m03*m10*m22*m31 - m00*m13*m22*m31 - m02*m10*m23*m31 + m00*m12*m23*m31 +
             m03*m11*m20*m32 - m01*m13*m20*m32 - m03*m10*m21*m32 + m00*m13*m21*m32 +
             m01*m10*m23*m32 - m00*m11*m23*m32 - m02*m11*m20*m33 + m01*m12*m20*m33 +
             m02*m10*m21*m33 - m00*m12*m21*m33 - m01*m10*m22*m33 + m00*m11*m22*m33;
    },
    /**
    * Set this instance to its transpose matrix.
    *
    * @return {!vecJS.M44} This instance.
    */
    transpose: function () {
      var b,
          m = this.m;
      
      b = m[4];  m[4]  = m[1];  m[1]  = b;
      b = m[8];  m[8]  = m[2];  m[2]  = b;
      b = m[12]; m[12] = m[3];  m[3]  = b;
      b = m[9];  m[9]  = m[6];  m[6]  = b;
      b = m[13]; m[13] = m[7];  m[7]  = b;
      b = m[14]; m[14] = m[11]; m[11] = b;

      return this;
    },

    /**
    * Set this matrix to its inverse
    *
    * @return {!vecJS.M44} This instance.
    */
    invert: function () {
      var m = this.m,
          a00 = m[0],  a01 = m[1],  a02 = m[2],  a03 = m[3],
          a10 = m[4],  a11 = m[5],  a12 = m[6],  a13 = m[7],
          a20 = m[8],  a21 = m[9],  a22 = m[10], a23 = m[11],
          a30 = m[12], a31 = m[13], a32 = m[14], a33 = m[15],
      
          b00 = a00 * a11 - a01 * a10,
          b01 = a00 * a12 - a02 * a10,
          b02 = a00 * a13 - a03 * a10,
          b03 = a01 * a12 - a02 * a11,
          b04 = a01 * a13 - a03 * a11,
          b05 = a02 * a13 - a03 * a12,
          b06 = a20 * a31 - a21 * a30,
          b07 = a20 * a32 - a22 * a30,
          b08 = a20 * a33 - a23 * a30,
          b09 = a21 * a32 - a22 * a31,
          b10 = a21 * a33 - a23 * a31,
          b11 = a22 * a33 - a23 * a32,
          invDet = 1 / (b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06);

        m[0]  = ( a11 * b11 - a12 * b10 + a13 * b09) * invDet;
        m[1]  = (-a01 * b11 + a02 * b10 - a03 * b09) * invDet;
        m[2]  = ( a31 * b05 - a32 * b04 + a33 * b03) * invDet;
        m[3]  = (-a21 * b05 + a22 * b04 - a23 * b03) * invDet;

        m[4]  = (-a10 * b11 + a12 * b08 - a13 * b07) * invDet;
        m[5]  = ( a00 * b11 - a02 * b08 + a03 * b07) * invDet;
        m[6]  = (-a30 * b05 + a32 * b02 - a33 * b01) * invDet;
        m[7]  = ( a20 * b05 - a22 * b02 + a23 * b01) * invDet;

        m[8]  = ( a10 * b10 - a11 * b08 + a13 * b06) * invDet;
        m[9]  = (-a00 * b10 + a01 * b08 - a03 * b06) * invDet;
        m[10] = ( a30 * b04 - a31 * b02 + a33 * b00) * invDet;
        m[11] = (-a20 * b04 + a21 * b02 - a23 * b00) * invDet;

        m[12] = (-a10 * b09 + a11 * b07 - a12 * b06) * invDet;
        m[13] = ( a00 * b09 - a01 * b07 + a02 * b06) * invDet;
        m[14] = (-a30 * b03 + a31 * b01 - a32 * b00) * invDet;
        m[15] = ( a20 * b03 - a21 * b01 + a22 * b00) * invDet;

        return this;
    },

    /**
    * Create a left-hand look-at matrix with the given eye position, focal point, and up axis and assign it to this instance.
    *
    * @param {!Array.<Number>} eye Position of the viewer ({@link vecJS.V3#v}).
    * @param {!Array.<Number>} at Point the viewer is looking at ({@link vecJS.V3#v}).
    * @param {!Array.<Number>} up Direction of the "up" vector. ({@link vecJS.V3#v}).
    *
    * @return {!vecJS.M44} This instance.
    */
    lookAtLH: function (eye, at, up) {
      var m = this.m,
          vx = _vx.v, vy = _vy.v, vz = _vz.v;

      _vz.assignSub(at, eye).normalize();
      _vx.assignCross(up, vz).normalize();
      _vy.assignCross(vz, vx);

      m[0] = vx[0]; m[1] = vy[0]; m[2]  = vz[0]; m[3]  = 0;
      m[4] = vx[1]; m[5] = vy[1]; m[6]  = vz[1]; m[7]  = 0;
      m[8] = vx[2]; m[9] = vy[2]; m[10] = vz[2]; m[11] = 0;

      m[12] = -_vx.dot(eye);
      m[13] = -_vy.dot(eye);
      m[14] = -_vz.dot(eye);
      m[15] = 1;

      return this;
    },

    /**
    * Create a right-hand look-at matrix with the given eye position, focal point, and up axis and assign it to this instance.
    *
    * @param {!Array.<Number>} eye Position of the viewer ({@link vecJS.V3#v}).
    * @param {!Array.<Number>} at Point the viewer is looking at ({@link vecJS.V3#v}).
    * @param {!Array.<Number>} up Direction of the "up" vector. ({@link vecJS.V3#v}).
    *
    * @return {!vecJS.M44} This instance.
    */
    lookAtRH: function (eye, at, up) {
      var m = this.m,
          vx = _vx.v, vy = _vy.v, vz = _vz.v;

      _vz.assignSub(eye, at).normalize();
      _vx.assignCross(up, vz).normalize();
      _vy.assignCross(vz, vx);

      m[0] = vx[0]; m[1] = vy[0]; m[2]  = vz[0]; m[3]  = 0;
      m[4] = vx[1]; m[5] = vy[1]; m[6]  = vz[1]; m[7]  = 0;
      m[8] = vx[2]; m[9] = vy[2]; m[10] = vz[2]; m[11] = 0;

      m[12] = -_vx.dot(eye);
      m[13] = -_vy.dot(eye);
      m[14] = -_vz.dot(eye);
      m[15] = 1;

      return this;
    },

    /**
     * Create a frustum matrix with the given bounds and assign it to this instance.
     *
     * @param {number} left left bound of the frustum.
     * @param {number} right right bound of the frustum.
     * @param {number} bottom bottom bound of the frustum.
     * @param {number} top top bound of the frustum.
     * @param {number} near near bound of the frustum.
     * @param {number} far far bound of the frustum.
     */
    frustum: function(left, right, bottom, top, near, far) {
      var m = this.m,
          rl = (right - left),
          tb = (top - bottom),
          fn = (far - near);

      m[0] = (near*2) / rl;       m[1] = 0;                   m[2] = 0;                   m[3] = 0;
      m[4] = 0;                   m[5] = (near*2) / tb;       m[6] = 0;                   m[7] = 0;
      m[8] = (right + left) / rl; m[9] = (top + bottom) / tb; m[10] = -(far + near) / fn; m[11] = -1;
      m[12] = 0;                  m[13] = 0;                  m[14] = -(far*near*2) / fn; m[15] = 0;

      return this;
    },

    /**
     * Create a perspective projection matrix from a camera aspect parameters and assign it to this instance.
    *
    * @param {number} fov The field of view in degrees.
    * @param {number} aspect The view aspect ratio (width / height).
    * @param {number} near The z-position of the near clipping plane.
    * @param {number} far The z-position of the far clipping plane.
    *
    * @returns {!vecJS.M44} This instance.
    */
    perspective: function (fov, aspect, near, far) {
      var ymax = near * Math.tan(fov * Math.PI / 360),
          ymin = -ymax,
          xmin = ymin * aspect,
          xmax = ymax * aspect,
          w = xmax - xmin,
          h = ymax - ymin,
          d = far - near,
          m = this.m;

      m[0]  = 2 * near / w;  m[1]  = 0;             m[2]  = (xmax + xmin) / w; m[3]  = 0;
      m[4]  = 0;             m[5]  = 2 * near / h;  m[6]  = (ymax + ymin) / h; m[7]  = 0;
      m[8]  = 0;             m[9]  = 0;             m[10] = -(far + near) / d; m[11] = -(2 * far * near) / d;
      m[12] = 0;             m[13] = 0;             m[14] = -1;                m[15] = 0;

      return this;
    },

    /**
     * Create an orthogonal projection matrix with the given bounds and assign it to this instance.
     *
     * @param {number} left left bound of the frustum.
     * @param {number} right right bound of the frustum.
     * @param {number} bottom bottom bound of the frustum.
     * @param {number} top top bound of the frustum.
     * @param {number} near near bound of the frustum.
     * @param {number} far far bound of the frustum.
     *
     * @returns {!vecJS.M44} This instance.
     */
    orthogonal: function (left, right, bottom, top, near, far) {
      var rl = (right - left),
          tb = (top - bottom),
          fn = (far - near),
          m = this.m;

      m[0]  = 2 / rl;                m[1]  = 0;                     m[2]  = 0;                   m[3]  = 0;
      m[4]  = 0;                     m[5]  = 2 / tb;                m[6]  = 0;                   m[7]  = 0;
      m[8]  = 0;                     m[9]  = 0;                     m[10] = -2 / fn;             m[11] = 0;
      m[12] = -(left + right) / rl;  m[13] = -(top + bottom) / tb;  m[14] = -(far + near) / fn;  m[15] = 1;

      return this;
    },

    /**
     * Return a string representation of the current instance.
     */
    toString: function () {
      var m = this.m;

      return 'M44\n' +
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
        disp_f(m[11])  + '\n' +

        disp_f(m[12]) + '  ' +
        disp_f(m[13]) + '  ' +
        disp_f(m[14]) + '  ' +
        disp_f(m[15]);
    }
  };
})();
