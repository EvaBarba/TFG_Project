// controllers/session_controller.js

var models = require('../models');
var Sequelize = require('sequelize');
var url = require('url');

// Maximum time variable (1h in milliseconds)
const maxIdleTime = 60 * 60 * 1000;


// MWiddleware: destroy the user's session if the inactivity time has time of inactivity has been exceeded.
exports.deleteExpiredUserSession = function (req, res, next) {

    if (req.session.user) {                                        // Login exists:
        if (req.session.user.expires < Date.now()) {              // time has been exceeded
            delete req.session.user;                                // logout
            req.flash('info', 'Session has expired.');
        } else {                                                    // Not expired:
            req.session.user.expires = Date.now() + maxIdleTime;    // reset expiration time
        }
    }

    next();                                                         // Continue
};


/* Middleware: Login is required.
* If the user has already logged in, the req object will exist --> continue with the other middlewares or routes.
* If req.session.user doesn't exist, the user didn't logged in --> redirection to login screen
*
* I save in redir what is my url to return automatically to that url after login; if redir alredy exists, I keep its value
*/
exports.loginRequired = function (req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/session?redir=' + (req.param('redir') || req.url));
    }
};


// MW: allows only if the logged in user is admin.
exports.adminRequired = function (req, res, next) {

    var isAdmin = req.session.user.isAdmin;

    if (isAdmin) {
        next();
    } else {
        console.log('Forbidden path: the logged-in user is not an administrator.');
        res.send(403);
    }
};


/*
 * Authenticate a user: Checks if the user is registered in users
 *
 * Returns a Promise that looks for the user with the given login and checks his password:
 *  - If the authentication is successful, the promise is satisfied and returns an object with the User.
 *  - If the authentication fails, the promise is satisfied but returns null.
 */
var authenticate = function (email, password) {

    return models.User.findOne({ where: { email: email } })
        .then(function (user) {
            if (user && user.verifyPassword(password)) {
                return user;
            } else {
                return null;
            }
        });
};



// GET /session   -- Login form
exports.new = function (req, res, next) {

    // Where I will go after logging in:
    var redir = req.query.redir || url.parse(req.headers.referer || "/").path;

    // Do not come back here (the login form).
    if (redir === '/session') {
        redir = "/";
    }

    res.render('session/new');
};


// POST /session   -- Create session if user is authenticated successfully
exports.create = async (req, res, next) => {

    const email = req.body.email ?? "";
    const password = req.body.password ?? "";

    try {
        const user = await authenticate(email, password);
        if (user) {
            console.log('Info: Authentication successful');
            // Create req.session.user and keep different fields.
            // The session is defined by the existence of: req.session.user.
            // Also save the session expiration time for no activity.
            req.session.loginuser = {
                id: user.id,
                email: user.email,
                isAdmin: !!user.admin?.id,
                isConsultant: !!user.consultant?.id,
                isCoordinator: !!user.coordinator?.id,
                isOperator: !!user.operator?.id,
                isTechnician: !!user.technician?.id,
                isInterpreter: !!user.interpreter?.id,
                expires: Date.now() + maxIdleTime       
            };

            res.redirect("/");                        // Redirect
        } else {
            req.flash('error', 'Authentication has failed. Please retry again.');

            res.render('session/new');

        }
    }
    catch (error) {
        req.flash('error', 'An error has occurred: ' + error);
        next(error);
    };
};


// DELETE /session   -- Destroy session
exports.destroy = function (req, res, next) {

    delete req.session.user;

    res.redirect("/session"); // redirect to login
};