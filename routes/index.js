//routes/index.js
var express = require('express');
var router = express.Router();

// Import controllers
const sessionController = require('../controllers/session_controller');
const userController = require('../controllers/user_controller');
const roomController = require('../controllers/room_controller');
const boothController = require('../controllers/booth_controller');
const rolesController = require('../controllers/roles_controller');
const languageController = require('../controllers/language_controller');
const likesController = require('../controllers/likes_controller');
const timeslotController = require('../controllers/timeslot_controller');

//-----------------------------------------------------------
// Autologout
router.all('*', sessionController.deleteExpiredUserSession);

//-----------------------------------------------------------

/* History (user's browsing history)
*  When accessing 'goBack' you are redirected to the previous url stored in the session.
*  Saves the current URL in the session before handling GET requests on paths that do not end in "/new", "/edit", "/play", "/check", "/session", or "/:id".
*  This facilitates the implementation of a custom "back" button, allowing the user to return to the previous page. 
*/
function redirectBack(req, res, next) {

  var url = req.session.backURL || "/";
  delete req.session.backURL;
  res.redirect(url);
}

router.get('/goback', redirectBack);

// GET routes that do not end in /new, /edit, /play, /check, /session, or /:id.
router.get(/(?!\/new$|\/edit$|\/play$|\/check$|\/session$|\/(\d+)$)\/[^\/]*$/, function (req, res, next) {

  req.session.backURL = req.url;
  next();
});

//-----------------------------------------------------------

// Login routes
// router.get('/session', sessionController.new);        // Login form
// router.post('/session', sessionController.create);    // Crteate session
// router.delete('/session', sessionController.destroy); // Destroy session

//-----------------------------------------------------------

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});


// Routes for the resource /users ---------------------------------------

// Autoload
router.param('userId',
  userController.load);

// GET all: List of users
router.get('/users',
  //sessionController.loginRequired,
  userController.index);

// SHOW User
router.get('/users/:userId(\\d+)',
  //sessionController.loginRequired,
  userController.show);

// CREATE New User (Sign up form)
router.get('/users/new',
  userController.new);

// POST: Register User (after new)
router.post('/users',
  userController.create);

// Edit User
router.get('/users/:userId(\\d+)/edit',
  //sessionController.loginRequired,
  //sessionController.adminOrMyselfRequired,
  userController.edit);

// Update User (after edit)
router.put('/users/:userId(\\d+)',
  userController.update);

// Delete User Confirmation
router.get('/users/:userId(\\d+)/delete',
  userController.showDeleteConfirmation);

// Delete User
router.delete('/users/:userId(\\d+)',
  userController.destroy);



// Routes for the resource /roles ---------------------------------------

router.get('/users/consultants',
  rolesController.getConsultants);

router.get('/users/coordinators',
  rolesController.getCoordinators);

router.get('/users/interpreters',
  rolesController.getInterpreters);

router.get('/users/operators',
  rolesController.getOperators);

router.get('/users/technicians',
  rolesController.getTechnicians);

router.get('/users/:userId(\\d+)/profile',
  rolesController.profile);

router.get('/users/:userId(\\d+)/editProfile',
  rolesController.editProfile);

router.put('/users/:userId(\\d+)/profile',
  rolesController.updateProfile);



// Routes for the resource /language ---------------------------------------

// GET all: List of languages
router.get('/languages',
  languageController.index);

// CREATE New Language (Sign up form)
router.get('/languages/new',
  languageController.newLanguage);

// POST: Register Language (after new)
router.post('/languages',
  languageController.createLanguage);

// CREATE New Interpreter Language (Sign up form)
router.get('/users/:userId(\\d+)/profile/newInterpreterLanguage',
  languageController.newInterpreterLanguage);

// POST: Register Interreter Language (after new)
router.post('/users/:userId(\\d+)/profile',
  languageController.createInterpreterLanguage);

// Delete Languageknown
router.post('/users/:userId/languages/:languageId/delete',
  languageController.destroyLanguageKnown);



// Routes for the resource /rooms ---------------------------------------

