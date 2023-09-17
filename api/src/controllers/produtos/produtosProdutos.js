import { Router } from "express";
import { AlterarProduto, ConsultProd, InsertProdutos } from "../../repositorys/produtos/produtosRepository.js";

let server = Router();

//inserir produto
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
        if(!produtos.disponivel){
            throw new Error("Informe se o produto está disponível");
        }
        if(!produtos.destaque){
            throw new Error("Informe se é destaque")
        }
        
        const resposta = await InsertProdutos(produtos);
        resp.send(resposta);
    } catch (err) {
        resp.status(400).send({
            erro: err.message   
        });
    }
});

//consulta
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

//editar
server.put('/produtos/:id', async (req, resp) => {
    try {
        const { id } =  req.params;
        const produto = req.body;

        if(!produto.nome){
            throw new Error("Informe o nome")
        }
        if(!produto.preco){
            throw new Error("Informe o Valor")
        }   
        if(!produto.estoque){
            throw new Error("Informe o estoque")
        }

        const resposta = await AlterarProduto(id, produto);
        if(resposta != 1)
            throw new Error("Poduto não foi alterado");
        else
            resp.status(204).send();
    
    }catch(err){
        resp.status(400).send({
            erro: err.message
        })
    }
});



server.delete('/produtos/:id', async (req, resp) => {
    
})
export default server;