/**
 *
 * @param {!Object} actual
 * @param {!Object} expected
 * @param {String=} message
 * @param {Number=} precision
 */
function fequal (actual, expected, message, precision) {
  precision = precision || vecJS.precision;
  QUnit.push(Math.abs(expected - actual) < precision, actual, expected, message);
}

/**
 *
 * @param {!Object} actual
 * @param {!Object} expected
 * @param {String=} message
 */
function mequal (actual, expected, message) {
  var l, l1 = actual.length, l2 = expected.length;
  QUnit.push(l1 == l2, l1, l2, message + ' - array lengths');
  for (l = 0; l < l1; l++) {
    QUnit.push(actual[l] == expected[l], actual[l], expected[l], message + ' - value[' + l + ']');
  }
}

/**
 *
 * @param {!Object} actual
 * @param {!Object} expected
 * @param {String=} message
 * @param {Number=} precision
 */
function mfequal (actual, expected, message, precision) {
  var l,
    l1 = (typeof actual.length === 'number') ? actual.length : actual.length(),
    l2 = (typeof expected.length === 'number') ? expected.length : expected.length();
  precision = precision || vecJS.precision;
  QUnit.push(l1 == l2, l1, l2, message + ' - array lengths');
  for (l = 0; l < l1; l++) {
    QUnit.push(Math.abs(expected[l] - actual[l]) < precision, actual[l], expected[l], message + ' - value[' + l + ']');
  }
}

function run_test_set (set) {
  for (var testName in set) {
    if (set.hasOwnProperty(testName)) {
      test(testName, set[testName]);
    }
  }
}
