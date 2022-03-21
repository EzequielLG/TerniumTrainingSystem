//import express from 'express'

const { sql, poolPromise } = require('../database/db');

class MainController {
  async getUsuario(req, res) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input('id', sql.Int, req.params.id)
        .query('select * from [dbo].[Usuario] where idUsuario = @id');
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
  async getUsuarioJuego(req, res) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input('id', sql.Int, req.params.id)
        .query('exec SPLoadUsuarioJuego @id_usuario = @id');
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
  async addUsuario(req, res) {
    try {
      if (
        req.body.idUsuario != null &&
        req.body.username != null &&
        req.body.nombre != null &&
        req.body.apellidoPaterno != null &&
        req.body.apellidoMaterno != null &&
        req.body.password != null &&
        req.body.tipoUsuario != null &&
        req.body.puesto != null
      ) {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input('idUsuario', sql.Int, req.body.idUsuario)
          .input('username', sql.VarChar, req.body.username)
          .input('nombre', sql.VarChar, req.body.nombre)
          .input('apellidoPaterno', sql.VarChar, req.body.apellidoPaterno)
          .input('apellidoMaterno', sql.VarChar, req.body.apellidoMaterno)
          .input('password', sql.VarChar, req.body.password)
          .input('tipoUsuario', sql.Int, req.body.tipoUsuario)
          .input('puesto', sql.VarChar, req.body.puesto)
          .input('idAdministrador', sql.Int, req.body.idAdministrador)

          .query(
            'insert into [dbo].[Usuario] (username, nombre, apellidoPaterno, apellidoMaterno, password, tipoUsuario, puesto, idAdministrador) values(@username, @nombre, @apellidoPaterno, @apellidoMaterno, @password, @tipoUsuario, @puesto, @idAdministrador)'
          );
        res.json(result);
      } else {
        res.send('Por favor llena todos los datos!');
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
  async updateUsuario(req, res) {
    try {
      if (
        req.body.idUsuario != null &&
        req.body.username != null &&
        req.body.password != null
      ) {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input('id', sql.Int, req.params.id)
          .input('newUsername', sql.VarChar, req.body.username)
          .input('newPassword', sql.VarChar, req.body.password)
          .query(
            'update [dbo].[Usuario] set username = @newUsername, password = @newPassword where idUsuario = @id'
          );
        res.json(result);
      } else {
        res.send('Todos los campos obligatorios!');
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

  async updateUsuarioAdmin(req, res) {
    try {
      if (req.body.idUsuario != null) {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input('id', sql.Int, req.params.id)
          .input('newUsername', sql.VarChar, req.body.username)
          .input('newPassword', sql.VarChar, req.body.password)
          .input('newNombre', sql.VarChar, req.body.nombre)
          .input('newApellidoPaterno', sql.VarChar, req.body.apellidoPaterno)
          .input('newApellidoMaterno', sql.VarChar, req.body.apellidoMaterno)
          .input('newPuesto', sql.VarChar, req.body.puesto)
          .query(
            'update [dbo].[Usuario] set username = @newUsername, password = @newPassword, nombre = @newNombre, apellidoPaterno = @newApellidoPaterno, apellidoMaterno = @newApellidoMaterno, puesto = @newPuesto  where idUsuario = @id'
          );
        res.json(result);
      } else {
        res.send('Todos los campos obligatorios!');
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

  async deleteUsuario(req, res) {
    try {
      if (req.params.id != null) {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input('idUsuario', sql.Int, req.params.id)
          .query('delete from [dbo].[Usuario] where idUsuario = @idUsuario');
        res.json(result);
      } else {
        res.send('Agrega el id del usuario!');
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

  async getUsuarios(req, res) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .query('select * from [dbo].[Usuario]');
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

  async getUsuariosAdmin(req, res) {
    try {
      if (req.params.id != null) {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input('idAdministrador', sql.Int, req.params.id)
          .query(
            'select * from [dbo].[Usuario] where idAdministrador = @idAdministrador'
          );
        res.json(result.recordset);
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

  async getPuntosLogros(req, res) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .query(
          'SELECT COALESCE(SUM(puntos), 0) AS puntosLogros, U.idUsuario, U.nombre, U.apellidoPaterno, U.apellidoMaterno, U.username FROM Usuario U LEFT JOIN LogroEMpleado LE ON LE.idUsuario = U.idUsuario LEFT JOIN Logro L ON L.idLogro = LE.idLogro WHERE U.tipoUsuario = 2 GROUP BY U.idUsuario, U.nombre, U.apellidoPaterno, U.apellidoMaterno, U.username ORDER BY idUsuario ASC'
        );
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

  async getPuntosMisiones(req, res) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .query(
          'SELECT COALESCE(SUM(puntos), 0) AS puntosMision, U.idUsuario FROM Usuario U LEFT JOIN MisionEmpleado ME ON ME.idUsuario = U.idUsuario LEFT JOIN Mision M ON M.idMision = ME.idMision WHERE U.tipoUsuario = 2  GROUP BY U.idUsuario ORDER BY idUsuario ASC'
        );
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
}

const UsuarioController = new MainController();
module.exports = UsuarioController;
