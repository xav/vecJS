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
* The matrix looks like this:
* <table>
*   <tr><td>n11</td><td>n12</td><td>n13</td><td>n14</td></tr>
*   <tr><td>n21</td><td>n22</td><td>n23</td><td>n24</td></tr>
*   <tr><td>n31</td><td>n32</td><td>n33</td><td>n34</td></tr>
*   <tr><td>n41</td><td>n42</td><td>n43</td><td>n44</td></tr>
* </table>
*
* @class An affine 4x4 matrix.
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
* @param {number=} n41 The value for r4c1
* @param {number=} n42 The value for r4c2
* @param {number=} n43 The value for r4c3
* @param {number=} n44 The value for r4c4
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
* @property {number} n41 The value for r4c1
* @property {number} n42 The value for r4c2
* @property {number} n43 The value for r4c3
* @property {number} n44 The value for r4c4
*
* @constructor
*/
vecJS.M44 = function M44(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
  this.n11 = n11 === undefined ? 1 : n11;
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

  this.n41 = n41 || 0;
  this.n42 = n42 || 0;
  this.n43 = n43 || 0;
  this.n44 = n44 === undefined ? 1 : n44;

  this.flat = null;
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
    * @param {number} n41 The value for r4c1
    * @param {number} n42 The value for r4c2
    * @param {number} n43 The value for r4c3
    * @param {number} n44 The value for r4c4
    *
    * @return {!vecJS.M34} This instance.
    */
    set: function (n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
      this.n11 = n11; this.n12 = n12; this.n13 = n13; this.n14 = n14;
      this.n21 = n21; this.n22 = n22; this.n23 = n23; this.n24 = n24;
      this.n31 = n31; this.n32 = n32; this.n33 = n33; this.n34 = n34;
      this.n41 = n41; this.n42 = n42; this.n43 = n43; this.n44 = n44;
      return this;
    },
    /**
    * Copy the specified matrix to this instance.
    *
    * @param {!vecJS.M44} m The source matrix.
    *
    * @return {!vecJS.M44} This instance.
    */
    copy: function (m) {
      this.n11 = m.n11; this.n12 = m.n12; this.n13 = m.n13; this.n14 = m.n14;
      this.n21 = m.n21; this.n22 = m.n22; this.n23 = m.n23; this.n24 = m.n24;
      this.n31 = m.n31; this.n32 = m.n32; this.n33 = m.n33; this.n34 = m.n34;
      this.n41 = m.n41; this.n42 = m.n42; this.n43 = m.n43; this.n44 = m.n44;
      return this;
    },
    /**
    * Copy this matrix instance to the specified one.
    *
    * @param {!vecJS.M44} m The target matrix.
    *
    * @return {!vecJS.M44} This instance.
    */
    copyTo: function (m) {
      m.n11 = this.n11; m.n12 = this.n12; m.n13 = this.n13; m.n14 = this.n14;
      m.n21 = this.n21; m.n22 = this.n22; m.n23 = this.n23; m.n24 = this.n24;
      m.n31 = this.n31; m.n32 = this.n32; m.n33 = this.n33; m.n34 = this.n34;
      m.n41 = this.n41; m.n43 = this.n42; m.n43 = this.n43; m.n44 = this.n44;
      return this;
    },
    /**
    * Create a clone of the matrix instance.
    *
    * @return {!vecJS.M44} A new matrix instance which is a copy of this one.
    */
    clone: function () {
      return new vecJS.M44(
        this.n11, this.n12, this.n13, this.n14,
        this.n21, this.n22, this.n23, this.n24,
        this.n31, this.n32, this.n33, this.n34,
        this.n41, this.n42, this.n43, this.n44
      );
    },
    flatten: function() {
      var flat = this.flat = this.flat || new Array(16);
      flat[ 0] = this.n11;
      flat[ 1] = this.n21;
      flat[ 2] = this.n31;
      flat[ 3] = this.n41;

      flat[ 4] = this.n12;
      flat[ 5] = this.n22;
      flat[ 6] = this.n32;
      flat[ 7] = this.n42;

      flat[ 8] = this.n13;
      flat[ 9] = this.n23;
      flat[10] = this.n33;
      flat[11] = this.n43;

      flat[12] = this.n14;
      flat[13] = this.n24;
      flat[14] = this.n34;
      flat[15] = this.n44;

      return flat;
    },
    flattenTo: function(flat) {
      flat[ 0] = this.n11;
      flat[ 1] = this.n21;
      flat[ 2] = this.n31;
      flat[ 3] = this.n41;

      flat[ 4] = this.n12;
      flat[ 5] = this.n22;
      flat[ 6] = this.n32;
      flat[ 7] = this.n42;

      flat[ 8] = this.n13;
      flat[ 9] = this.n23;
      flat[10] = this.n33;
      flat[11] = this.n43;

      flat[12] = this.n14;
      flat[13] = this.n24;
      flat[14] = this.n34;
      flat[15] = this.n44;

      return this;
    },

    /**
    * Set this instance to an identity matrix.
    *
    * @return {!vecJS.M44} This instance.
    */
    identity: function () {
      this.n11 = 1; this.n12 = 0; this.n13 = 0; this.n14 = 0;
      this.n21 = 0; this.n22 = 1; this.n23 = 0; this.n24 = 0;
      this.n31 = 0; this.n32 = 0; this.n33 = 1; this.n34 = 0;
      this.n41 = 0; this.n42 = 0; this.n43 = 0; this.n44 = 1;
      return this;
    },

    /**
    * Multiply this matrix with the specified one and assign the result to this instance.
    *
    * @param {!(vecJS.M44|vecJS.M34)} m The matrix to multiply with this instance.
    *
    * @return {!vecJS.M44} This instance.
    */
    multiply: function (m) {
      var n11  = this.n11, n12  = this.n12, n13  = this.n13, n14  = this.n14,
          n21  = this.n21, n22  = this.n22, n23  = this.n23, n24  = this.n24,
          n31  = this.n31, n32  = this.n32, n33  = this.n33, n34  = this.n34,
          n41  = this.n41, n42  = this.n42, n43  = this.n43, n44  = this.n44,
          mn11 = m.n11,    mn12 = m.n12,    mn13 = m.n13,    mn14 = m.n14,
          mn21 = m.n21,    mn22 = m.n22,    mn23 = m.n23,    mn24 = m.n24,
          mn31 = m.n31,    mn32 = m.n32,    mn33 = m.n33,    mn34 = m.n34,
          mn41 = m.n41 || 0,
          mn42 = m.n42 || 0,
          mn43 = m.n43 || 0,
          mn44 = m.n44 === undefined ? 1 : m.n44;

      this.n11 = n11 * mn11 + n12 * mn21 + n13 * mn31 + n14 * mn41;
      this.n12 = n11 * mn12 + n12 * mn22 + n13 * mn32 + n14 * mn42;
      this.n13 = n11 * mn13 + n12 * mn23 + n13 * mn33 + n14 * mn43;
      this.n14 = n11 * mn14 + n12 * mn24 + n13 * mn34 + n14 * mn44;

      this.n21 = n21 * mn11 + n22 * mn21 + n23 * mn31 + n24 * mn41;
      this.n22 = n21 * mn12 + n22 * mn22 + n23 * mn32 + n24 * mn42;
      this.n23 = n21 * mn13 + n22 * mn23 + n23 * mn33 + n24 * mn43;
      this.n24 = n21 * mn14 + n22 * mn24 + n23 * mn34 + n24 * mn44;

      this.n31 = n31 * mn11 + n32 * mn21 + n33 * mn31 + n34 * mn41;
      this.n32 = n31 * mn12 + n32 * mn22 + n33 * mn32 + n34 * mn42;
      this.n33 = n31 * mn13 + n32 * mn23 + n33 * mn33 + n34 * mn43;
      this.n34 = n31 * mn14 + n32 * mn24 + n33 * mn34 + n34 * mn44;

      this.n41 = n41 * mn11 + n42 * mn21 + n43 * mn31 + n44 * mn41;
      this.n42 = n41 * mn12 + n42 * mn22 + n43 * mn32 + n44 * mn42;
      this.n43 = n41 * mn13 + n42 * mn23 + n43 * mn33 + n44 * mn43;
      this.n44 = n41 * mn14 + n42 * mn24 + n43 * mn34 + n44 * mn44;

      return this;
    },

    /**
    * Multiply a and b and assign the result to this instance.
    *
    * @param {!(vecJS.M34|vecJS.M44)} a The first term of the multiplication.
    * @param {!(vecJS.M34|vecJS.M44)} b The second term of the multiplication.
    *
    * @return {!vecJS.M44} This instance.
    */
    assignMultiply: function (a, b) {
      var a11 = a.n11, a12 = a.n12, a13 = a.n13, a14 = a.n14,
          a21 = a.n21, a22 = a.n22, a23 = a.n23, a24 = a.n24,
          a31 = a.n31, a32 = a.n32, a33 = a.n33, a34 = a.n34,
          a41 = a.n41 || 0,
          a42 = a.n42 || 0,
          a43 = a.n43 || 0,
          a44 = a.n44 === undefined ? 1 : a.n44,
          b11 = b.n11, b12 = b.n12, b13 = b.n13, b14 = b.n14,
          b21 = b.n21, b22 = b.n22, b23 = b.n23, b24 = b.n24,
          b31 = b.n31, b32 = b.n32, b33 = b.n33, b34 = b.n34,
          b41 = b.n41 || 0,
          b42 = b.n42 || 0,
          b43 = b.n43 || 0,
          b44 = b.n44 === undefined ? 1 : b.n44;

      this.n11 = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
      this.n12 = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
      this.n13 = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
      this.n14 = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

      this.n21 = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
      this.n22 = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
      this.n23 = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
      this.n24 = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

      this.n31 = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
      this.n32 = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
      this.n33 = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
      this.n34 = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

      this.n41 = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
      this.n42 = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
      this.n43 = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
      this.n44 = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

      return this;
    },

    /**
    * Set this instance to its transpose matrix.
    *
    * @return {!vecJS.M44} This instance.
    */
    transpose: function () {
      var b;
      b = this.n21; this.n21 = this.n12; this.n12 = b;
      b = this.n31; this.n31 = this.n13; this.n13 = b;
      b = this.n41; this.n41 = this.n14; this.n14 = b;
      b = this.n32; this.n32 = this.n23; this.n23 = b;
      b = this.n42; this.n42 = this.n24; this.n24 = b;
      b = this.n43; this.n43 = this.n34; this.n34 = b;

      return this;
    },

    /**
    * Set this matrix to its inverse
    *
    * @return {!vecJS.M44} This instance.
    */
    invert: function () {
      var a11 = this.n11, a12 = this.n12, a13 = this.n13, a14 = this.n14,
          a21 = this.n21, a22 = this.n22, a23 = this.n23, a24 = this.n24,
          a31 = this.n31, a32 = this.n32, a33 = this.n33, a34 = this.n34,
          a41 = this.n41, a42 = this.n42, a43 = this.n43, a44 = this.n44,
          b00 = a11 * a22 - a12 * a21,
          b01 = a11 * a23 - a13 * a21,
          b02 = a11 * a24 - a14 * a21,
          b03 = a12 * a23 - a13 * a22,
          b04 = a12 * a24 - a14 * a22,
          b05 = a13 * a24 - a14 * a23,
          b06 = a31 * a42 - a32 * a41,
          b07 = a31 * a43 - a33 * a41,
          b08 = a31 * a44 - a34 * a41,
          b09 = a32 * a43 - a33 * a42,
          b10 = a32 * a44 - a34 * a42,
          b11 = a33 * a44 - a34 * a43,
          invDet = 1 / (b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06);

        this.n11 = ( a22 * b11 - a23 * b10 + a24 * b09) * invDet;
        this.n12 = (-a12 * b11 + a13 * b10 - a14 * b09) * invDet;
        this.n13 = ( a42 * b05 - a43 * b04 + a44 * b03) * invDet;
        this.n14 = (-a32 * b05 + a33 * b04 - a34 * b03) * invDet;

        this.n21 = (-a21 * b11 + a23 * b08 - a24 * b07) * invDet;
        this.n22 = ( a11 * b11 - a13 * b08 + a14 * b07) * invDet;
        this.n23 = (-a41 * b05 + a43 * b02 - a44 * b01) * invDet;
        this.n24 = ( a31 * b05 - a33 * b02 + a34 * b01) * invDet;

        this.n31 = ( a21 * b10 - a22 * b08 + a24 * b06) * invDet;
        this.n32 = (-a11 * b10 + a12 * b08 - a14 * b06) * invDet;
        this.n33 = ( a41 * b04 - a42 * b02 + a44 * b00) * invDet;
        this.n34 = (-a31 * b04 + a32 * b02 - a34 * b00) * invDet;

        this.n41 = (-a21 * b09 + a22 * b07 - a23 * b06) * invDet;
        this.n42 = ( a11 * b09 - a12 * b07 + a13 * b06) * invDet;
        this.n43 = (-a41 * b03 + a42 * b01 - a43 * b00) * invDet;
        this.n44 = ( a31 * b03 - a32 * b01 + a33 * b00) * invDet;

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
      _vz.copy(eye).sub(center).normalize();
      _vx.copy(up).cross(_vz).normalize();
      _vy.copy(_vz).cross(_vx).normalize();

      this.n11 = _vx.x; this.n12 = _vx.y; this.n13 = _vx.z; this.n14 = -_vx.dot(eye);
      this.n21 = _vy.x; this.n22 = _vy.y; this.n23 = _vy.z; this.n24 = -_vy.dot(eye);
      this.n31 = _vz.x; this.n32 = _vz.y; this.n33 = _vz.z; this.n34 = -_vz.dot(eye);
      this.n41 = 0;     this.n42 = 0;     this.n43 = 0;     this.n44 = 1;

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
          d = far - near;

      this.n11 = 2 * near / w;  this.n12 = 0;             this.n13 = (xmax + xmin) / w; this.n14 = 0;
      this.n21 = 0;             this.n22 = 2 * near / h;  this.n23 = (ymax + ymin) / h; this.n24 = 0;
      this.n31 = 0;             this.n32 = 0;             this.n33 = -(far + near) / d; this.n34 = -(2 * far * near) / d;
      this.n41 = 0;             this.n42 = 0;             this.n43 = -1;                this.n44 = 0;

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
          fn = (far - near);

      this.n11 = 2 / rl;                this.n12 = 0;                     this.n13 = 0;                   this.n14 = 0;
      this.n21 = 0;                     this.n22 = 2 / tb;                this.n23 = 0;                   this.n24 = 0;
      this.n31 = 0;                     this.n32 = 0;                     this.n33 = -2 / fn;             this.n34 = 0;
      this.n41 = -(left + right) / rl;  this.n42 = -(top + bottom) / tb;  this.n43 = -(far + near) / fn;  this.n44 = 1;

      return this;
    }
  };
})();
