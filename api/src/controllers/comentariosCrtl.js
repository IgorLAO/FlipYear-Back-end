import { Router } from "express";
import { ListComments, DeleteComment, InsertComment } from "../repositorys/comentariosRepo.js";

let server = Router()

//Listar os comentários
server.get('/comentarios', async (req, resp) =>{
    try {
        const qtd = 4
        const pagina = req.query.pagina
        const offset = (pagina - 1) * qtd

        const resposta = await ListComments(qtd, offset)
        if(resposta.length <= 0)
            throw new Error('Não encontrado')
        resp.send(resposta);
    } catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
})

server.get('/AllComentarios', async (req, resp)=>{
    try {
        const qtd = 1000
        const offset = 0
        const resposta = await ListComments(qtd, offset)
        if(resposta.length <= 0)
        throw new Error('Não encontrado')
    resp.send(resposta);
    } catch (err) {
    resp.status(400).send({
        erro:err.message
    })
    }
})


//Deletar algum comentário
server.delete('/comentarios/:id', async (req, resp) =>{
    try {
        const { id } = req.params;

        const comentario = await DeleteComment(id);

        if(comentario != 1)
            throw new Error('Comentário não pôde ser deletado.')

        resp.send(204)
    } catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
})

server.post('/comentarios', async (req, resp) =>{
    try {
        let bodyreq = req.body
        let data = await InsertComment(bodyreq)

        resp.send(data)
    } catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
})

export default server;