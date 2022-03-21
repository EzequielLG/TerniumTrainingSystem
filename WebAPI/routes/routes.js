const express = require('express');

const usuarioController = require('../controllers/UsuarioController');
const logroController = require('../controllers/LogroController');
const tipoUsuarioController = require('../controllers/tipoUsuarioController');

const misionController = require('../controllers/misionController');
const misionEmpleadoController = require('../controllers/misionEmpleadoController');
const logroEmpleadoController = require('../controllers/logroEmpleadoController');
const materialSemaforoController = require('../controllers/materialSemaforoController');

const LogoQuizController = require('../controllers/LogoQuizController');
const PreguntaRespuestaController = require('../controllers/PreguntaRespuestaController');

const router = express.Router();

//rutas de usuario
router.get('/api/getUsuario/:id', usuarioController.getUsuario);
router.get('/api/getUsuarioJuego/:id', usuarioController.getUsuarioJuego);
router.get('/api/getUsuarios/', usuarioController.getUsuarios);
router.post('/api/addUsuario', usuarioController.addUsuario);
router.put('/api/updateUsuario/:id', usuarioController.updateUsuario);
router.put('/api/updateUsuarioAdmin/:id', usuarioController.updateUsuarioAdmin);
router.delete('/api/deleteUsuario/:id', usuarioController.deleteUsuario);
router.get('/api/getUsuariosAdmin/:id', usuarioController.getUsuariosAdmin);
router.get('/api/getPuntosLogros', usuarioController.getPuntosLogros);
router.get('/api/getPuntosMisiones', usuarioController.getPuntosMisiones);

//rutas de logro
router.get('/api/getLogro/:id', logroController.getLogro);
router.get('/api/getLogros/', logroController.getLogros);
router.post('/api/addLogro', logroController.addLogro);
router.delete('/api/deleteLogro/:id', logroController.deleteLogro);

//rutas de TipoUsuario
router.get('/api/getTipoUsuario/:id', tipoUsuarioController.getTipoUsuario);
router.get('/api/getTiposUsuario/', tipoUsuarioController.getTiposUsuario);
router.post('/api/addTipoUsuario', tipoUsuarioController.addTipoUsuario);

//rutas de Mision
router.get('/api/getMisiones', misionController.getMisiones);
router.get('/api/getMision/:idMision', misionController.getMision);
router.post('/api/addMision', misionController.addMision);
router.put('/api/updateMision/:idMision', misionController.updateMision);
router.delete('/api/deleteMision/:idMision', misionController.deleteMision);

//rutas de Material Semáforo
router.get(
  '/api/getMaterialesSemaforo',
  materialSemaforoController.getMaterialesSemaforo
);
router.get(
  '/api/getMaterialSemaforo/:idMaterialSemaforo',
  materialSemaforoController.getMaterialSemaforo
);
router.post(
  '/api/addMaterialSemaforo',
  materialSemaforoController.addMaterialSemaforo
);
router.put(
  '/api/updateMaterialSemaforo/:idMaterialSemaforo',
  materialSemaforoController.updateMaterialSemaforo
);
router.delete(
  '/api/deleteMaterialSemaforo/:idMaterialSemaforo',
  materialSemaforoController.deleteMaterialSemaforo
);

//rutas de Mision Empleado
router.get(
  '/api/getMisionesEmpleados',
  misionEmpleadoController.getMisionesEmpleados
);
router.get(
  '/api/getMisionesEmpleado/:idEmpleado',
  misionEmpleadoController.getMisionesEmpleado
);
router.get(
  '/api/getMisionEmpleado/:idMision/:idEmpleado',
  misionEmpleadoController.getMisionEmpleado
);
router.get(
  '/api/getMisionesEmpleadoPorMes',
  misionEmpleadoController.getMisionesEmpleadoPorMes
);
router.get(
  '/api/getMisionesCompletadas',
  misionEmpleadoController.getMisionesCompletadas
);
router.post(
  '/api/addMisionEmpleado',
  misionEmpleadoController.addMisionEmpleado
);
router.put(
  '/api/addMisionEmpleado',
  misionEmpleadoController.addMisionEmpleado
);
router.put(
  '/api/updateMisionEmpleado/:idMision/:idEmpleado',
  misionEmpleadoController.updateMisionEmpleado
);
router.delete(
  '/api/deleteMisionEmpleado/:idMision/:idEmpleado',
  misionEmpleadoController.deleteMisionEmpleado
);

//rutas de Logro Empleado
router.get(
  '/api/getLogrosEmpleados',
  logroEmpleadoController.getLogrosEmpleados
);
router.get(
  '/api/getLogrosEmpleado/:idEmpleado',
  logroEmpleadoController.getLogrosEmpleado
);
router.get(
  '/api/getLogroEmpleado/:idLogro/:idEmpleado',
  logroEmpleadoController.getLogroEmpleado
);
router.post('/api/addLogroEmpleado', logroEmpleadoController.addLogroEmpleado);
router.put(
  '/api/updateLogroEmpleado/:idLogro/:idEmpleado',
  logroEmpleadoController.updateLogroEmpleado
);
router.delete(
  '/api/deleteLogroEmpleado/:idLogro/:idEmpleado',
  logroEmpleadoController.deleteLogroEmpleado
);

// rutas LogroQuiz
router.get('/api/getLogosQuiz', LogoQuizController.getLogosQuiz);

// rutas PreguntaRespuesta
router.get(
  '/api/getPreguntaRespuesta',
  PreguntaRespuestaController.getPreguntaRespuesta
);

router.get(
  '/api/getAllPreguntaRespuesta',
  PreguntaRespuestaController.getAllPreguntaRespuesta
);

router.get('/api/getPregunta/:id', PreguntaRespuestaController.getPregunta);

router.post('/api/agregarPregunta', PreguntaRespuestaController.addPregunta);

router.put(
  '/api/modificarPregunta/:id',
  PreguntaRespuestaController.updatePregunta
);

router.delete(
  '/api/deletePregunta/:id',
  PreguntaRespuestaController.deletePregunta
);

module.exports = router;
