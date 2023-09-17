import { Router } from "express";
import { ConsultProd, InsertProdutos } from "../../repositorys/produtos/produtosRepository.js";

let server = Router();

server.post('/produtos', async (req, resp) => {
    try {
        const produtos = req.body

        if(!produtos.nome){
            throw new Error("Informe o nome")
        }
        if(!produtos.preco){
            throw new Error("Informe o Valor")
        }   
        if(!produtos.estoque){
            throw new Error("Informe o estoque")
        }

        const resposta = await InsertProdutos(produtos);
        resp.send(resposta);
    } catch (err) {
        resp.status(400).send({
            erro: err.message   
        });
    }
});

server.get('/produtos', async (req, resp) => {
    try {
        const resposta = await ConsultProd(req.query.busca);
        resp.send(resposta);
    } catch (err) {
        resp.status(400).send({
            err:"Ocorreu um Erro"
        })
    }
})

export default server;