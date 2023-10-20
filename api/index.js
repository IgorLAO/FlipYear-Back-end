import 'dotenv/config';
import cors from "cors";
import express from 'express';

import usuarioController from './src/controllers/usuario.js';
import produtosCtrl from './src/controllers/produtosCtrl.js';
import enderecosCtrls from './src/controllers/enderecosCtrls.js';
import carrinhoCtrl from './src/controllers/carrinhoCtrl.js'
import commentCtrl from './src/controllers/comentariosCrtl.js'


const server = express();

server.use('/storage/images/profileImages', express.static('storage/images/profileImages'));
server.use(cors());
server.use(express.json());


server.listen(process.env.PORT,() => console.log(`
        API ONLINE NA PORTA ${process.env.PORT}
`));


server.use(usuarioController);
server.use(produtosCtrl);
server.use(enderecosCtrls);
server.use(carrinhoCtrl);
server.use(commentCtrl);