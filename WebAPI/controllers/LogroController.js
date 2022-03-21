//import express from 'express'

const { sql,poolPromise } = require('../database/db')

class MainController {

    async getLogro(req , res){
        try {
            const pool = await poolPromise
            const result = await pool.request()
            .input('id',sql.Int, req.params.id)
            .query("select * from [dbo].[Logro] where idLogro = @id")
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
    async addLogro(req , res){
      try {
        if(req.body.idLogro != null && req.body.nombre != null && req.body.descripcion != null  && req.body.puntos != null) {
          const pool = await poolPromise
          const result = await pool.request()
          .input('idLogro',sql.Int, req.body.idLogro)
          .input('nombre',sql.VarChar, req.body.nombre)
          .input('descripcion',sql.VarChar, req.body.descripcion)
          .input('puntos',sql.Int, req.body.puntos)


          .query("insert into [dbo].[Logro] (nombre, descripcion, puntos) values(@nombre, @descripcion, @puntos)")
          res.json(result)
        } else {
          res.send('Por favor llena todos los datos!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }

    async deleteLogro(req , res){
      try {
        if(req.params.id != null ) {
          const pool = await poolPromise
            const result = await pool.request()
            .input('idLogro',sql.Int, req.params.id)
            .query("delete from [dbo].[Logro] where idLogro = @idLogro")
            res.json(result)
          } else {
            res.send('Agrega el id del logro!')
          }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async getLogros(req , res){
      try {
        const pool = await poolPromise
          const result = await pool.request()
          .query("select * from [dbo].[Logro]")
          res.json(result.recordset)
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
}

const LogroController = new MainController()
module.exports = LogroController;