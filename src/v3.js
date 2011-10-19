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
* @class A 3 dimensional vector.
*
* @param {Array.<Number>=} v The [x,y,z] values to initialize with.
*
* @property {GLMatrixArray} v the vector [x,y,z] values.
*
* @constructor
*/
vecJS.V3 = function V3(v) {
  /*@DEBUG*/
  if (v !== undefined && !dbg.isArray(v)) { throw 'v is not an array'; }
  if (v !== undefined && v.length !== 3) { throw 'v has an invalid size (' + (v.length) + ').'; }
  /*/@DEBUG*/
  if (this instanceof vecJS.V3) {
    var a = this.v = new GLMatrixArray(3);
    if (v) {
      a[0] = v[0];
      a[1] = v[1];
      a[2] = v[2];
    }
  } else {
    return new vecJS.V3(v);
  }
};

vecJS.V3.prototype = {
  constructor: vecJS.V3,

  /**
  * Set the current instance values.
  *
  * @param {!Array.<Number>} v The new values
  *
  * @return {!vecJS.V3} This instance.
  */
  set: function (v) {
    /*@DEBUG*/
    if (!dbg.isArray(v)) { throw 'v is not an array'; }
    if (v.length !== 3) { throw 'v has an invalid size (' + (v.length) + ').'; }
    /*/@DEBUG*/
    var a = this.v;
    a[0] = v[0];
    a[1] = v[1];
    a[2] = v[2];
    return this;
  },
  /**
  * Copy this vector instance to the specified one.
  *
  * @param {!Array.<Number>} v The target vector ({@link vecJS.V3#v}).
  *
  * @return {!vecJS.V3} This instance.
  */
  copyTo: function (v) {
    /*@DEBUG*/
    if (!dbg.isArray(v)) { throw 'v is not an array.'; }
    if (v.length !== 3) { throw 'v has an invalid size (' + (v.length) + ').'; }
    /*/@DEBUG*/
    var a = this.v;
    v[0] = a[0];
    v[1] = a[1];
    v[2] = a[2];
    return this;
  },
  /**
  * Create a clone of the vector instance.
  *
  * @return {!vecJS.V3} A new vector instance which is a copy of this one.
  */
  clone: function () {
    return new vecJS.V3(this.v);
  },

  /**
   * Load the translation part of the specified matrix into this instance.
   *
   * @param {!Array.<Number>} m The matrix containing the translation values ({@link vecJS.M34#m} or {@link vecJS.M44#m}).
   *
   * @return {!vecJS.V3} This instance.
   */
  loadTranslation: function (m) {
    /*@DEBUG*/
    if (!dbg.isArray(m)) { throw 'm is not an array'; }
    if (m.length !== 12 && m.length !== 16) { throw 'm has an invalid size (' + (m.length) + ').'; }
    /*/@DEBUG*/
    var v = this.v;
    v[0] = m[3];
    v[1] = m[7];
    v[2] = m[11];
    return this;
  },

  /**
   * Load the scaling part of the specified matrix into this instance.
   *
   * @param m {!Array.<Number>} m The matrix containing the scaling values ({@link vecJS.M34#m} or {@link vecJS.M44#m}).
   *
   * @return {!vecJS.V3} This instance.
   */
  loadScale: function (m) {
    /*@DEBUG*/
    if (!dbg.isArray(m)) { throw 'm is not an array'; }
    if (m.length !== 12 && m.length !== 16) { throw 'm has an invalid size (' + (m.length) + ').'; }
    /*/@DEBUG*/
    var v = this.v;
    m = m.m;
    v[0] = m[0];
    v[1] = m[5];
    v[2] = m[10];
    return this;
  },

  /**
  * Add the specified vector to this one and assign the result to this instance.
  *
  * @param {!Array.<Number>} v The vector to add to this instance ({@link vecJS.V3#v}).
  *
  * @return {!vecJS.V3} This instance.
  */
  add: function (v) {
    /*@DEBUG*/
    if (!dbg.isArray(v)) { throw 'v is not an array'; }
    if (v.length !== 3) { throw 'v has an invalid size (' + (v.length) + ').'; }
    /*/@DEBUG*/
    var a = this.v;
    a[0] += v[0];
    a[1] += v[1];
    a[2] += v[2];
    return this;
  },
  /**
  * Subtract the specified vector from this one and assign the result to this instance.
  *
  * @param {!Array.<Number>} v The vector to subtract from this instance ({@link vecJS.V3#v}).
  *
  * @return {!vecJS.V3} This instance.
  */
  sub: function (v) {
    /*@DEBUG*/
    if (!dbg.isArray(v)) { throw 'v is not an array'; }
    if (v.length !== 3) { throw 'v has an invalid size (' + (v.length) + ').'; }
    /*/@DEBUG*/
    var a = this.v;
    a[0] -= v[0];
    a[1] -= v[1];
    a[2] -= v[2];
    return this;
  },

  /**
  * Add b to a and assign the result to this instance.
  *
  * @param {!Array.<Number>} a The first term of the addition ({@link vecJS.V3#v}).
  * @param {!Array.<Number>} b The second term of the addition ({@link vecJS.V3#v}).
  *
  * @return {!vecJS.V3} This instance.
  */
  assignAdd: function (a, b) {
    /*@DEBUG*/
    if (!dbg.isArray(a)) { throw 'a is not an array'; }
    if (!dbg.isArray(b)) { throw 'b is not an array'; }
    if (a.length !== 3) { throw 'a has an invalid size (' + (a.length) + ').'; }
    if (b.length !== 3) { throw 'b has an invalid size (' + (b.length) + ').'; }
    /*/@DEBUG*/
    var v = this.v;
    v[0] = a[0] + b[0];
    v[1] = a[1] + b[1];
    v[2] = a[2] + b[2];
    return this;
  },
  /**
  * Subtract b from a and assign the result to this instance.
  *
  * @param {!Array.<Number>} a The first term of the subtraction ({@link vecJS.V3#v}).
  * @param {!Array.<Number>} b The second term of the subtraction ({@link vecJS.V3#v}).
  *
  * @return {!vecJS.V3} This instance.
  */
  assignSub: function (a, b) {
    /*@DEBUG*/
    if (!dbg.isArray(a)) { throw 'a is not an array'; }
    if (!dbg.isArray(b)) { throw 'b is not an array'; }
    if (a.length !== 3) { throw 'a has an invalid size (' + (a.length) + ').'; }
    if (b.length !== 3) { throw 'b has an invalid size (' + (b.length) + ').'; }
    /*/@DEBUG*/
    var v = this.v;
    v[0] = a[0] - b[0];
    v[1] = a[1] - b[1];
    v[2] = a[2] - b[2];
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
    /*@DEBUG*/
    if (!dbg.isNumber(s)) { throw 's is not an number'; }
    /*/@DEBUG*/
    var v = this.v;
    v[0] += s;
    v[1] += s;
    v[2] += s;
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
    /*@DEBUG*/
    if (!dbg.isNumber(s)) { throw 's is not an number'; }
    /*/@DEBUG*/
    var v = this.v;
    v[0] -= s;
    v[1] -= s;
    v[2] -= s;
    return this;
  },
  /**
  * Multiply all the components of this instance by the specified number.
  *
  * @param {number} s The multiplier.
  *
  * @return {!vecJS.V3} This instance.
  */
  mulScalar: function (s) {
    /*@DEBUG*/
    if (!dbg.isNumber(s)) { throw 's is not an number'; }
    /*/@DEBUG*/
    var v = this.v;
    v[0] *= s;
    v[1] *= s;
    v[2] *= s;
    return this;
  },
  /**
  * Divide all the components of this instance by the specified number.
  *
  * @param {number} s The divider.
  *
  * @return {!vecJS.V3} This instance.
  */
  divScalar: function (s) {
    /*@DEBUG*/
    if (!dbg.isNumber(s)) { throw 's is not an number'; }
    /*/@DEBUG*/
    var v = this.v;
    v[0] /= s;
    v[1] /= s;
    v[2] /= s;
    return this;
  },

  /**
  * Multiply the specified matrix with this vector and assign the result to this instance.
  *
  * @param {!Array.<Number>} m The matrix to multiply ({@link vecJS.M34#m}).
  *
  * @return {!vecJS.V3} This instance.
  */
  mulM34: function (m) {
    /*@DEBUG*/
    if (!dbg.isArray(m)) { throw 'm is not an array'; }
    if (m.length !== 12) { throw 'm has an invalid size (' + (m.length) + ').'; }
    /*/@DEBUG*/
    var v = this.v,
        vx = v[0], vy = v[1], vz = v[2];

    v[0] = vx*m[0] + vy*m[1] + vz*m[2]  + m[3];
    v[1] = vx*m[4] + vy*m[5] + vz*m[6]  + m[7];
    v[2] = vx*m[8] + vy*m[9] + vz*m[10] + m[11];

    return this;
  },

  /**
   * Multiply the specified matrix with this vector, project the result back to w = 1,
   * and assign the result to this instance.
   *
   * @param {!Array.<Number>} m The matrix to multiply ({@link vecJS.M44#m}).
   *
   * @return {!vecJS.V3} This instance.
   */
  mulM44: function (m) {
    /*@DEBUG*/
    if (!dbg.isArray(m)) { throw 'm is not an array'; }
    if (m.length !== 16) { throw 'm has an invalid size (' + (m.length) + ').'; }
    /*/@DEBUG*/
    var v = this.v,
        vx = v[0], vy = v[1], vz = v[2],
        w = vx*m[12] + vy*m[13] + vz*m[14] + m[15];

    v[0] = (vx*m[0]  + vy*m[1]  + vz*m[2]  + m[3] ) / w;
    v[1] = (vx*m[4]  + vy*m[5]  + vz*m[6]  + m[7] ) / w;
    v[2] = (vx*m[8]  + vy*m[9]  + vz*m[10] + m[11]) / w;

    return this;
  },

  /**
  * Multiply the rotation part of the specified matrix with this vector and assign the result to this instance.
  *
  * @param {!Array.<Number>} m The matrix to multiply ({@link vecJS.M34#m} or {@link vecJS.M44#m}).
  *
  * @return {!vecJS.V3} This instance.
  */
  rotate: function (m) {
    /*@DEBUG*/
    if (!dbg.isArray(m)) { throw 'm is not an array'; }
    if (m.length !== 12 && m.length !== 16) { throw 'm has an invalid size (' + (m.length) + ').'; }
    /*/@DEBUG*/
    var v = this.v,
        vx = v[0], vy = v[1], vz = v[2];

    v[0] = vx*m[0] + vy*m[1] + vz*m[2];
    v[1] = vx*m[4] + vy*m[5] + vz*m[6];
    v[2] = vx*m[8] + vy*m[9] + vz*m[10];

    return this;
  },



  /**
   * Multiply the specified quaternion with this vector and assign the result to this instance.
   *
   * @param {!Array.<Number>} q The quaternion to multiply ({@link vecJS.Q#q}).
   *
  * @return {!vecJS.V3} This instance.
   */
  mulQ: function (q) {
    /*@DEBUG*/
    if (!dbg.isArray(q)) { throw 'q is not an array'; }
    if (q.length !== 4) { throw 'q has an invalid size (' + (q.length) + ').'; }
    /*/@DEBUG*/
    var v = this.v,
        vx = v[0], vy = v[1], vz = v[2],
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

        // quat * vec
        ix =  qw*vx + qy*vz - qz*vy,
        iy =  qw*vy + qz*vx - qx*vz,
        iz =  qw*vz + qx*vy - qy*vx,
        iw = -qx*vx - qy*vy - qz*vz;

    // result * inverse quat
    v[0] = ix*qw - iw*qx - iy*qz + iz*qy;
    v[1] = iy*qw - iw*qy - iz*qx + ix*qz;
    v[2] = iz*qw - iw*qz - ix*qy + iy*qx;

    return this;
  },

  /**
  * Calculate the cross product of this vector and the specified one and assign the result to this instance.
  *
  * @param {!Array.<Number>} v The second term of the cross product ({@link vecJS.V3#v}).
  *
  * @return {!vecJS.V3} This instance.
  */
  cross: function (v) {
    /*@DEBUG*/
    if (!dbg.isArray(v)) { throw 'v is not an array'; }
    if (v.length !== 3) { throw 'v has an invalid size (' + (v.length) + ').'; }
    /*/@DEBUG*/
    var a = this.v,
        ax = a[0], ay = a[1], az = a[2],
        bx = v[0], by = v[1], bz = v[2];

    a[0] = ay*bz - az*by;
    a[1] = az*bx - ax*bz;
    a[2] = ax*by - ay*bx;

    return this;
  },

  /**
  * Calculate the cross product of the two specified vectors and assign the result to this instance.
  *
  * @param {!Array.<Number>} a The first term of the cross product ({@link vecJS.V3#v}).
  * @param {!Array.<Number>} b The second term of the cross product ({@link vecJS.V3#v}).
  *
  * @return {!vecJS.V3} This instance.
  */
  assignCross: function (a, b) {
    /*@DEBUG*/
    if (!dbg.isArray(a)) { throw 'a is not an array'; }
    if (!dbg.isArray(b)) { throw 'b is not an array'; }
    if (a.length !== 3) { throw 'a has an invalid size (' + (a.length) + ').'; }
    if (b.length !== 3) { throw 'b has an invalid size (' + (b.length) + ').'; }
    /*/@DEBUG*/
    var v = this.v,
        ax = a[0], ay = a[1], az = a[2],
        bx = b[0], by = b[1], bz = b[2];

    v[0] = ay*bz - az*by;
    v[1] = az*bx - ax*bz;
    v[2] = ax*by - ay*bx;

    return this;
  },

  /**
  * Calculate the dot product of this vector and the specified one.
  *
  * @param {!Array.<Number>} v The second term of the dot product ({@link vecJS.V3#v}).
  *
  * @return {number} The result of the dot product.
  */
  dot: function (v) {
    /*@DEBUG*/
    if (!dbg.isArray(v)) { throw 'v is not an array'; }
    if (v.length !== 3) { throw 'v has an invalid size (' + (v.length) + ').'; }
    /*/@DEBUG*/
    var a = this.v;
    return a[0]*v[0] + a[1]*v[1] + a[2]*v[2];
  },

  /**
   * Performs a linear interpolation between a and b and assign the result to this instance.
   *
   * @param {!Array.<Number>} a The first vector ({@link vecJS.V3#v}).
   * @param {!Array.<Number>} b The second vector ({@link vecJS.V3#v}).
   * @param {number} l The interpolation amount between the two vectors.
   *
   * @return {!vecJS.V3} This instance.
   */
  lerp: function (a, b, l) {
    /*@DEBUG*/
    if (!dbg.isArray(a)) { throw 'a is not an array'; }
    if (!dbg.isArray(b)) { throw 'b is not an array'; }
    if (!dbg.isNumber(l)) { throw 'l is not an number'; }
    if (a.length !== 3) { throw 'a has an invalid size (' + (a.length) + ').'; }
    if (b.length !== 3) { throw 'b has an invalid size (' + (b.length) + ').'; }
    /*/@DEBUG*/
    var v = this.v,
        ax = a[0], ay = a[1], az = a[2];

    v[0] = ax + l * (b[0] - ax);
    v[1] = ay + l * (b[1] - ay);
    v[2] = az + l * (b[2] - az);

    return this;
  },

  /**
  * Normalize this vector and assign the resulting unit vector to this instance.
  *
  * @return {!vecJS.V3} This instance.
  */
  normalize: function () {
    var v = this.v,
        vx = v[0], vy = v[1], vz = v[2],
        l = vx*vx + vy*vy + vz*vz;
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
        vx = v[0], vy = v[1], vz = v[2];
    return Math.sqrt(vx*vx + vy*vy + vz*vz);
  },
  /**
  * Calculate the squared length of this vector.
  *
  * @return {number} The squared length of this vector.
  */
  squaredLength: function () {
    var v = this.v,
        vx = v[0], vy = v[1], vz = v[2];
    return vx*vx + vy*vy + vz*vz;
  },

  /**
  * Calculate the distance between the tip of this vector and the tip of the specified one.
  *
  * @param {!Array.<Number>} v The other vector ({@link vecJS.V3#v}).
  *
  * @return {number} The distance between the tips of two vectors.
  */
  distance: function (v) {
    /*@DEBUG*/
    if (!dbg.isArray(v)) { throw 'v is not an array'; }
    if (v.length !== 3) { throw 'v has an invalid size (' + (v.length) + ').'; }
    /*/@DEBUG*/
    var a = this.v,
        dx = a[0] - v[0],
        dy = a[1] - v[1],
        dz = a[2] - v[2];
    return Math.sqrt(dx*dx + dy*dy + dz*dz);
  },
  /**
  * Calculate the squared distance between the tip of this vector and the tip of the specified one.
  *
  * @param {!Array.<Number>} v The other vector ({@link vecJS.V3#v}).
  *
  * @return {number} The squared distance between the tips of two vectors.
  */
  squaredDistance: function (v) {
    /*@DEBUG*/
    if (!dbg.isArray(v)) { throw 'v is not an array'; }
    if (v.length !== 3) { throw 'v has an invalid size (' + (v.length) + ').'; }
    /*/@DEBUG*/
    var a = this.v,
        dx = a[0] - v[0],
        dy = a[1] - v[1],
        dz = a[2] - v[2];
    return dx*dx + dy*dy + dz*dz;
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
        vx = v[0], vy = v[1], vz = v[2];
    return Math.abs(1 - (vx*vx + vy*vy + vz*vz)) < @PRECISION;
  },

  /**
   * Return a string representation of the current instance.
   */
  toString: function () {
    var v = this.v;
    return 'V3[' + disp_f(v[0]) + ', ' + disp_f(v[1]) + ', ' + disp_f(v[2]) + ']';
  }
};
