const { sql,poolPromise } = require('../database/db')

class MainController {

  async getMaterialesSemaforo(req, res){
    try {
        const pool = await poolPromise
        const result = await pool.request()
        .query("exec SPLoadMaterialesSemaforo")
        res.json(result.recordset)
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }
  async getMaterialSemaforo(req , res){
    try {
        const pool = await poolPromise
        const result = await pool.request()
        .input('idMaterialSemaforo',sql.Int, req.params.idMaterialSemaforo)
        .query("exec SPLoadMaterialSemaforo @id_materialSemaforo = @idMaterialSemaforo")
        res.json(result.recordset)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
  }
  async addMaterialSemaforo(req , res){
    try {
      if(req.body.descripcion != null && req.body.color) {
        const pool = await poolPromise
        const result = await pool.request()
        .input('descripcion_',sql.VarChar, req.body.descripcion)
        .input('color_',sql.VarChar, req.body.color)
        .query("exec SPAddMaterialSemaforo @descripcion = @descripcion_, @color = @color_")
        res.json(result)
      } else {
        res.send('Por favor, llena todos los datos')
      }
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }
  async updateMaterialSemaforo(req, res){
    try {
      if(req.body.descripcion != null && req.body.color) {
        const pool = await poolPromise
        const result = await pool.request()
        .input('idMaterialSemaforo',sql.Int, req.params.idMaterialSemaforo)
        .input('descripcion_',sql.VarChar, req.body.descripcion)
        .input('color_',sql.VarChar, req.body.color)
        .query("exec SPUpdateMaterialSemaforo @id_materialSemaforo = @idMaterialSemaforo, @descripcion = @descripcion_, @color = @color_")
        res.json(result)
      } else {
        res.send('Todos los campos son obligatorios')
      }
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }
  async deleteMaterialSemaforo(req , res){
    try {
      if(req.params.idMaterialSemaforo != null) {
        const pool = await poolPromise
          const result = await pool.request()
          .input('idMaterialSemaforo',sql.Int, req.params.idMaterialSemaforo)
          .query("exec SPDeleteMaterialSemaforo @id_materialSemaforo = @idMaterialSemaforo")
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

const materialSemaforoController = new MainController()
module.exports = materialSemaforoController;