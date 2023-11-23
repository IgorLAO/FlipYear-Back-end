import multer from "multer";
import { Router } from "express";
import {
    Login,
    Delete,
    getUsers,
    GetImages,
    SearchUser,
    AlterImage,
    GetUserById,
    InsertClientes,
    InsertImgProfile,
} from "../repositorys/usuariosRepo.js";

import { getADM } from "../repositorys/ADM.js";


const server = Router();
const upload = multer({ dest: 'storage/images/profile' });

server.get('/usuarios', async (req, resp) => {
    try {
        let data = await getUsers();
        resp.send(data)

    } catch (err) {
        resp.send(err.message)
    }
});


server.get('/usuario/:id', async (req, resp) => {
    try {
        console.log(1)
        const { id } = req.params;
        console.log(2)
        let r = await GetUserById(id);

        resp.send(r)
    } catch (err) {
        resp.send(err.message)
    }
});


server.get('/adms', async (req, resp) => {
    try {
        let data = await getADM();
        resp.send(data)

    } catch (err) {
        resp.send(err.message)
    }
});

server.post('/usuarios', async (req, resp) => {
    try {
        let bodyReq = req.body
        let data = await InsertClientes(bodyReq);

        if (!bodyReq.Nome)
            throw new Error("O nome é obrigatorio");

        if (!bodyReq.Telefone)
            throw new Error("O Telefone é obrigatorio");

        if (!bodyReq.CPF)
            throw new Error("O CPF é obrigatorio");

        // let isCadastrado = await getUsers(bodyReq.CPF);
        // console.log(isCadastrado)
        // if(isCadastrado.length > 0)
        //     throw new Error("Usuario já cadastrado");

        if (!bodyReq.Email)
            throw new Error("O Email é obrigatorio");

        if (bodyReq.Senha.length < 6)
            throw new Error("A senha deve ter no minimo 6 caracteres")

        if (!bodyReq.Senha || bodyReq.length < 6)
            throw new Error("Digite uma Senha");

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

server.put('/imagem/usuario/:id', upload.single('user'), async (req, resp) => {
    const { id } = req.params.id
    const img = req.file.path;

    await AlterImage(img, id)
    resp.sendStatus(200)
});


// ------------------------------------------------------------------------------------

server.post('/usuario/ProfImage', upload.single('profile'), async (req, resp) => {
    const imagem = req.file.path;
    console.log(imagem);
    const data = await InsertImage(imagem);

    console.log(data);
    resp.sendStatus(200).send(data);
});



server.post('/imgs', async (req, resp) => {
    const img = req.body.img;
    console.log(img)
    const data = await InsertImgProfile(img);
    resp.status(200).send(data);
});

server.get('/images', async (req, resp) => {
    const data = await GetImages();

    resp.status(200).send(data);
});

server.get('/usuarios/busca', async (req, resp) => {
    try {
        let dataSearch = req.query.search;

        console.log(dataSearch)
        let res = await SearchUser(dataSearch);
        console.log(dataSearch)

        if (res === 0)
            throw new Error("Não encontrado")

        resp.send(res);
    } catch (err) {
        resp.status(404).send({ erro: err.message })
    }
})

server.delete('/usuario/:id', async (req, resp) => {
    try {
        let id = req.params.id
        let res = Delete(id);

        if (resp === 0)
            throw new Error("Não pode ser excluído");

        resp.send(res);

    } catch (err) {
        resp.status(405).send({ erro: err.message });
    }
});

export default server;