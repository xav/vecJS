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
* @param {Array=} arr Array containing values to initialize with.
*
* @property {GLMatrixArray} m the matrix values.
*
* @constructor
*/
vecJS.M44 = function M44(arr) {
  var m = this.m = new GLMatrixArray(16);
  if (arr) {
    m[0]  = arr[0];  m[1]  = arr[1];  m[2]  = arr[2] ; m[3]  = arr[3];
    m[4]  = arr[4];  m[5]  = arr[5];  m[6]  = arr[6] ; m[7]  = arr[7];
    m[8]  = arr[8];  m[9]  = arr[9];  m[10] = arr[10]; m[11] = arr[11];
    m[12] = arr[12]; m[13] = arr[13]; m[14] = arr[14]; m[15] = arr[15];
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
    * @param {!Array} arr The new values.
    *
    * @return {!vecJS.M44} This instance.
    */
    set: function (arr) {
      var m = this.m;
      m[0]  = arr[0];  m[1]  = arr[1];  m[2]  = arr[2] ; m[3]  = arr[3];
      m[4]  = arr[4];  m[5]  = arr[5];  m[6]  = arr[6] ; m[7]  = arr[7];
      m[8]  = arr[8];  m[9]  = arr[9];  m[10] = arr[10]; m[11] = arr[11];
      m[12] = arr[12]; m[13] = arr[13]; m[14] = arr[14]; m[15] = arr[15];
      return this;
    },
    /**
    * Copy the specified matrix to this instance.
    *
    * @param {!vecJS.M44} m The source matrix.
    *
    * @return {!vecJS.M44} This instance.
    */
    cpy: function (m) {
      var a = this.m;
      m = m.m;

      a[0]  = m[0];  a[1]  = m[1];  a[2]  = m[2] ; a[3]  = m[3];
      a[4]  = m[4];  a[5]  = m[5];  a[6]  = m[6] ; a[7]  = m[7];
      a[8]  = m[8];  a[9]  = m[9];  a[10] = m[10]; a[11] = m[11];
      a[12] = m[12]; a[13] = m[13]; a[14] = m[14]; a[15] = m[15];
      
      return this;
    },
    /**
    * Copy this matrix instance to the specified one.
    *
    * @param {!vecJS.M44} m The target matrix.
    *
    * @return {!vecJS.M44} This instance.
    */
    cpyto: function (m) {
      var a = this.m;
      m = m.m;

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
    cln: function () {
      return new vecJS.M44(this.m);
    },

    /**
     * Set the matrix values from the specified quaternion.
     *
     * @param {!vecJS.V4} q The source quaternion.
     *
    * @return {!vecJS.M44} This instance.
     */
    fromQuat: function (q) {
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
    idt: function () {
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
    * @param {!vecJS.M44} m The matrix to multiply with this instance.
    *
    * @return {!vecJS.M44} This instance.
    */
    mul: function (m) {
    m = m.m;
    var a = this.m,
        a00 = a[0],  a01 = a[1],  a02 = a[2],  a03 = a[3],
        a10 = a[4],  a11 = a[5],  a12 = a[6],  a13 = a[7],
        a20 = a[8],  a21 = a[9],  a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],
        b00 = m[0],  b01 = m[1],  b02 = m[2],  b03 = m[3],
        b10 = m[4],  b11 = m[5],  b12 = m[6],  b13 = m[7],
        b20 = m[8],  b21 = m[9],  b22 = m[10], b23 = m[11],
        b30 = m[12], b31 = m[13], b32 = m[14], b33 = m[15];

    a[0]  = b00*a00 + b01*a10 + b02*a20 + b03*a30;
    a[1]  = b00*a01 + b01*a11 + b02*a21 + b03*a31;
    a[2]  = b00*a02 + b01*a12 + b02*a22 + b03*a32;
    a[3]  = b00*a03 + b01*a13 + b02*a23 + b03*a33;

    a[4]  = b10*a00 + b11*a10 + b12*a20 + b13*a30;
    a[5]  = b10*a01 + b11*a11 + b12*a21 + b13*a31;
    a[6]  = b10*a02 + b11*a12 + b12*a22 + b13*a32;
    a[7]  = b10*a03 + b11*a13 + b12*a23 + b13*a33;

    a[8]  = b20*a00 + b21*a10 + b22*a20 + b23*a30;
    a[9]  = b20*a01 + b21*a11 + b22*a21 + b23*a31;
    a[10] = b20*a02 + b21*a12 + b22*a22 + b23*a32;
    a[11] = b20*a03 + b21*a13 + b22*a23 + b23*a33;

    a[12] = b30*a00 + b31*a10 + b32*a20 + b33*a30;
    a[13] = b30*a01 + b31*a11 + b32*a21 + b33*a31;
    a[14] = b30*a02 + b31*a12 + b32*a22 + b33*a32;
    a[15] = b30*a03 + b31*a13 + b32*a23 + b33*a33;

    return this;
  },

    /**
    * Multiply a and b and assign the result to this instance.
    *
    * @param {!vecJS.M44} a The first term of the multiplication.
    * @param {!vecJS.M44} b The second term of the multiplication.
    *
    * @return {!vecJS.M44} This instance.
    */
    amul: function (a, b) {
      a = a.m;
      b = b.m;
      var m = this.m,
          a00 = a[0],  a01 = a[1],  a02 = a[2],  a03 = a[3],
          a10 = a[4],  a11 = a[5],  a12 = a[6],  a13 = a[7],
          a20 = a[8],  a21 = a[9],  a22 = a[10], a23 = a[11],
          a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],
          b00 = b[0],  b01 = b[1],  b02 = b[2],  b03 = b[3],
          b10 = b[4],  b11 = b[5],  b12 = b[6],  b13 = b[7],
          b20 = b[8],  b21 = b[9],  b22 = b[10], b23 = b[11],
          b30 = b[12], b31 = b[13], b32 = b[14], b33 = b[15];

      m[0]  = b00*a00 + b01*a10 + b02*a20 + b03*a30;
      m[1]  = b00*a01 + b01*a11 + b02*a21 + b03*a31;
      m[2]  = b00*a02 + b01*a12 + b02*a22 + b03*a32;
      m[3]  = b00*a03 + b01*a13 + b02*a23 + b03*a33;

      m[4]  = b10*a00 + b11*a10 + b12*a20 + b13*a30;
      m[5]  = b10*a01 + b11*a11 + b12*a21 + b13*a31;
      m[6]  = b10*a02 + b11*a12 + b12*a22 + b13*a32;
      m[7]  = b10*a03 + b11*a13 + b12*a23 + b13*a33;

      m[8]  = b20*a00 + b21*a10 + b22*a20 + b23*a30;
      m[9]  = b20*a01 + b21*a11 + b22*a21 + b23*a31;
      m[10] = b20*a02 + b21*a12 + b22*a22 + b23*a32;
      m[11] = b20*a03 + b21*a13 + b22*a23 + b23*a33;

      m[12] = b30*a00 + b31*a10 + b32*a20 + b33*a30;
      m[13] = b30*a01 + b31*a11 + b32*a21 + b33*a31;
      m[14] = b30*a02 + b31*a12 + b32*a22 + b33*a32;
      m[15] = b30*a03 + b31*a13 + b32*a23 + b33*a33;

      return this;
    },

    /**
    * Set this instance to its transpose matrix.
    *
    * @return {!vecJS.M44} This instance.
    */
    trans: function () {
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
    inv: function () {
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
    * Create a look-at rotation matrix with the given eye position, focal point, and up axis and assign it to this instance.
    *
    * @param {!vecJS.V3} eye Position of the viewer
    * @param {!vecJS.V3} center Point the viewer is looking at
    * @param {!vecJS.V3} up Pointing "up"
    *
    * @return {!vecJS.M44} This instance.
    */
    lookAt: function (eye, center, up) {
      var m = this.m;
      
      _vz.copy(eye).sub(center).normalize();
      _vx.copy(up).cross(_vz).normalize();
      _vy.copy(_vz).cross(_vx).normalize();

      m[0]  = _vx.x; m[1]  = _vx.y; m[2]  = _vx.z; m[3]  = -_vx.dot(eye);
      m[4]  = _vy.x; m[5]  = _vy.y; m[6]  = _vy.z; m[7]  = -_vy.dot(eye);
      m[8]  = _vz.x; m[9]  = _vz.y; m[10] = _vz.z; m[11] = -_vz.dot(eye);
      m[12] = 0;     m[13] = 0;     m[14] = 0;     m[15] = 1;

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
      var ymax = near * tan(fov * PI / 360),
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

    toString: function () {
      var m = this.m;
      return 'M44[\n' +
        ' [' + m[0]  + ', ' + m[1]  + ', ' + m[2]  + ', ' + m[3]  + ']\n' +
        ' [' + m[4]  + ', ' + m[5]  + ', ' + m[6]  + ', ' + m[7]  + ']\n' +
        ' [' + m[8]  + ', ' + m[9]  + ', ' + m[10] + ', ' + m[11] + ']\n' +
        ' [' + m[12] + ', ' + m[13] + ', ' + m[14] + ', ' + m[15] + ']\n' +
        ']\n';
    }
  };
})();
