import { Router } from "express";
import { SelectAllPed } from "../repositorys/pedidosRepo.js";

let server = Router();

server.get('/pedidos', async (req, resp) => {
    try {
        const d = await SelectAllPed();
        resp.status(200).send(d);
        
    } catch (err) {
        resp.status(404).send({Error: err.message})
    }
});

export default server;