import { Router } from "express";
import { InserirProdutoNoCarrinho, ListarCarrinho, LimparCarrinho, RemoverProdutoDoCarrinho, AlterarProdutosDoEstoque, AlterarQtdNoCarrinho } from "../repositorys/carrinhoRepo.js";

let server = Router();

server.get('/carrinho/:id', async (req, resp) => {
    try {
        const { id } = req.params;
        let data = await ListarCarrinho(id);
        resp.send(data);

        
    }

    catch (err) {
        resp.send(err.message);

    }
});

server.post('/carrinho', async (req, resp) => {
    try {
        const info = req.body;

        const resposta = await InserirProdutoNoCarrinho(info);
        resp.send(resposta);
        
    }

    catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

server.delete('/carrinho/:id', async (req, resp) => {
    try {
        const { id } = req.params;
        let data = await LimparCarrinho(id);
        resp.status(204).send();

    }
    catch (err) {
        resp.send(err.message);

    }
});

server.delete('/carrinho/produto/:iduser/:idproduto', async (req, resp) => {
    try {
        const { iduser, idproduto } = req.params;
        let data = await RemoverProdutoDoCarrinho(iduser, idproduto);
        resp.status(204).send();

    }
    catch (err) {
        resp.send(err.message);

    }
});


server.put('/carrinho/produto/:qtd/:idproduto', async (req, resp) => {
    try {
        const { qtd, idproduto } = req.params;
        let data = await AlterarProdutosDoEstoque(qtd, idproduto);
        resp.status(204).send();

    }
    catch (err) {
        resp.send(err.message);

    }
});

server.put('/carrinho/:qtd/:iduser/:idproduto', async (req, resp) => {
    try {
        const { qtd, idproduto, iduser } = req.params;
        let data = await AlterarQtdNoCarrinho(qtd, idproduto, iduser);
        resp.status(204).send();

    }
    catch (err) {
        resp.send(err.message);

    }
});

export default server;