import { Router } from "express";
import { pool } from "../db.js";


const router = Router()

router.get('/artigos', async (req,res) => {
    const { rows } = await pool.query('SELECT * FROM artigos')
    res.json(rows)
})

router.get('/artigos/:id', async (req,res) => {
    const { id } = req.params
    const { rows } = await pool.query('SELECT * FROM artigos WHERE id = $1', [id])
    if(rows.length === 0){
        res.status(404).json({message:"Não existe artigo com este indice"})
    }
    res.json(rows[0])
})

router.post('/artigos', async (req,res) => {
  try {
    const dados = req.body
    const rows = await pool.query(
     'INSERT INTO artigos (titulo, conteudo, autor) VALUES ($1, $2, $3) RETURNING *',
      [dados.titulo, dados.conteudo, dados.autor])
      return res.json(rows[0])
    
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"Erro interno do serbidor"})
  }
})

router.delete('/artigos/:id', async (req,res) => {
    const { id } = req.params
    const { rowCount } = await pool.query('DELETE FROM artigos WHERE id = $1 RETURNING *', [id])
    if(rowCount === 0){
        res.status(404).json({message:"O artigo não exixte"})
    }
    return res.sendStatus(204)
})

router.put('/artigos/:id', async (req,res) => {
    const {id} = req.params
    const dados = req.body
    const {rows} = await pool.query('UPDATE artigos SET titulo = $1, conteudo = $2, autor = $3 WHERE id = $4 RETURNING *',
        [dados.titulo, dados.conteudo, dados.autor, id])
    return res.json(rows[0])
})

export default router