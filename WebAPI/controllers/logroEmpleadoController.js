const { sql,poolPromise } = require('../database/db')

class MainController {

  async getLogrosEmpleados(req, res){
    try {
        const pool = await poolPromise
        const result = await pool.request()
        .query("exec SPLoadLogrosEmpleados")
        res.json(result.recordset)
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }
  async getLogrosEmpleado(req, res){
    try {
        const pool = await poolPromise
        const result = await pool.request()
        .input('idEmpleado',sql.Int, req.params.idEmpleado)
        .query("exec SPLoadLogrosEmpleado @id_empleado = @idEmpleado")
        res.json(result.recordset)
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }
  async getLogroEmpleado(req , res){
    try {
        const pool = await poolPromise
        const result = await pool.request()
        .input('idLogro',sql.Int, req.params.idLogro)
        .input('idEmpleado',sql.Int, req.params.idEmpleado)
        .query("exec SPLoadLogroEmpleado @id_logro = @idLogro, @id_empleado = @idEmpleado")
        res.json(result.recordset)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
  }
  async addLogroEmpleado(req , res){
    try {
      if(req.body.idLogro != null && req.body.idEmpleado != null && req.body.fechaObtencion) {
        const pool = await poolPromise
        const result = await pool.request()
        .input('idLogro',sql.Int, req.body.idLogro)
        .input('idEmpleado',sql.Int, req.body.idEmpleado)
        .input('fechaObtencion',sql.Date, req.body.fechaObtencion)
        .query("exec SPAddLogroEmpleado @id_logro = @idLogro, @id_empleado = @idEmpleado, @fecha_obtencion = @fechaObtencion")
        res.json(result)
      } else {
        res.send('Por favor, llena todos los datos')
      }
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }
  async updateLogroEmpleado(req, res){
    try {
      if(req.params.idLogro != null && req.params.idEmpleado != null && req.body.fechaObtencion) {
        const pool = await poolPromise
        const result = await pool.request()
        .input('idLogro',sql.Int, req.params.idLogro)
        .input('idEmpleado',sql.Int, req.params.idEmpleado)
        .input('fechaObtencion',sql.Date, req.body.fechaObtencion)
        .query("exec SPUpdateLogroEmpleado @id_logro = @idLogro, @id_empleado = @idEmpleado, @fecha_obtencion = @fechaObtencion")
        res.json(result)
      } else {
        res.send('Todos los campos son obligatorios')
      }
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }
  async deleteLogroEmpleado(req , res){
    try {
      if(req.params.idLogro != null && req.params.idEmpleado != null) {
        const pool = await poolPromise
          const result = await pool.request()
          .input('idLogro',sql.Int, req.params.idLogro)
          .input('idEmpleado',sql.Int, req.params.idEmpleado)
          .query("exec SPDeleteLogroEmpleado @id_logro = @idLogro, @id_empleado = @idEmpleado")
          res.json(result)
        } else {
          res.send('¡Agrega el id del logro y del empleado!')
        }
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }
}

const logroEmpleadoController = new MainController()
module.exports = logroEmpleadoController;