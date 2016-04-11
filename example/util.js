/**
提供一个工具方法
created by 2016/04/04
*/

var crypto = require('crypto');

/**
 * 
 * 加密算法
 * @return {String} md5 hash string
 * @public
 */
exports.hash = function hash(method, s, format) {
    var sum = crypto.createHash(method);
    var isBuffer = Buffer.isBuffer(s);
    if (!isBuffer && typeof s === 'object') {
        s = JSON.stringify(sortObject(s));
    }
    sum.update(s, isBuffer ? 'binary' : 'utf8');
    return sum.digest(format || 'hex');
};

/**
 * md5 hash算法
 * @param {String|Buffer} s
 * @param {String} 'hex' or 'base64'. default is 'hex'.
 * @return {String} md5 hash string
 * @public
 */
exports.md5 = function md5(s, format) {
    return exports.hash('md5', s, format);
};