const express = require('express');
const userRouter = express.Router();
const axios = require('axios');

// GETS

userRouter.get('', (req, res) => {
  res.render('user/user', { user: req.user });
});

userRouter.get('/jugar', (req, res) => {
  res.render('user/userPlay', { user: req.user });
});

userRouter.get('/perfil', (req, res) => {
  res.render('user/userProfile', { user: req.user });
});

userRouter.get('/modificar', (req, res) => {
  res.render('user/userModificar', { user: req.user });
});

userRouter.get('/ranking', async (req, res) => {
  const idUsuario = req.user.idUsuario;

  try {
    const webAPI = await axios.get(
      `http://localhost:4000/api/getPuntosMisiones`
    );

    const webAPI2 = await axios.get(
      `http://localhost:4000/api/getPuntosLogros`
    );

    const puntosUsuarios = [];

    webAPI.data.map((usuario, index) => {
      let newPuntosUsuario = {
        puntosTotales: 0,
        idUsuario: 0,
        nombreCompleto: '',
        username: '',
      };

      newPuntosUsuario.puntosTotales = webAPI.data[index].puntosMision +=
        webAPI2.data[index].puntosLogros;
      newPuntosUsuario.idUsuario = webAPI.data[index].idUsuario;
      newPuntosUsuario.nombreCompleto =
        webAPI2.data[index].nombre +
        ' ' +
        webAPI2.data[index].apellidoPaterno +
        ' ' +
        webAPI2.data[index].apellidoMaterno;
      newPuntosUsuario.username = webAPI2.data[index].username;
      puntosUsuarios.push(newPuntosUsuario);
    });

    let misPuntos = 0;

    const miObjeto = puntosUsuarios.find(
      (usuario) => usuario.idUsuario == idUsuario
    );

    if (miObjeto) {
      misPuntos = miObjeto.puntosTotales;
    } else {
      misPuntos = 0;
    }

    const puntosUsuariosSorted = puntosUsuarios.sort((a, b) => {
      let comparison = 0;
      if (a.puntosTotales > b.puntosTotales) {
        comparison = 1;
      } else if (a.puntosTotales < b.puntosTotales) {
        comparison = -1;
      }
      return comparison * -1;
    });

    console.log(puntosUsuariosSorted);

    res.render('user/userRanking', {
      misPuntos,
      puntosUsuariosSorted,
      user: req.user,
    });
  } catch (err) {
    if (err.response) {
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    } else if (err.requiest) {
      console.log(err.request);
    } else {
      console.error('Error', err.message);
    }
  }
});

userRouter.get('/misiones', async (req, res) => {
  const idUsuario = req.user.idUsuario;

  try {
    const webAPI = await axios.get(`http://localhost:4000/api/getMisiones`);

    const webAPI2 = await axios.get(
      `http://localhost:4000/api/getMisionesEmpleado/${idUsuario}`
    );

    const vecesCompletadas = [0, 0, 0, 0];

    webAPI2.data.forEach((misionCompletada) => {
      vecesCompletadas[misionCompletada.idMision - 1] =
        vecesCompletadas[misionCompletada.idMision - 1] + 1;
    });

    res.render('user/userMissions', {
      misiones: webAPI.data,
      misionesEmpleado: vecesCompletadas,
      user: req.user,
    });
  } catch (err) {
    if (err.response) {
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    } else if (err.requiest) {
      console.log(err.request);
    } else {
      console.error('Error', err.message);
    }
  }
});

userRouter.get('/logros', async (req, res) => {
  const idUsuario = req.user.idUsuario;

  try {
    const webAPI = await axios.get(`http://localhost:4000/api/getLogros`);

    const webAPI2 = await axios.get(
      `http://localhost:4000/api/getLogrosEmpleado/${idUsuario}`
    );

    const logrosCompletados = [0, 0, 0, 0, 0, 0];

    webAPI2.data.forEach((logroCompletado) => {
      logrosCompletados[logroCompletado.idLogro - 1] = 1;
    });

    res.render('user/userAchievements', {
      logros: webAPI.data,
      logrosCompletados: logrosCompletados,
      user: req.user,
    });
  } catch (err) {
    if (err.response) {
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    } else if (err.requiest) {
      console.log(err.request);
    } else {
      console.error('Error', err.message);
    }
  }
});

// POSTS

userRouter.post('/modificarUsuario', async (req, res) => {
  const idUsuario = req.user.idUsuario;

  const formData = req.body;

  const usuarioModificado = {
    idUsuario: parseInt(idUsuario),
    username: formData.username,
    nombre: formData.nombre,
    apellidoPaterno: formData.apellidoP,
    apellidoMaterno: formData.apellidoM,
    password: formData.password,
    tipoUsuario: req.user.tipoUsuario,
    puesto: req.user.puesto,
    idAdminstrador: req.user.idUsuario,
  };

  const usuarioModificadoJSON = JSON.stringify(usuarioModificado);

  console.log(usuarioModificadoJSON);

  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  axios
    .put(
      `http://localhost:4000/api/updateUsuario/${idUsuario}`,
      usuarioModificadoJSON,
      axiosConfig
    )
    .then((response) => {
      console.log(response);
      res.redirect(`/user/perfil`);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = userRouter;
