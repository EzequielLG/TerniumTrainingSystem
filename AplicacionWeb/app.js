const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;

const axios = require('axios');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');

const initPassport = require('./passport-config');

//Static files
app.use(express.static(__dirname + '/public'));

//Body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Template engine
app.set('views', './src/views');
app.set('view engine', 'ejs');

//Passport
initPassport(passport);
app.use(flash());
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

//Routes
app.get('/', validaAutentificacion, (req, res) => {
  if (req.user.tipoUsuario == 1) {
    res.redirect('/admin');
  } else {
    res.redirect('/user');
  }
});

const loginRouter = require('./src/routes/login');
app.use('/login', validaNoAutentificacion, loginRouter);

app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  })
);

app.delete('/logout', (req, res) => {
  req.logOut();
  res.redirect('/login');
});

function validaAutentificacion(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

function validaNoAutentificacion(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/');
  }
  return next();
}

const adminRouter = require('./src/routes/admin');
app.use('/admin', validaAutentificacion, adminRouter);

const userRouter = require('./src/routes/user');
app.use('/user', validaAutentificacion, userRouter);

//Puerto
app.listen(port, () => console.log('Escuchando al puerto 8080'));
