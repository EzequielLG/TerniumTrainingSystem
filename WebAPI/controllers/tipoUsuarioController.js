//import express from 'express'

const { sql,poolPromise } = require('../database/db')

class MainController {

    async getTipoUsuario(req , res){
        try {
            const pool = await poolPromise
            const result = await pool.request()
            .input('id',sql.Int, req.params.id)
            .query("select * from [dbo].[TipoUsuario] where idTipoUsuario = @id")
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
    async addTipoUsuario(req , res){
      try {
        if(req.body.idTipoUsuario != null && req.body.tipoUsuario != null) {
          const pool = await poolPromise
          const result = await pool.request()
          .input('idTipoUsuario',sql.Int, req.body.idTipoUsuario)
          .input('tipoUsuario',sql.VarChar, req.body.tipoUsuario)


          .query("insert into [dbo].[TipoUsuario] (tipoUsuario) values(@tipoUsuario)")
          res.json(result)
        } else {
          res.send('Por favor llena todos los datos!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }

    async getTiposUsuario(req , res){
      try {
        const pool = await poolPromise
          const result = await pool.request()
          .query("select * from [dbo].[TipoUsuario]")
          res.json(result.recordset)
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
}

const tipoUsuarioController = new MainController()
module.exports = tipoUsuarioController;