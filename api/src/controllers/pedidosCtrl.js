import { Router } from "express";
import { FormaPag, InserirPedidoItem, ListPedido, ListPedidoInterval, PedidoSituacao } from "../repositorys/pedidosRepo.js";

const server = Router();

server.get('/pedidos', async (req, resp) => {
    try {
        const data = await ListPedido();
        
        resp.status(200).send(data)
    } catch (err) {
        resp.status(502).send({ Error: err.message });
    }
});

server.get('/pedidosInterval', async (req, resp) => {
    try {
        let { Start, End } = req.query

        const data = await ListPedidoInterval(Start, End);
        console.log(data)

        resp.status(200).send(data);
    } catch (err) {
        resp.status(502).send({ Error: err.message });
    }
});

server.put('/pedidos/:id', async (req, resp) => {
    try {
        let insertId = req.params.id;
        let DS_SITUACAO = String(req.body);
     await PedidoSituacao({DS_SITUACAO}, Number(insertId));

     resp.send(DS_SITUACAO);

    } catch (err) {
        resp.status(502).send({ error: err.message });
    }
});

server.post('/pedido', async (req,resp) =>{
    try {
        const pedido = req.body

        if (!pedido.endereco)
            throw new Error("Informe o endereço");

        if (!pedido.pagamento)
            throw new Error("Informe se o produto está disponível");

        if (!pedido.pedido)
            throw new Error("Informe o pedido");

        if (!pedido.notaFiscal)
            throw new Error("Informe a nota fiscal");

        if (!pedido.parcelas)
            throw new Error("Informe parcelas");

        if (!pedido.data)
            throw new Error("Informe a data");
        
        if (!pedido.situacao)
            throw new Error("Informe a situação");

            const resposta = await InserirPedidoItem(pedido)
            resp.send(resposta);

    } catch (err) {
         resp.status(502).send({ Error: err.message });
    }
});
   
server.post('/pagamento', async  (req,resp) =>{
    try {
        const pedido = req.body;

        if(!pedido.pagamento){
            throw new Error("informe o metodo de pagamento");
        }
        const resposta = await FormaPag(pedido);
        resp.send(resposta);

    } catch (err) {
        err: err.message;
    }
})

export default server;