import { Router } from "express";
import { ListComments, DeleteComment } from "../../repositorys/comentarios/comentariosRepo.js";

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

export default server;