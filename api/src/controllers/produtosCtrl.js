import {
    AlterarProduto,
    InsertProdutos,
    ListProd,
    RemoverProdutos,
    ConsultarProdPorId,
    SearchProd,
    ListDestProd,
    ListAllProd,
    ListAllDestProd,
    AlterarImagem,
    InserirImagem,
    GetCatego
} from "../repositorys/produtosRepository.js";

import { Router } from "express";
import multer from 'multer';

let server = Router();
const upload = multer({ dest: 'storage/produtos' });


//LISTAR
server.get('/produtos', async (req, resp) => {
    try {
        const qtd = 50;
        const pag = req.query.pagina || 1;
        const offset = (pag - 1) * qtd;

        const getData = await ListProd(qtd, offset);
        if (getData.length <= 0)
            throw new Error('Não encontrado')

        resp.send(getData);

    } catch (err) {
            resp.status(404).send({ erro: err.message })
    }
});

server.get('/outrosprodutos', async (req, resp) => {
    try {
        const qtd = 4;
        const pag = req.query.pagina || 1;
        const offset = (pag - 1) * qtd;

        const getData = await ListProd(qtd, offset);
        if (getData.length <= 0)
            throw new Error('Não encontrado')
        resp.send(getData);
    } catch (err) {
        resp.status(404).send({ erro: err.message })
        
    }
});

//pegar produto por id

server.get('/produtos/:id', async (req, resp) => {

    try {
        const { id } = req.params;
        let data = await ConsultarProdPorId(id);
        resp.send(data);

    }
    catch (err) {
        resp.status(404).send({ erro: err.message })

    }
})
server.get('/categoria', async (req, resp) => {
    try {
        const data = await GetCatego();
        resp.json(data);
    } catch (error) {
        resp.status(500).json({ error: 'Erro ao buscar categorias' });
    }
});

//inserir produto
server.post('/produtos', async (req, resp) => {
    try {
        const produtos = req.body

        if (!produtos.nome) 
            throw new Error("Informe o nome");
        
        if (!produtos.preco) 
            throw new Error("Informe o Valor");
        
        if (!produtos.estoque) 
            throw new Error("Informe o estoque");
        
        if (!produtos.disponivel) 
            throw new Error("Informe se o produto está disponível");
        
        if (!produtos.destaque) 
            throw new Error("Informe se é destaque");
        
        if (!produtos.disponivel) 
            throw new Error("Informe se esta disponivel");
        
        if (!produtos.estado) 
            throw new Error("Informe o estado");
        
        if (!produtos.colecionador) 
            throw new Error("Informe se conlecionador");
        

        const resposta = await InsertProdutos(produtos);
        resp.send(resposta);
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

//Busca
server.get('/produto/busca', async (req, resp) => {
    try {
        let busca = req.query.search
        let res = await SearchProd(busca);
        if (res.length <= 0)
            throw new Error("nao encontrado");
        resp.send(res);
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})

//alterar
server.put('/produtos/:id', async (req, resp) => {
    try {
        const { id } = req.params;
        const produto = req.body;

        if (!produto.nome) {
            throw new Error("Informe o nome")
        }
        if (!produto.preco) {
            throw new Error("Informe o Valor")
        }
        if (!produto.estoque) {
            throw new Error("Informe o estoque")
        }

        const resposta = await AlterarProduto(id, produto);
        if (resposta != 1)
            throw new Error("Poduto não foi alterado");
        else
            resp.status(204).send();

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
});

//remover
server.delete('/produtos/:id', async (req, resp) => {
    try {
        const { id } = req.params;

        const res = await RemoverProdutos(id);


        resp.status(204).send()
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

//Listar Produtos em destaques
server.get('/produtosDestaque', async (req, resp) => {
    try {
        const qtd = 4
        const pag = req.query.pagina
        const offset = (pag - 1) * 1

        const getData = await ListDestProd(qtd, offset)
        if (getData.length <= 0)
            throw new Error('Produto não encontrado.')
        resp.send(getData);
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
});




//inserir imagem 
server.post('/produtos/imagem', upload.fields([ { name: 'Frente', maxCount: 1 },
                                                { name: 'LadoEsq', maxCount: 1 },
                                                { name: 'LadoDir', maxCount: 1 },
                                                { name: 'Tras', maxCount: 1 },
]), async (req, resp) => {
        try {
            const Frente = req.files['Frente'][0].path;
            const LadoDirei = req.files['LadoDir'][0].path;
            const LadoEsq = req.files['LadoEsq'][0].path;
            const Tras = req.files['Tras'][0].path;
            
            console.log(Frente)

            const data = await InserirImagem( Frente,
                                                LadoDirei,
                                                LadoEsq,
                                                Tras,);


            resp.status(200).send(data);

        } catch (err) {
            resp.status(400).send({
                erro: err.message
            })
        }
    })


//Alterar imagem produto
server.put('/produtos/:id/imagem', upload.single('CapaProduto'), async (req, resp) => {
    try {
        const { id } = req.params;

        const imagem = req.file.path;

        const resposta = await AlterarImagem(imagem, id);
        resp.status(204).send()

        if (resposta != 1) {
            throw new Error("Imagem não pode ser salva ):");
        }
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})

//Listar todos os produtos em destaque
server.get('/produtosAllDestaque', async (req, resp) => {
    try {
        const getData = await ListAllDestProd()
        if (getData.length <= 0)
            throw new Error('Produto não encontrado.')
        resp.send(getData);
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

//Listar todos os produtos
server.get('/produtos', async (req, resp) => {
    try {
        const getData = await ListAllProd()
        if (getData.length <= 0)
            throw new Error('Produto não encontrado.')
        resp.send(getData);
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

export default server;