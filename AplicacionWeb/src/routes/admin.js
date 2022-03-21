const express = require('express');
const adminRouter = express.Router();
const axios = require('axios');

// GETS

adminRouter.get('', async (req, res) => {
  const adminId = req.user.idUsuario;

  try {
    const webAPI = await axios.get(
      `http://localhost:4000/api/getUsuariosAdmin/${adminId}`
    );

    res.render('admin/admin', { users: webAPI.data, user: req.user });
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

adminRouter.get('/registrarUsuario', async (req, res) => {
  res.render('admin/registrarUsuario', { user: req.user });
});

adminRouter.get('/detallesUsuario/:id', async (req, res) => {
  const idUsuario = req.params.id;

  try {
    const webAPI = await axios.get(
      `http://localhost:4000/api/getUsuario/${idUsuario}`
    );

    const fecha = webAPI.data[0].ultimoLogin;

    let fechaFormateada;

    if (fecha) {
      fechaFormateada = new Date(fecha);
      webAPI.data[0].ultimoLogin = fechaFormateada.toLocaleString();
    } else {
      webAPI.data[0].ultimoLogin = 'No ha iniciado sesión';
    }

    res.render('admin/detallesUsuario', {
      userData: webAPI.data[0],
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

adminRouter.get('/modificarUsuario/:id', async (req, res) => {
  const idUsuario = req.params.id;

  try {
    const webAPI = await axios.get(
      `http://localhost:4000/api/getUsuario/${idUsuario}`
    );

    res.render('admin/modificarUsuario', {
      userData: webAPI.data[0],
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

adminRouter.get('/estadisticas', async (req, res) => {
  try {
    const webAPI = await axios.get(
      `http://localhost:4000/api/getMisionesEmpleadoPorMes`
    );

    const webAPI2 = await axios.get(
      `http://localhost:4000/api/getMisionesCompletadas`
    );

    const arrayData = webAPI.data;

    const dataMisiones = arrayData.slice(Math.max(arrayData.length - 6, 0));

    res.render('admin/estadisticas', {
      dataMisiones: dataMisiones,
      misionesCompletadas: webAPI2.data,
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

adminRouter.get('/ranking', async (req, res) => {
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

    res.render('admin/userRanking', {
      misPuntos: null,
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

adminRouter.get('/misiones', async (req, res) => {
  try {
    const webAPI = await axios.get(`http://localhost:4000/api/getMisiones`);

    res.render('admin/misiones', { misiones: webAPI.data, user: req.user });
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

adminRouter.get('/misiones/4', async (req, res) => {
  try {
    const webAPI = await axios.get(
      `http://localhost:4000/api/getAllPreguntaRespuesta`
    );

    res.render('admin/configuracion/preguntas', {
      preguntas: webAPI.data,
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

adminRouter.get('/modificarPregunta/:id', async (req, res) => {
  const idPregunta = req.params.id;

  try {
    const webAPI = await axios.get(
      `http://localhost:4000/api/getPregunta/${idPregunta}`
    );

    res.render('admin/configuracion/modificarPregunta', {
      pregunta: webAPI.data[0],
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

adminRouter.get('/agregarPregunta', async (req, res) => {
  res.render('admin/configuracion/agregarPregunta', {
    user: req.user,
  });
});

// POSTS

adminRouter.post('/modificarUsuario/:id', (req, res) => {
  const idUsuario = req.params.id;

  const formData = req.body;

  const usuarioModificado = {
    idUsuario: parseInt(idUsuario),
    username: formData.username,
    nombre: formData.nombre,
    apellidoPaterno: formData.apellidoP,
    apellidoMaterno: formData.apellidoM,
    password: formData.password,
    tipoUsuario: 2,
    puesto: formData.puesto,
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
      `http://localhost:4000/api/updateUsuarioAdmin/${idUsuario}`,
      usuarioModificadoJSON,
      axiosConfig
    )
    .then((response) => {
      console.log(response);
      res.redirect(`/admin/detallesUsuario/${idUsuario}`);
    })
    .catch((err) => {
      console.log(err);
    });
});

adminRouter.post('/registrarUsuario', (req, res) => {
  const formData = req.body;

  const nuevoUsuario = {
    idUsuario: 0,
    username: formData.username,
    nombre: formData.nombre,
    apellidoPaterno: formData.apellidoP,
    apellidoMaterno: formData.apellidoM,
    password: formData.password,
    tipoUsuario: formData.tipoUsuario,
    puesto: formData.puesto,
    idAdministrador: formData.tipoUsuario == 2 ? req.user.idUsuario : null,
  };

  const nuevoUsuarioJSON = JSON.stringify(nuevoUsuario);

  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  axios
    .post(`http://localhost:4000/api/addUsuario`, nuevoUsuarioJSON, axiosConfig)
    .then((response) => {
      console.log(response);
      res.redirect(`/admin`);
    })
    .catch((err) => {
      console.log(err);
    });
});

adminRouter.post('/modificarPregunta/:id', (req, res) => {
  const idPregunta = req.params.id;

  const formData = req.body;

  const preguntaModificada = {
    pregunta: formData.pregunta,
    correcta: formData.correcta,
    incorrectaUno: formData.incorrectaUno,
    incorrectaDos: formData.incorrectaDos,
  };

  const preguntaModificadaJSON = JSON.stringify(preguntaModificada);

  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  axios
    .put(
      `http://localhost:4000/api/modificarPregunta/${idPregunta}`,
      preguntaModificadaJSON,
      axiosConfig
    )
    .then((response) => {
      console.log(response);
      res.redirect(`/admin/misiones/4`);
    })
    .catch((err) => {
      console.log(err);
    });
});

adminRouter.post('/agregarPregunta', (req, res) => {
  const formData = req.body;

  const nuevaPregunta = {
    pregunta: formData.pregunta,
    correcta: formData.correcta,
    incorrectaUno: formData.incorrectaUno,
    incorrectaDos: formData.incorrectaDos,
  };

  const nuevaPreguntaJSON = JSON.stringify(nuevaPregunta);

  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  axios
    .post(
      `http://localhost:4000/api/agregarPregunta`,
      nuevaPreguntaJSON,
      axiosConfig
    )
    .then((response) => {
      console.log(response);
      res.redirect(`/admin/misiones/4`);
    })
    .catch((err) => {
      console.log(err);
    });
});

// DELETE

adminRouter.post('/deleteUsuario/:id', (req, res) => {
  const idUsuario = req.params.id;

  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  axios
    .delete(`http://localhost:4000/api/deleteUsuario/${idUsuario}`, axiosConfig)
    .then((response) => {
      console.log(response);
      res.redirect(`/admin`);
    })
    .catch((err) => {
      console.log(err);
    });
});

adminRouter.post('/deletePregunta/:id', (req, res) => {
  const idPregunta = req.params.id;

  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  axios
    .delete(
      `http://localhost:4000/api/deletePregunta/${idPregunta}`,
      axiosConfig
    )
    .then((response) => {
      console.log(response);
      res.redirect(`/admin/misiones/4`);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = adminRouter;
