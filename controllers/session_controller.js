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


// // MW que permite pasar solo si el usuario logeado es:
// //   - el usuario a gestionar.
// exports.myselfRequired = function (req, res, next) {

//     var isMyself = req.user.id === req.session.user.id;

//     if (isMyself) {
//         next();
//     } else {
//         console.log('Ruta prohibida: no es el usuario logeado.');
//         res.send(403);
//     }
// };


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





//Versión anterior al 29/02/2024

// // Middleware: Login requerido.
// exports.loginRequired = function (req, res, next) {
//     if (req.session.loginUser) {
//         next();
//     } else {
//         console.log("Info: Se requiere inicio de sesión: inicia sesión y vuelve a intentarlo.");
//         res.redirect('/login');
//     }
// };

// /* Middleware que permite pasar solo si el usuario conectado es:
//  *  - administrador
//  *  - o es el usuario a gestionar.
//  */
// exports.adminOrMyselfRequired = (req, res, next) => {
//     const isAdmin = !!req.session.loginUser?.isAdmin;
//     const isMyself = req.load.user.id === req.session.loginUser?.id;

//     if (isAdmin || isMyself) {
//         next();
//     } else {
//         console.log('Ruta prohibida: no es el usuario propietario ni un administrador.');
//         res.sendStatus(403);
//     }
// };

// /*
//  * Autenticación de usuario: Verifica que el usuario esté registrado.
//  *
//  * Busca un usuario con el correo electrónico dado y verifica que la contraseña sea correcta.
//  *  - Si la autenticación es correcta, devuelve el objeto de usuario.
//  *  - Si la autenticación falla, devuelve null.
//  */
// const authenticate = async (email, password) => {
//     const user = await models.user.findOne({ where: { email: email } });
//     return user?.verifyPassword(password) ? user : null;
// };

// // RUTA PARA AUTENTICACION (login)
// // GET /login -- Formulario de inicio de sesión
// exports.loginForm = (req, res, next) => {
//     res.render('session/login');
// };

// // RUTA PARA AUTENTICACION (login)
// // POST /login -- Create the session if the user authenticates successfully
// exports.create = async (req, res, next) => {
//     const email = req.body.email ?? "";
//     const password = req.body.password ?? "";

//     try {
//         const user = await authenticate(email, password);
//         if (user) {
//             console.log('Info: Authentication successful.');

//             // Crea req.session.loginUser y guarda los campos id y email.
//             // La existencia de req.session.loginUser indica que la sesión existe.
//             // También guardo el momento en que la sesión caducará debido a la inactividad.
//             req.session.loginUser = {
//                 id: user.id,
//                 email: user.email,
//                 isAdmin: user.isAdmin,
//                 expires: Date.now() + maxIdleTime,
//             };

//             res.redirect("/");
//         } else {
//             console.log('Error: Authentication has failed. Retry it again.');
//             res.render('session/login');
//         }
//     } catch (error) {
//         console.log('Error: An error has occurred: ' + error);
//         next(error);
//     }
// };

// // DELETE /login -- Cierra la sesión
// exports.destroy = (req, res, next) => {
//     delete req.session.loginUser;
//     res.redirect("/login"); // redirige a la página de inicio de sesión
// };

// // RUTA PARA REGISTRO (register)
// // GET /register -- Formulario de registro
// exports.registerForm = (req, res) => {
//     res.render('session/signUp');
// };

// // RUTA PARA REGISTRO (register)
// // POST /register -- Procesa el formulario de registro
// exports.register = async (req, res, next) => {
//     const email = req.body.email ?? "";
//     const password = req.body.password ?? "";

//     try {
//         // Crea un nuevo usuario en la base de datos
//         const newUser = await models.user.create({
//             email,
//             password,
//         });

//         console.log('Info: Registro exitoso.');

//         // Redirige a la página de inicio de sesión después del registro exitoso
//         res.render('session/signUp', { success: true, newUser: newUser });
//     } catch (error) {
//         // Si hay un error al crear el usuario, renderiza la vista con el mensaje de error
//         console.error('Error al registrar el usuario:', error);
//         res.render('session/signUp', { error: 'Error al registrar el usuario.' });
//     }
// };

// // Middleware: Eliminar sesiones de usuario caducadas.
// exports.deleteExpiredUserSession = (req, res, next) => {
//     const now = Date.now();

//     // Verifica si la sesión existe y si la marca de tiempo de caducidad ha pasado.
//     if (req.session && req.session.cookie && req.session.cookie.expires < now) {
//         console.log('Info: Sesión caducada. Eliminando sesión...');
//         delete req.session.loginUser;
//     }

//     next();
// };