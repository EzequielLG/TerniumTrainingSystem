const { sql,poolPromise } = require('../database/db')

class MainController {

  async getMisiones(req, res){
    try {
        const pool = await poolPromise
        const result = await pool.request()
        .query("exec SPLoadMisiones")
        res.json(result.recordset)
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }
  async getMision(req , res){
    try {
        const pool = await poolPromise
        const result = await pool.request()
        .input('idMision',sql.Int, req.params.idMision)
        .query("exec SPLoadMision @id_mision = @idMision")
        res.json(result.recordset)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
  }
  async addMision(req , res){
    try {
      if(req.body.nombre != null && req.body.habilidad != null && req.body.dificultad != null && req.body.puntos != null && req.body.numero) {
        const pool = await poolPromise
        const result = await pool.request()
        .input('nombre_',sql.VarChar, req.body.nombre)
        .input('habilidad_',sql.VarChar, req.body.habilidad)
        .input('dificultad_',sql.Int, req.body.dificultad)
        .input('puntos_',sql.Int, req.body.puntos)
        .input('numero_',sql.Int, req.body.numero)
        .query("exec SPAddMision @nombre = @nombre_, @habilidad = @habilidad_, @dificultad = @dificultad_, @puntos = @puntos_, @numero = @numero_")
        res.json(result)
      } else {
        res.send('Por favor, llena todos los datos')
      }
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }
  async updateMision(req, res){
    try {
      if(req.body.nombre != null && req.body.habilidad != null && req.body.dificultad != null && req.body.puntos != null && req.body.numero) {
        const pool = await poolPromise
        const result = await pool.request()
        .input('idMision',sql.Int, req.params.idMision)
        .input('nombreN_',sql.VarChar, req.body.nombre)
        .input('habilidadN_',sql.VarChar, req.body.habilidad)
        .input('dificultadN_',sql.Int, req.body.dificultad)
        .input('puntosN_',sql.Int, req.body.puntos)
        .input('numeroN_',sql.Int, req.body.numero)
        .query("exec SPUpdateMision @id_mision = @idMision, @nombre = @nombreN_, @habilidad = @habilidadN_, @dificultad = @dificultadN_, @puntos = @puntosN_, @numero = @numeroN_")
        res.json(result)
      } else {
        res.send('Todos los campos son obligatorios')
      }
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }
  async deleteMision(req , res){
    try {
      if(req.params.idMision != null) {
        const pool = await poolPromise
          const result = await pool.request()
          .input('idMision',sql.Int, req.params.idMision)
          .query("exec SPDeleteMision @id_mision = @idMision")
          res.json(result)
        } else {
          res.send('¡Agrega el id de la misión!')
        }
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }
}

const misionController = new MainController()
module.exports = misionController;