// MODULE IMPORT
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const partials = require('express-partials');
const flash = require('connect-flash');
const session = require('express-session');
const MW_languages = require('./helpers/MW_languages');


// Importar el modelo de Sequelize
const db = require('./models');

// Creacion de la aplicacion express
const app = express();

// Middleware para definir los idiomas globales
app.use(MW_languages);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware configuration
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Configuration of the session to store it in Redis database
app.use(session({
  secret: '1234',
  resave: false,
  saveUninitialized: true
}));

// Configuración del middleware connect-flash
app.use(flash());

app.use((req, res, next) => {
  res.locals.error_msg = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});



app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(partials());

// Dynamic Helper:
app.use(function (req, res, next) {
  // To use req.loginUser in the views
  res.locals.loginUser = req.session.loginUser && {
    id: req.session.loginUser.id,
    email: req.session.loginUser.email,
    isAdmin: req.session.loginUser.isAdmin
  };

  next();
});

// Importar las rutas de tu aplicación
const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users'); // No necesario(?)

// Main routers
app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler------------
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Sincronizar modelos con la base de datos (esto creará las tablas si no existen)
db.sequelize.sync()
  .then(() => {
    console.log('La sincronización se completó correctamente.');
    // Si se quiere añadir código a ejecutar después de la sincronización
    // Puedes añadirlo aquí
  })
  .catch((error) => {
    console.error('Error al sincronizar el modelo con la base de datos:', error);
  });



module.exports = app;