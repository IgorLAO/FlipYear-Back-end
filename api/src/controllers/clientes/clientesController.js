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
        if(!bodyReq.Nome)
            throw new Error("O nome é obrigatorio");

        if(!bodyReq.Telefone)
            throw new Error("O Telefone é obrigatorio");

        if(!bodyReq.CPF)
            throw new Error("O CPF é obrigatorio");

        if(!bodyReq.Email)
            throw new Error("O Email é obrigatorio");

        if(bodyReq.Senha.length < 6 )
            throw new Error("A senha deve ter no minimo 6 caracteres")
        
        if(!bodyReq.Senha || bodyReq.length < 6)
            throw new Error("Digite uma Senha");
            
    let data = await InsertClientes(bodyReq);
    resp.send(data)
        
    } catch (err) {
        resp.send(err.message)
    }
});

export default server