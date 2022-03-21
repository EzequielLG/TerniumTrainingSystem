const LocalStrategy = require('passport-local').Strategy;
const axios = require('axios');

function initPassport(passport) {
  const authenticateUser = async (username, password, done) => {
    try {
      const resp = await axios.get('http://localhost:4000/api/getUsuarios');

      const users = resp.data;
      const user = users.find((usuario) => {
        return usuario.username == username;
      });

      if (user == null) {
        return done(null, false, { message: 'Usuario no encontrado' });
      } else {
        if (user.password == password) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Password incorrecto' });
        }
      }
    } catch (err) {
      console.log(err);
      return done(err);
    }
  };

  const getUserById = async (id, done) => {
    try {
      const resp = await axios.get(
        `http://localhost:4000/api/getUsuario/${id}`
      );
      const user = resp.data[0];

      if (user == null) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    } catch (err) {
      console.log(err);
      return done(err);
    }
  };

  passport.use(
    new LocalStrategy({ usernameField: 'username' }, authenticateUser)
  );
  passport.serializeUser((user, done) => {
    done(null, user.idUsuario);
  });
  passport.deserializeUser((id, done) => {
    getUserById(id, done);
  });
}

module.exports = initPassport;
