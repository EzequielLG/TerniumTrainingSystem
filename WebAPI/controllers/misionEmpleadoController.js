const { sql, poolPromise } = require('../database/db');

class MainController {
  async getMisionesEmpleados(req, res) {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query('exec SPLoadMisionesEmpleados');
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
  async getMisionesEmpleado(req, res) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input('idEmpleado', sql.Int, req.params.idEmpleado)
        .query('exec SPLoadMisionesEmpleado @id_empleado = @idEmpleado');
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
  async getMisionEmpleado(req, res) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input('idMision', sql.Int, req.params.idMision)
        .input('idEmpleado', sql.Int, req.params.idEmpleado)
        .query(
          'exec SPLoadMisionEmpleado @id_mision = @idMision, @id_empleado = @idEmpleado'
        );
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
  async addMisionEmpleado(req, res) {
    try {
      if (req.body.idMision != null && req.body.idUsuario != null) {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input('idMision', sql.Int, req.body.idMision)
          .input('idUsuario', sql.Int, req.body.idUsuario)
          .query(
            'exec SPAddMisionEmpleado @id_mision = @idMision, @id_empleado = @idUsuario'
          );
        res.json(result);
      } else {
        res.send('Por favor, llena todos los datos');
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
  async updateMisionEmpleado(req, res) {
    try {
      if (
        req.params.idMision != null &&
        req.params.idEmpleado != null &&
        req.body.fechaCurso
      ) {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input('idMision', sql.Int, req.params.idMision)
          .input('idEmpleado', sql.Int, req.params.idEmpleado)
          .input('fechaCurso', sql.Date, req.body.fechaCurso)
          .query(
            'exec SPUpdateMisionEmpleado @id_mision = @idMision, @id_empleado = @idEmpleado, @fecha_curso = @fechaCurso'
          );
        res.json(result);
      } else {
        res.send('Todos los campos son obligatorios');
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
  async deleteMisionEmpleado(req, res) {
    try {
      if (req.params.idMision != null && req.params.idEmpleado != null) {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input('idMision', sql.Int, req.params.idMision)
          .input('idEmpleado', sql.Int, req.params.idEmpleado)
          .query(
            'exec SPDeleteMisionEmpleado @id_mision = @idMision, @id_empleado = @idEmpleado'
          );
        res.json(result);
      } else {
        res.send('¡Agrega el id de la misión y del empleado!');
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

  async getMisionesEmpleadoPorMes(req, res) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .query(
          'SELECT COUNT(*) AS Misiones, MONTH(fechaCurso) AS Mes, YEAR(fechaCurso) AS Año FROM MisionEmpleado GROUP BY MONTH(fechaCurso), YEAR(fechaCurso)'
        );
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

  async getMisionesCompletadas(req, res) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .query(
          'SELECT COUNT(*) AS vecesCompletadas, idMision FROM MisionEmpleado GROUP BY idMision'
        );
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
}

const misionEmpleadoController = new MainController();
module.exports = misionEmpleadoController;
