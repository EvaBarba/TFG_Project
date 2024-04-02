//helpers/crypt.js
const crypto = require('crypto');


/*
 * Encrypt the given password.
 * Mixes the given password and salt, executes SHA1 digest,
 * and returns 40 hexadecimal characters.
 */

module.exports.encryptPassword = function(password, salt) {
    return crypto.createHmac('sha1', salt).update(password).digest('hex');
};
