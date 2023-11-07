import { Router } from "express";
import { ListPedido, UpdtPedido } from "../repositorys/pedidosRepo.js";

const server = Router();

server.get('/pedidos', async (req, resp) => {
    try {
        const data = await ListPedido();

        resp.status(200).send(data)
    } catch (err) {
        resp.status(502).send({ Error: err.message });
    }
});

server.put('/pedidos/:id', async (req, resp) => {
    try {
        let insertId = req.params.id;
        let situacao = req.body;

        console.log(situacao);

        let data = await UpdtPedido(situacao, insertId);
        console.log(data);

        resp.status(200).send(data);
    } catch (err) {
        resp.status(502).send({ error: err.message });
    }
});

export default server;