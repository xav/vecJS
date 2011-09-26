/**
 *
 * @param {String} name The name of the module
 * @param {Object=} lifecycle
 */
function module(name, lifecycle) {}
/**
 *
 * @param {String} name The name of the test
 * @param {Number=} expected How many assertions are expected to run.
 * @param {Function} test The actual testing code to run, should include at least one assertion.
 */
function asyncTest(name, expected, test) {}
/**
 * 
 * @param {String} name The name of the test
 * @param {Number=} expected How many assertions are expected to run.
 * @param {Function} test The actual testing code to run, should include at least one assertion.
 */
function test(name, expected, test) {}
/**
 *
 * @param {Number} amount The number of assertions you expect to run.
 */
function expect(amount) {}
/**
 *
 * @param {Boolean} state 
 * @param {String=} message A message to output with the assertion result.
 */
function ok(state, message) {}
/**
 *
 * @param {Object} actual The actual result
 * @param {Object} expected The expected result
 * @param {String=} message A message to display with the assertion result
 */
function equal(actual, expected, message) {}
/**
 *
 * @param {Object} actual The actual result
 * @param {Object} expected The expected result
 * @param {String=} message A message to display with the assertion result
 */
function notEqual(actual, expected, message) {}
/**
 *
 * @param {Object} actual The actual result
 * @param {Object} expected The expected result
 * @param {String=} message A message to display with the assertion result
 */
function deepEqual(actual, expected, message) {}
/**
 *
 * @param {Object} actual The actual result
 * @param {Object} expected The expected result
 * @param {String=} message A message to display with the assertion result
 */
function notDeepEqual(actual, expected, message) {}
/**
 *
 * @param {Object} actual The actual result
 * @param {Object} expected The expected result
 * @param {String=} message A message to display with the assertion result
 */
function strictEqual(actual, expected, message) {}
/**
 *
 * @param {Object} actual The actual result
 * @param {Object} expected The expected result
 * @param {String=} message A message to display with the assertion result
 */
function notStrictEqual(actual, expected, message) {}
/**
 *
 * @param {Function} block Callback to execute, expecting it to throw an exception. Gets called with default scope (window) and no arguments.
 * @param {Function=} expected An optional verification. Can be a regex to test the thrown exception. Can be a constructor function, tested with instanceof against the exception. Can be a callback - called with the exception as the first argument, return true for a valid exception.
 * @param {String=} message A message to output with the assertion result.
 */
function raises(block, expected, message) {}
/**
 *
 * @param {Number=} decrement Optional argument to decrement the semaphore the given times.
 */
function start(decrement) {}
/**
 *
 * @param {Number=} timeout Optional argument to increment the stop-semaphore the given times.
 */
function stop(timeout) {}