// Autoload
router.param('roomId',
  roomController.load);

// GET all: List of rooms
router.get('/rooms',
  roomController.index);

// SHOW User
router.get('/rooms/:roomId(\\d+)',
  roomController.show);

// CREATE New Room (Sign up form)
router.get('/rooms/new',
  roomController.new);

// POST: Register Room (after new)
router.post('/rooms',
  roomController.create);

// Edit Room
router.get('/rooms/:roomId(\\d+)/edit',
  roomController.edit);

// Update Room (after edit)
router.put('/rooms/:roomId(\\d+)',
  roomController.update);

// Delete Room Confirmation
router.get('/rooms/:roomId(\\d+)/delete',
  roomController.showDeleteConfirmation);

// Delete Room
router.delete('/rooms/:roomId(\\d+)',
  roomController.destroy);


// Select Consultant
router.get('/rooms/:roomId(\\d+)/selectConsultant',
  roomController.selectConsultant);

// Update Consultant (after select)
router.put('/rooms/:roomId(\\d+)/selectConsultant',
  roomController.updateConsultant);

// Select Coordinator
router.get('/rooms/:roomId(\\d+)/selectCoordinator',
  roomController.selectCoordinator);

// Update Coordinator (after select)
router.put('/rooms/:roomId(\\d+)/selectCoordinator',
  roomController.updateCoordinator);

// Select Operator
router.get('/rooms/:roomId(\\d+)/selectOperator',
  roomController.selectOperator);

// Update Operator (after select)
router.put('/rooms/:roomId(\\d+)/selectOperator',
  roomController.updateOperator);

// Select Technician
router.get('/rooms/:roomId(\\d+)/selectTechnician',
  roomController.selectTechnician);

// Update Technician (after select)
router.put('/rooms/:roomId(\\d+)/selectTechnician',
  roomController.updateTechnician);



// Routes for the resource /booths ---------------------------------------

// Autoload
router.param('boothId',
  boothController.load);

// CREATE New Booth (Sign up form)
router.get('/rooms/:roomId(\\d+)/booths/new',
  boothController.new);

// POST: Register Booth (after new)
router.post('/rooms/:roomId(\\d+)/booths',
  boothController.create);

// Edit Booth
router.get('/rooms/:roomId(\\d+)/booths/:boothId(\\d+)/edit',
  boothController.edit);

// Update Booth (after edit)
router.put('/rooms/:roomId(\\d+)/booths/:boothId(\\d+)',
  boothController.update);

// Delete Booth Confirmation
router.get('/rooms/:roomId(\\d+)/booths/:boothId(\\d+)/delete',
  boothController.showDeleteConfirmation);

// Delete Booth
router.delete('/rooms/:roomId(\\d+)/booths/:boothId(\\d+)',
  boothController.destroy);


// Select Interpreter
router.get('/rooms/:roomId(\\d+)/booths/:boothId(\\d+)/selectInterpreter',
  boothController.selectBoothInterpreter);

// Update Interpreter (after select)
router.put('/rooms/:roomId(\\d+)/booths/:boothId(\\d+)/selectInterpreter',
  boothController.updateBoothInterpreter);

// Delete Interpreter of the Booth
router.delete('/rooms/:roomId(\\d+)/booths/:boothId(\\d+)/selectInterpreter',
  boothController.deleteBoothInterpreter);



// Routes for the resource /likes ---------------------------------------

// List of Likes
router.get('/rooms/:roomId(\\d+)/votes',
  likesController.getLikes);

// Edit Likes
router.get('/rooms/:roomId(\\d+)/votes/edit',
  likesController.editLikes);

// Update Likes (after edit)
router.put('/rooms/:roomId(\\d+)/votes',
  likesController.updateLikes);



// Routes for the resource /timeslots ---------------------------------------

// Edit Timeslots
router.get('/users/:userId(\\d+)/manageSchedule',
  timeslotController.editTimeslots);

// Update Timeslots (after edit)
router.put('/users/:userId(\\d+)/manageScheduleOK',
  timeslotController.updateTimeslots);

module.exports = router;