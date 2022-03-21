const { sql, poolPromise } = require('../database/db');

class MainController {
  async getPreguntaRespuesta(req, res) {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query('exec SPLoadPreguntaRespuesta');
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

  async getAllPreguntaRespuesta(req, res) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .query('SELECT * FROM PreguntaRespuesta');
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

  async getPregunta(req, res) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input('idPregunta', sql.Int, req.params.id)
        .query(
          'SELECT * FROM PreguntaRespuesta WHERE idPreguntaRespuesta = @idPregunta'
        );
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

  async addPregunta(req, res) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input('pregunta', sql.VarChar, req.body.pregunta)
        .input('correcta', sql.VarChar, req.body.correcta)
        .input('incorrectaUno', sql.VarChar, req.body.incorrectaUno)
        .input('incorrectaDos', sql.VarChar, req.body.incorrectaDos)
        .query(
          'INSERT INTO PreguntaRespuesta VALUES(@pregunta, @correcta, @incorrectaUno, @incorrectaDos)'
        );
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

  async updatePregunta(req, res) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input('idPregunta', sql.Int, req.params.id)
        .input('pregunta', sql.VarChar, req.body.pregunta)
        .input('correcta', sql.VarChar, req.body.correcta)
        .input('incorrectaUno', sql.VarChar, req.body.incorrectaUno)
        .input('incorrectaDos', sql.VarChar, req.body.incorrectaDos)
        .query(
          'UPDATE PreguntaRespuesta SET pregunta = @pregunta, correcta = @correcta, incorrectaUno = @incorrectaUno, incorrectaDos = @incorrectaDos WHERE idPreguntaRespuesta = @idPregunta'
        );
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

  async deletePregunta(req, res) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input('idPregunta', sql.Int, req.params.id)
        .query(
          'DELETE FROM PreguntaRespuesta WHERE idPreguntaRespuesta = @idPregunta'
        );
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
}

const PreguntaRespuestaController = new MainController();
module.exports = PreguntaRespuestaController;
