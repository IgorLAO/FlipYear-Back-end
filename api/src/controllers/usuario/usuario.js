import { Router } from "express";
import { InsertClientes, Login, getUsers } from "../../repositorys/usuarios/usuariosRepo.js";


let server = Router();

server.get('/usuario', async (req, resp) => {
    try {
        let data = await getUsers();
        resp.send(data)

    } catch (err) {
        resp.send(err.message)
    }   
});




server.post('/usuarios', async (req, resp) => {
    try {
        let bodyReq = req.body
        if (!bodyReq.Nome)
            throw new Error("O nome é obrigatorio");

        if (!bodyReq.Telefone)
            throw new Error("O Telefone é obrigatorio");

        if (!bodyReq.CPF)
            throw new Error("O CPF é obrigatorio");

        if (!bodyReq.Email)
            throw new Error("O Email é obrigatorio");

        if (bodyReq.Senha.length < 6)
            throw new Error("A senha deve ter no minimo 6 caracteres")

        if (!bodyReq.Senha || bodyReq.length < 6)
            throw new Error("Digite uma Senha");

            console.log(resp[0])

        let data = await InsertClientes(bodyReq);
        resp.send(data)

    } catch (err) {
        resp.send(err.message)
    }
});

server.post('/usuarios/login', async (req, resp) => {
    try {
        let { Email, Senha } = req.body
        let data = await Login(Email, Senha)
        if (!data)
            throw new Error("Credecias invalidas")

        resp.send(data)
    } catch (err) {
        resp.status(401).send({ erro: err.message })
    }
});

server.get('/usuario', async (req, resp) => {
    
})

export default server