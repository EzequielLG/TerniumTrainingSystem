const { sql,poolPromise } = require('../database/db')

class MainController {

    async getLogosQuiz(req , res){
        try {
          const pool = await poolPromise
            const result = await pool.request()
            .query("exec SPLoadLogosQuiz")
            res.json(result.recordset)
        } catch (error) {
          res.status(500)
          res.send(error.message)
        }
      }
    
    }

    const LogoQuizController = new MainController()
module.exports = LogoQuizController;