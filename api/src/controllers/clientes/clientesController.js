import { Router } from "express";
import { InsertClientes, ListClientes } from "../../repositorys/clientes/cleintesRepository.js";


let server = Router();

server.get('/clientes', async (req, resp) => {
    let data = await ListClientes();
    resp.send(data)
});

server.post('/clientes', async (req, resp) => {
    let bodyReq = req.body
    let data = await InsertClientes(body);
    resp.send(data)
});

export default server