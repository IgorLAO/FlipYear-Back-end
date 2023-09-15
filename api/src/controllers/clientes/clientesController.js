import { Router } from "express";
import { InsertClientes, ListClientes } from "../../repositorys/clientes/cleintesRepository.js";


let server = Router();

server.get('/clientes', async (req, resp) => {
    try {
        let data = await ListClientes();
        resp.send(data)
        
    } catch (err) {
        resp.send(err.message)
    }
});

server.post('/clientes', async (req, resp) => {
    try {
    let bodyReq = req.body
    let data = await InsertClientes(bodyReq);
    resp.send(data)
        
    } catch (err) {
        resp.send(err.message)
    }
});

export default server