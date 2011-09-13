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

var _vecJS = window.vecJS,
    _$V = window.$V,
    cos = Math.cos,
    sin = Math.sin;

/**
* @namespace The vecJS namespace.
*/
var vecJS = {
  version: '0.1.0'
};

/**
 * Relinquish vecJS's control of the $V variable.
 *
 * @param {Boolean=} removeAll A Boolean indicating whether to remove all vecJS
 * variables from the global scope (including jQuery itself).
 *
 * @return {!Object} The {@link vecJS} object.
 */
vecJS.noConflict = function (removeAll) {
  if (window.$V === vecJS) {
    window.$V = _$V;
  }

  if (removeAll && window.vecJS === vecJS) {
    window.vecJS = _vecJS;
  }

  return vecJS;
};